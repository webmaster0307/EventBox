import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.');

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    role === 'admin'
      ? skip
      : new ForbiddenError('Not authorized as admin.'),
);

export const isEventOwner = async (
  parent,
  { id },
  { models, me },
) => {
  const event = await models.Event.findById({_id: id});
  
  if (event.userId.toString() !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }

  return skip;
};
