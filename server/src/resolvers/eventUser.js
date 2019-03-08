import { combineResolvers } from 'graphql-resolvers'
import mongoose from 'mongoose'
import { isAuthenticated, isEventOwner } from './authorization'
import { EVENTS } from '../subscription'
import { ApolloError } from 'apollo-server'

export default {
  Query: {
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
        const ticket = await models.EventUser.findOne({ code, eventId })
        // TODO: handle update ticket
        const result = {
          ...ticket.toObject(),
          checkedIn: true,
          checkedInTime: new Date()
        }
        pubsub.publish(`${EVENTS.EVENT.CHECKIN} ${eventId}`, { eventCheckedIn: result })
        return result
      }
    )
  }
}
