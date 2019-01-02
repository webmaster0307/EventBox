import { observable, action } from 'mobx'
import { client } from '@client'
import { user } from './apollo'

class AdminStore {
  @observable accountList =[]

  @action
  async getAccountList () {
    try {
      const { data: { users } } = await client.query({
        query: user.GET_ALL_USERS,
        fetchPolicy: 'no-cache'
      })
      this.accountList = [...users]
    } catch ({graphQLErrors}) {
      const error = graphQLErrors && graphQLErrors.map(item => item.message).join(', ')
      return { error }
    }
  }

  @action
  async deleteUser (id) {
    try {
      const { data: { deleteUser } } = await client.mutate({
        mutation: user.DELETE_USER,
        variables: { id },
        fetchPolicy: 'no-cache'
      })
      if(deleteUser) {
        this.accountList = this.accountList.filter(user => user.id !== id)
      }
    } catch ({graphQLErrors}) {
      const error = graphQLErrors && graphQLErrors.map(item => item.message).join(', ')
      return { error }
    }
  }
}


export default AdminStore