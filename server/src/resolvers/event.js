import { combineResolvers } from 'graphql-resolvers'

import { isAuthenticated, isEventOwner } from './authorization'

import pubsub, { EVENTS } from '../subscription'

const toCursorHash = string => Buffer.from(string).toString('base64')

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii')

export default {
  Query: {
    events: async (parent, { status, cursor, limit = 10 }, { models, me, isAdmin }) => {
      const cursorOptions = cursor
      ? {
        createdAt: {
          '$lt': fromCursorHash(cursor)
        }
      }
      : {}
      let selfEventsCondition
      if(!status){
        selfEventsCondition = !isAdmin ? {
          userId: me.id
        } : {}
      }
      else{
        selfEventsCondition = {
          status
        }
      }
      

      const events = await models.Event.find({
        ...cursorOptions,
        ...selfEventsCondition
      }, null, {
        limit: limit + 1,
        sort: {
          createdAt: -1
        }
      })

      const hasNextPage = events.length > limit
      const edges = hasNextPage ? events.slice(0, -1) : events

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash( edges[edges.length - 1].createdAt.toString() )
        }
      }
    },

    event: combineResolvers(
      // TODO: authorization handling, open for temporarily
      // isEventOwner,
      async (parent, { id }, { models }) =>
      await models.Event.findById(id)
    )
  },

  Mutation: {
    createEvent: combineResolvers(
      isAuthenticated,
      async (parent, args, { models, me }) => {
        const { thumbnail, ...rest } = args
        const event = await models.Event.create({
          ...rest,
          images: {
            thumbnail
          },
          userId: me.id
        })

        pubsub.publish(EVENTS.EVENT.CREATED, {
          eventCreated: { event }
        })

        return event
      }
    ),
    updateEvent: combineResolvers(
      isEventOwner,
      async (parent, args, { models, me }) => {
        const { id, thumbnail, ...rest } = args
        const event = await models.Event.findByIdAndUpdate(
          id, 
          { 
            ...rest,
            images: {
              thumbnail
            },
            status: 'draft'
          },
          { new: true }
        )

        return event
      }
    ),

    deleteEvent: combineResolvers(
      isEventOwner,
      async (parent, { id }, { models }) => {
        try {
          const { errors } = await models.Event.findByIdAndDelete(id)
          if (errors) {
            return false
          }
        } catch (error) {
          return false
        }
        return true
      }
    )
  },

  Event: {
    user: async (event, args, { loaders }) =>
      await loaders.user.load(event.userId)
  },

  Subscription: {
    eventCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.EVENT.CREATED)
    }
  }
}
