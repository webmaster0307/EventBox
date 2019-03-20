import { combineResolvers } from 'graphql-resolvers'
import { UserInputError, ApolloError } from 'apollo-server'
import { isDepartmentMember, isDepartmentOperator } from './authorization'

const toCursorHash = (string) => Buffer.from(string).toString('base64')

const fromCursorHash = (string) => Buffer.from(string, 'base64').toString('ascii')

export default {
  Query: {
    departmentUsers: combineResolvers(
      async (root, { cursor, limit = 50, userId, departmentId, role }, { models }) => {
        if (role) {
          return await models.DepartmentUser.find({ departmentId, departmentRole: role })
        }
        const dpmUsers = await models.DepartmentUser.find({ departmentId })

        return dpmUsers
      }
    )
  },

  Mutation: {
    inviteMember: combineResolvers(
      isDepartmentOperator,
      async (root, { departmentId, email, role }, { models, newErr }) => {
        const userFound = await models.User.findOne({ email })
        if (!userFound) {
          throw new UserInputError('Email is not valid')
        }
        const validRoles = ['chief', 'reviewer', 'member']

        if (!validRoles.includes(role)) {
          throw new UserInputError('Role specification is not valid')
        }

        const isAlreadyMember = await models.DepartmentUser.findOne({
          userId: userFound.id,
          departmentId
        })

        if (isAlreadyMember) {
          throw new UserInputError('This user is already a member')
        }
        const document = await models.DepartmentUser.create({
          userId: userFound.id,
          departmentId,
          departmentRole: role
        })
        return document
      }
    ),
    removeMember: combineResolvers(
      // TODO: handle only head of department is allowed
      isDepartmentOperator,
      async (root, { departmentId, userId }, { models, me, newErr }) => {
        if (userId === me.id) {
          throw new ApolloError('Cannot remove self')
        }
        try {
          await models.DepartmentUser.deleteOne({
            userId,
            departmentId
          })
        } catch (error) {
          throw newErr(`An error occurred`, 404)
        }

        return true
      }
    )
  },

  DepartmentUser: {
    user: async (dpuser, args, { loaders }) => {
      return await loaders.user.load(dpuser.userId)
    },

    department: async (dpuser, args, { models }) => {
      return await models.Department.findById(dpuser.departmentId)
    }
  }
}
