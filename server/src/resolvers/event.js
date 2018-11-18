import { combineResolvers } from 'graphql-resolvers';

import { isAuthenticated, isEventOwner } from './authorization';

import pubsub, { EVENTS } from '../subscription';

const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    events: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
            createdAt: {
              '$lt': fromCursorHash(cursor),
            },
          }
        : {};

      const events = await models.Event.find({
        ...cursorOptions,
      }, null, {
        limit: limit + 1,
        sort: {
          createdAt: -1
        }
      })

      const hasNextPage = events.length > limit;
      const edges = hasNextPage ? events.slice(0, -1) : events;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: edges[edges.length - 1] ? toCursorHash(
            edges[edges.length - 1].createdAt.toString()
          ) : '',
        },
      };
    },

    event: async (parent, { id }, { models }) =>
      await models.Event.findById(id),
  },

  Mutation: {
    createEvent: combineResolvers(
      isAuthenticated,
      async (parent, { title, description }, { models, me }) => {
        const event = await models.Event.create({
          title,
          description,
          userId: me.id,
        });

        pubsub.publish(EVENTS.EVENT.CREATED, {
          eventCreated: { event },
        });

        return event;
      },
    ),

    deleteEvent: combineResolvers(
      isAuthenticated,
      isEventOwner,
      async (parent, { id }, { models }) =>{
        try {
          const { errors } = await models.Event.findByIdAndDelete(id)
          if(errors){
            return false
          }
        } catch (error) {
          return false
        }
        return true
      },
    ),
  },

  Event: {
    user: async (event, args, { loaders }) =>
      await loaders.user.load(event.userId)
  },

  Subscription: {
    eventCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.EVENT.CREATED),
    },
  },
}