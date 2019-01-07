export default {
  Query: {
    department: (root, { id }, { models, newErr }) => {
      try {
        return models.Department.findById(id)
      } catch (error) {
        throw newErr(`An error occurred`, 404)
      }
    },

    departments: (root, args, { models, newErr }) => {
      try {
        return models.Department.find(null, null, {
          sort: {
            createdAt: -1
          }
        })
      } catch (error) {
        throw newErr(`An error occurred`, 404)
      }
    }
  },

  Mutation: {
    createDepartment: async (root, args, { models, newErr }) => {
      try {
        let newDepartment = new models.Department(args)
        return await newDepartment.save()
      } catch (error) {
        throw newErr(`An error occurred`, 404)
      }
    },

    updateDepartment: async (root, args, { models, newErr }) => {
      try {
        // Update
        await models.Department.updateOne({ id: args.id }, args)
        return models.Department.findById(args.id)
      } catch (err) {
        throw newErr(`An error occurred`, 404)
      }
    },

    deleteDepartment: async (root, { id }, { models, newErr }) => {
      try {
        // Update
        await models.Department.updateOne({ id }, { isEnabled: false })
        return models.Department.findById(id)
      } catch (err) {
        throw newErr(`An error occurred`, 404)
      }
    }
  }
}
