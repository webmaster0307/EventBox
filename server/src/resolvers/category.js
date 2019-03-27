export default {
  Query: {
    category: (root, { id }, { models, newErr }) => {
      try {
        return models.Category.findById(id)
      } catch (error) {
        throw newErr(`An error occurred`, 404)
      }
    },

    categories: async (root, { limit = 100 }, { models, newErr }) => {
      return await models.Category.find({ isEnabled: true })
    }
  },

  Mutation: {
    createCategory: async (root, args, { models, newErr }) => {
      try {
        let newCategory = new models.Category(args)
        return await newCategory.save()
      } catch (error) {
        throw newErr(`An error occurred`, 404)
      }
    },

    updateCategory: async (root, args, { models, newErr }) => {
      try {
        // Update
        await models.Category.updateOne({ id: args.id }, args)
        return models.Category.findById(args.id)
      } catch (err) {
        throw newErr(`An error occurred`, 404)
      }
    },

    deleteCategory: async (root, { id }, { models, newErr }) => {
      try {
        // Update
        await models.Category.updateOne({ id }, { isEnabled: false })
        return models.Category.findById(id)
      } catch (err) {
        throw newErr(`An error occurred`, 404)
      }
    }
  }
}
