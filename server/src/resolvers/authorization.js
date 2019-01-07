import { ForbiddenError } from 'apollo-server'
import { combineResolvers, skip } from 'graphql-resolvers'

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.')

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    role.includes('admin')
      ? skip
      : new ForbiddenError('Not authorized as admin.')
)

export const isEventOwner = combineResolvers(
  isAuthenticated,
  async ( parent, { id }, { models, me } ) => {
    if(isAdminRole(me)){
      return skip
    }

    const event = await models.Event.findById(id)

    if (event.userId.toString() !== me.id) {
      throw new ForbiddenError('Not authenticated as owner.')
    }


    return skip
})

const isAdminRole = me => me.role.includes('admin')