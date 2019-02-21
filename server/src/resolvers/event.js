import { combineResolvers } from 'graphql-resolvers'
import mongoose from 'mongoose'

import { isAuthenticated, isEventOwner } from './authorization'

import { EVENTS } from '../subscription'
import { ApolloError } from 'apollo-server'

const toCursorHash = string => Buffer.from(string).toString('base64')

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii')

export default {
  Query: {
    events: async (parent, { status, cursor, limit = 50 }, { models, me, isAdmin }) => {
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
          endCursor: events.length > 0 ? toCursorHash( edges[edges.length - 1].createdAt.toString() ) : ''
        }
      }
    },
    eventsHome: async (parent, { limit = 8 }, { me, models }) =>{
      const events = await models.Event.find({
        status: 'active'
      }, null, {
        limit,
        sort: {
          createdAt: -1
        }
      })
      return events
    },
    event: combineResolvers(
      // TODO: authorization handling, open for temporarily
      // isEventOwner,
      async (parent, { id }, { me, models }) =>{
        return await models.Event.findById(id)
      }
    ),

    eventsInReview: async (parent, { status, page = 0, limit = 10 }, { models, me, isAdmin }) => {

      // const departmentIds = await models.DepartmentUser
      //   .find({ userId: me.id, departmentRole: 'reviewer' }, 'departmentId')
      //   .map(doc => doc.departmentId.toString())

      const departments = await models.DepartmentUser.find({ userId: me.id, departmentRole: 'reviewer' }, 'departmentId')
      const departmentIds = departments.map(doc => doc.departmentId)
      const edges = await models.Event.find({
        status: 'in-review',
        departments: {
          $in: departmentIds
        }
      }, null, {
        skip: page * limit,
        limit: limit + 1,
        sort: {
          updatedAt: -1
        }
      })
      // console.log("departmentIds: ", departmentIds)

      return {
        edges,
        departmentIds: departmentIds.map(item => item.toString())
      }
    },
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

        // pubsub.publish(EVENTS.EVENT.CREATED, {
        //   eventCreated: { event }
        // })

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
    ),

    publishEvent: combineResolvers(
      isEventOwner,
      async (parent, { id, departmentIds }, { models, pubsub }) => {
        try {
          console.log('departmentIds: ',departmentIds);
          const event = await models.Event.findByIdAndUpdate(
            id,
            {
              status: 'in-review',
              departments: departmentIds
            },
            { new: true }
          )
          // console.log('event: ',event);
          departmentIds.forEach(id => {
            pubsub.publish(`${EVENTS.EVENT.SUBMITED_REVIEW} ${id}`, { eventSubmited: event })
          })
          // const thumbnail = event?.images?.thumbnail
          // console.log('thumbnail: ',thumbnail);
          return true

        } catch (error) {
          throw new Error('Failed to publish event')
        }
      }
    ),

    approveEvent: combineResolvers(
      // TODO: authenticate by review-er role
      // isEventOwner,
      async (parent, { id }, { models }) => {
        try {
          const { errors } = await models.Event.findByIdAndUpdate(id, { status: 'active' })
          if (errors) {
            return false
          }
        } catch (error) {
          return false
        }
        return true
      }
    ),
    rejectEvent: combineResolvers(
      // TODO: authenticate by review-er role
      // isEventOwner,
      async (parent, { id }, { models }) => {
        try {
          const { errors } = await models.Event.findByIdAndUpdate(id, { status: 'rejected' })
          if (errors) {
            return false
          }
        } catch (error) {
          return false
        }
        return true
      }
    ),
    joinEvent: async (parent, { userId, eventId }, { models, pubsub }) => {
      try {
        const usr = await models.User.findById(userId)
        const evt = await models.Event.findById(eventId)
        if (usr && evt && !evt.participants.some(usrId => usrId === userId)) {
          evt.participants.push(userId)
          const participants = evt.participants
          await models.Event.updateOne({ _id: eventId }, { $set: { participants }})
          pubsub.publish(EVENTS.EVENT.EVENT_UPDATE, { eventUpdate: { type: 'join', _id: eventId, participants } })
          return true
        }
        return false
      } catch (err) {
        throw new ApolloError(err, '400')
      }
    },
    unjoinEvent: async (parent, { userId, eventId }, { models, pubsub }) => {
      try {
        const usr = await models.User.findById(userId)
        const evt = await models.Event.findById(eventId)
        if (usr && evt && !evt.participants.some(usrId => usrId === userId)) {
          evt.participants.filter(usrId => usrId !== userId)
          const participants = evt.participants
          await models.Event.updateOne({ _id: eventId }, { $set: { participants }})
          pubsub.publish(EVENTS.EVENT.EVENT_UPDATE, { eventUpdate: { type: 'unjoin', _id: eventId, participants } })
          return true
        }
        return false
      } catch (err) {
        throw new ApolloError(err, '400')
      }
    },
  },

  Event: {
    user: async (event, args, { loaders }) =>
      await loaders.user.load(event.userId),

    departments: async (event, args, { models }) => {
      const ids = event.departments.map(id => mongoose.Types.ObjectId(id))
      const departments = await models.Department.find({
        _id: {
          $in: ids
        }
      })
      return departments
    }
  },

  Subscription: {
    eventCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.EVENT.CREATED)
    },
    eventSubmited: {
      resolve: (payload, args, context, info) => {
        // Manipulate and return the new value
        const { description, ...eventSubmited } = payload.eventSubmited
        // console.log('rest: ',eventSubmited)
        // console.log('typeof: ',typeof eventSubmited)
        return {
          ...eventSubmited,
          id: mongoose.Types.ObjectId(eventSubmited._id)
        }
      },
      subscribe: (parent, { departmentIds }, { models, pubsub }, info) => {
        const arrIterator = departmentIds.map(id => `${EVENTS.EVENT.SUBMITED_REVIEW} ${id}`)
        return pubsub.asyncIterator(arrIterator)
      }
    },
    eventUpdate: {
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterator(EVENTS.EVENT.EVENT_UPDATE)
    }
  }
}
