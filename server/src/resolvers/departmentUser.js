import { UserInputError } from 'apollo-server'

export default {
  Query: {
    departmentuserList: async (root, { page, limit }, { models, newErr }) => {
      try {
        return models.DepartmentUser.find(null, null, {
          sort: {
            createdAt: -1
          }
        })
      } catch (error) {
        throw newErr(`An error occurred`, 404)
      }
    },
    departmentuser: async (root, { id }, { models, newErr }) => {
      try {
        return models.DepartmentUser.findById(id)
      } catch (error) {
        throw newErr(`An error occurred`, 404)
      }
    },
    // TODO: authentication
    userOfDepartments: async(root, { departmentId }, { models }) => {
      const dpmUsers = await models.DepartmentUser.find({ departmentId }).populate('userId')
      const users = dpmUsers.map(item => item.userId)
      // console.log('users: ',users)
      
      return users
    }
  },

  Mutation: {
    // TODO: only allow head of department to invite user 
    inviteMember: async (root, { departmentId, email, role }, { models, newErr }) => {
      const userFound = await models.User.findOne({ email })
      if(!userFound){
        throw new UserInputError(
          'Email không hợp lệ'
        )
      }
      const validRoles = ['reviewer', 'member']

      if(!validRoles.includes(role)){
        throw new UserInputError(
          'Vai trò thành viên không hợp lệ'
        )
      }

      const isAlreadyMember = await models.DepartmentUser.findOne({
        userId: userFound.id,
        departmentId
      })

      if(isAlreadyMember){
        throw new UserInputError(
          'Người dùng này đã là thành viên của khoa'
        )
      }
      const document = await models.DepartmentUser.create({
        userId: userFound.id,
        departmentId,
        departmentRole: role
      })
      return document
    },
  },

  DepartmentUser: {
    user: async (dpuser, args, { loaders }) =>{
      return await loaders.user.load(dpuser.userId)
    },
    
    department: async (dpuser, args, { models }) => {
      return {}
    }
  },

}
