import { combineResolvers } from 'graphql-resolvers'
import mongoose from 'mongoose'
import { isAuthenticated, isEventOwner } from './authorization'
import { EVENTS } from '../subscription'
import { ApolloError, UserInputError } from 'apollo-server'

export default {
  Query: {
    tickets: combineResolvers(
      // isAuthenticated,
      async (parent, { code, eventId }, { models, pubsub }) => {
        const tickets = await models.Ticket.find({ eventId })
        return tickets
      }
    ),
    checkTicket: combineResolvers(
      // isAuthenticated,
      async (parent, { code, eventId }, { models, pubsub }) => {
        const ticket = await models.Ticket.findOne({ code, eventId })
        return ticket
      }
    ),
    myTickets: combineResolvers(isAuthenticated, async (parent, { limit = 20 }, { models, me }) => {
      const tickets = await models.Ticket.find({ userId: me.id }, null, {
        limit,
        sort: {
          createdAt: -1
        }
      })
      return tickets
    })
  },
  Ticket: {
    userInfo: async ({ userId }, args, { models, loaders }) => {
      return await models.User.findById(userId)
    },
    eventInfo: async ({ eventId }, args, { models, loaders }) => {
      return await models.Event.findById(eventId)
    }
  },
  Mutation: {
    submitTicket: combineResolvers(
      // isAuthenticated,
      async (parent, { code, eventId }, { models, pubsub }) => {
        const existed = await models.Ticket.findOne({ code, eventId })
        if (!existed) {
          throw new UserInputError('Ticket is not recognized!')
        }
        if (existed && existed.checkedIn) {
          return null
        }
        const ticket = await models.Ticket.findOneAndUpdate(
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
