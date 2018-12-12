export default {
  Query: {
    contact: (root, { id }, { models, newErr }) => {
      try {
        return models.Contact.findById(id)
      } catch (error) {
        throw newErr(`An error occurred`, 404)
      }
    }
  },

  Mutation: {
    createContact: async (root, args, { models, newErr }) => {
      try {
        let newContact = new models.Contact(args)
        return await newContact.save()
      } catch (error) {
        throw newErr(`An error occurred`, 404)
      }
    },

    updateContact: async (root, args, { models, newErr }) => {
      try {
        // Update
        await models.Contact.updateOne({ id: args.id }, args)
        return models.Contact.findById(args.id)
      } catch (err) {
        throw newErr(`An error occurred`, 404)
      }
    },

    deleteContact: async (root, { id }, { models, newErr }) => {
      try {
        // Update
        await models.Contact.updateOne({ id }, { isEnabled: false })
        return models.Contact.findById(id)
      } catch (err) {
        throw newErr(`An error occurred`, 404)
      }
    }
  }
}
