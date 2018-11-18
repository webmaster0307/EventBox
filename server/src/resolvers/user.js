import jwt from 'jsonwebtoken';
import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';
import { isAuthenticated, isAdmin } from './authorization';

const tokenExpired = 60 * 60 * 8 // 8 hours

const createToken = async (user, secret) => {
  const { id, email, username, role } = user;
  return await jwt.sign({ id, email, username, role }, secret, {
    expiresIn: tokenExpired,
  });
};

export default {
  Query: {
    users: combineResolvers(
      isAdmin,
      async (parent, args, { models }) => {
      return await models.User.find();
    }),

    user: async (parent, { id }, { models }) =>
      await models.User.findById(id),

    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }

      return await models.User.findById(me.id);
    },
  },
  
  Mutation: {
    signUp: async (
      parent,
      { username, email, password },
      { models, secret },
    ) => {
      let user = await models.User.findOne({username})
      if(user){
        throw new UserInputError(
          'Email or username has been taken',
        );
      }
      
      user = await models.User.findOne({email})
      if(user){
        throw new UserInputError(
          'Email or username has been taken',
        );
      }

      user = await models.User.create({username, email, password})
      return { token: createToken(user, secret) };
    },

    signIn: async (
      parent,
      { username, password },
      { models, secret },
    ) => {
      const user = await models.User.findByLogin(username);

      if (!user) {
        throw new UserInputError(
          'No user found with this login credentials.',
        );
      }

      const isValid = await user.validatePassword(password);
      if (!isValid) {
        throw new AuthenticationError('Invalid password.');
      }

      return { token: createToken(user, secret) };
    },

    updateUser: combineResolvers(
      isAuthenticated,
      async (parent, { username }, { models, me }) => {
        const user = await models.User.findById(me.id);
        if(!user){
          throw new UserInputError(
            'No user found with this login credentials.',
          );
        }
        return await models.User.findByIdAndUpdate(me.id, { username }, {new: true})
      },
    ),

    deleteUser: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) =>
        await models.User.destroy({
          where: { id },
        }),
    ),
  },

  User: {
    events: async (user, args, { models }) =>
      await models.Event.findAll({
        where: {
          userId: user.id,
        },
      }),
  },
}