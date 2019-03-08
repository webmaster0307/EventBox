import { combineResolvers } from 'graphql-resolvers'
import mongoose from 'mongoose'
import { isAuthenticated, isEventOwner } from './authorization'
import { EVENTS } from '../subscription'
import { ApolloError } from 'apollo-server'

export default {
  Query: {},
  EventUser: {
    userInfo: async ({ userId }, args, { models, loaders }) => {
      return await models.User.findById(userId)
    }
  },
  Mutation: {
    checkinEvent: combineResolvers(
      // isAuthenticated,
      async (parent, { code, eventId }, { models, pubsub }) => {
        const ticket = await models.EventUser.findOne({ code, eventId })
        // handle update ticket

        //
        const result = {
          ...ticket.toObject(),
          checkedInTime: new Date()
        }
        pubsub.publish(`${EVENTS.EVENT.CHECKIN} ${eventId}`, { eventCheckedIn: result })
        return result
      }
    )
  }
}
