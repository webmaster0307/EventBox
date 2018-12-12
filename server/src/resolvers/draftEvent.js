export default {
  Query: {
    draftEvent: (root, { id }, { models, newErr }) => {
      try {
        return models.DraftEvent.findById(id)
      } catch (error) {
        throw newErr(`An error occurred`, 404)
      }
    },

    draftEvents: (root, args, { models, newErr }) => {
      try {
        return models.DraftEvent.find({ isEnabled: true })
      } catch (error) {
        throw newErr(`An error occurred`, 404)
      }
    }
  },

  Mutation: {
    createDraftEvent: async (root, args, { models, newErr }) => {
      try {
        let newDraftEvent = new models.DraftEvent(args)
        return await newDraftEvent.save()
      } catch (error) {
        throw newErr(`An error occurred`, 404)
      }
    },

    updateDraftEvent: async (root, args, { models, newErr }) => {
      try {
        // Update
        await models.DraftEvent.updateOne({ id: args.id }, args)
        return models.DraftEvent.findById(args.id)
      } catch (err) {
        throw newErr(`An error occurred`, 404)
      }
    },

    deleteDraftEvent: async (root, { id }, { models, newErr }) => {
      try {
        // Update
        await models.DraftEvent.updateOne({ id }, { isEnabled: false })
        return models.DraftEvent.findById(id)
      } catch (err) {
        throw newErr(`An error occurred`, 404)
      }
    }
  }
}
