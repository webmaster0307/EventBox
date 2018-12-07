import { ApolloError } from 'apollo-server-express'

const newErr = (message, code) => new ApolloError(message, code)

export default {
  Query: {
    category: (root, { id }, { models }) => {
      try {
        return models.Category.findById(id)
      } catch (error) {
        throw newErr(`An error occurred`, 404)
      }
    },

    categories: (root, args, { models }) => {
      try {
        return models.Category.find({ isEnabled: true })
      } catch (error) {
        throw newErr(`An error occurred`, 404)
      }
    }
  },

  Mutation: {
    addCategory: async (root, args, { models }) => {
      try {
        let newCategory = new models.Category(args)
        return await newCategory.save()
      } catch (error) {
        throw newErr(`An error occurred`, 404)
      }
    },

    updateCategory: async (root, args, { models }) => {
      try {
        // Update
        await models.Category.updateOne({ id: args.id }, args)
        return models.Category.findById(args.id)
      } catch (err) {
        throw newErr(`An error occurred`, 404)
      }
    },

    removeCategory: async (root, { id }, { models }) => {
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
