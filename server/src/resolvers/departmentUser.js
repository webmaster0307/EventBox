import { combineResolvers } from 'graphql-resolvers'
import { UserInputError } from 'apollo-server'
import { isDepartmentMember } from './authorization'

const toCursorHash = (string) => Buffer.from(string).toString('base64')

const fromCursorHash = (string) => Buffer.from(string, 'base64').toString('ascii')

export default {
  Query: {
    // TODO: authentication
    usersOfDepartment: combineResolvers(
      isDepartmentMember,
      async (root, { departmentId }, { models }) => {
        const dpmUsers = await models.DepartmentUser.find({ departmentId }).populate('userId')
        const users = dpmUsers.map((item) => item.userId)
        // console.log('users: ', users)

        return users
      }
    ),
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
    // TODO: only allow head of department to invite user
    inviteMember: async (root, { departmentId, email, role }, { models, newErr }) => {
      const userFound = await models.User.findOne({ email })
      if (!userFound) {
        throw new UserInputError('Email không hợp lệ')
      }
      const validRoles = ['reviewer', 'member']

      if (!validRoles.includes(role)) {
        throw new UserInputError('Vai trò thành viên không hợp lệ')
      }

      const isAlreadyMember = await models.DepartmentUser.findOne({
        userId: userFound.id,
        departmentId
      })

      if (isAlreadyMember) {
        throw new UserInputError('Người dùng này đã là thành viên của khoa')
      }
      const document = await models.DepartmentUser.create({
        userId: userFound.id,
        departmentId,
        departmentRole: role
      })
      return document
    },
    removeMember: combineResolvers(
      // TODO: handle only head of department is allowed
      async (root, { departmentId, userId }, { models, newErr }) => {
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
