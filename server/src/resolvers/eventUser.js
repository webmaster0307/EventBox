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

        pubsub.publish(`${EVENTS.EVENT.CHECKIN} ${eventId}`, { eventCheckedIn: ticket })
        return ticket
      }
    )
  }
}
