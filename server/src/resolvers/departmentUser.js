export default {

  Mutation: {
    // TODO: only allow head of department to invite user 
    inviteMember: async (root, { email, role }, { models, newErr }) => {
      console.log('email: ',email)
      console.log('role: ',role)

      return {}
    },
  }

}
