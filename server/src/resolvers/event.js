import { combineResolvers } from 'graphql-resolvers'
import mongoose from 'mongoose'

import { isAuthenticated, isEventOwner } from './authorization'

import { EVENTS } from '../subscription'

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
          endCursor: events.length > 0 ? toCursorHash( edges[edges.length - 1].createdAt.toString() ) : ''
        }
      }
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
    ),

    publishEvent: combineResolvers(
      isEventOwner,
      async (parent, { id }, { models, pubsub }) => {
        try {
          const event = await models.Event.findByIdAndUpdate(
            id, 
            { 
              status: 'in-review'
            },
            { new: true }
          )
          // console.log('event: ',event);
          event.departments.forEach(id => {
            pubsub.publish(`${EVENTS.EVENT.SUBMITED_REVIEW} ${id}`, { eventSubmited: event })
          })
          // pubsub.publish(`${EVENTS.EVENT.SUBMITED_REVIEW} ${event.departments[0]}`, { eventSubmited: event })
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
    )
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
      subscribe: (parent, { departmentIds }, { models, pubsub }, info) => {
        const arrIterator = departmentIds.map(id => `${EVENTS.EVENT.SUBMITED_REVIEW} ${id}`)
        return pubsub.asyncIterator(arrIterator)
      }
    }
  }
}
