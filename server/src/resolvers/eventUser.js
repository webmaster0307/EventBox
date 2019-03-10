import { combineResolvers } from 'graphql-resolvers'
import mongoose from 'mongoose'
import { isAuthenticated, isEventOwner } from './authorization'
import { EVENTS } from '../subscription'
import { ApolloError } from 'apollo-server'

export default {
  Query: {
    tickets: combineResolvers(
      // isAuthenticated,
      async (parent, { code, eventId }, { models, pubsub }) => {
        const tickets = await models.EventUser.find({ eventId })
        return tickets
      }
    ),
    checkTicket: combineResolvers(
      // isAuthenticated,
      async (parent, { code, eventId }, { models, pubsub }) => {
        const ticket = await models.EventUser.findOne({ code, eventId })
        return ticket
      }
    )
  },
  EventUser: {
    userInfo: async ({ userId }, args, { models, loaders }) => {
      return await models.User.findById(userId)
    }
  },
  Mutation: {
    submitTicket: combineResolvers(
      // isAuthenticated,
      async (parent, { code, eventId }, { models, pubsub }) => {
        const existed = await models.EventUser.findOne({ code, eventId })
        if (existed && existed.checkedIn) {
          return null
        }
        const ticket = await models.EventUser.findOneAndUpdate(
          { code, eventId },
          {
            checkedIn: true,
            checkedInTime: new Date()
          },
          {
            new: true
          }
        )
        // console.log('object: ', ticket.toObject())
        pubsub.publish(`${EVENTS.EVENT.CHECKIN} ${eventId}`, {
          eventCheckedIn: { ...ticket.toObject(), id: ticket.toObject()._id }
        })
        return ticket
      }
    )
  }
}
