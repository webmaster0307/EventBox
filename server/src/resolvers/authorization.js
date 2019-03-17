import { ForbiddenError } from 'apollo-server'
import { combineResolvers, skip } from 'graphql-resolvers'

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.')

export const isAdmin = combineResolvers(isAuthenticated, (parent, args, { me: { role } }) =>
  role.includes('admin') ? skip : new ForbiddenError('Not authorized as admin.')
)

export const isEventOwner = combineResolvers(
  isAuthenticated,
  async (parent, { id }, { models, me }) => {
    if (isAdminRole(me)) {
      return skip
    }

    const event = await models.Event.findById(id)

    if (event.userId.toString() !== me.id) {
      throw new ForbiddenError('Not authenticated as owner.')
    }

    return skip
  }
)

export const isEventReviewer = combineResolvers(
  isAuthenticated,
  async (parent, { id }, { models, me }) => {
    if (isAdminRole(me)) {
      return skip
    }
    const event = await models.Event.findById(id)
    if (!event) {
      throw new UserInputError('Sự kiện không hợp lệ')
    }

    const reviewers = models.DepartmentUser.findOne({
      userId: me.id,
      departmentId: {
        $in: event.departmentId
      }
    })

    console.log('reviewers: ', reviewers)

    if (!reviewers) {
      throw new ForbiddenError('Not authenticated as owner.')
    }

    return skip
  }
)

export const isDepartmentMember = combineResolvers(
  isAuthenticated,
  async (parent, { departmentId }, { models, me }) => {
    if (isAdminRole(me)) {
      return skip
    }
    const isMember = await models.DepartmentUser.findOne({ departmentId, userId: me.id })
    if (isMember) {
      return skip
    } else {
      throw new ForbiddenError("Not authenticated as department's member")
    }
  }
)

const isAdminRole = (me) => me.role.includes('admin')
