import { observable, action } from 'mobx'
import { client } from '@client'
import { user, department } from '@gqlQueries'

class AdminStore {

  constructor(){
    this.accountStore = new AccountStore()
    this.departmentStore = new DepartmentStore()
  }
}

class AccountStore {

  @observable accountList= []

  @action
  async getAccountList () {
    try {
      const { data: { users } } = await client.query({
        query: user.GET_ALL_USERS,
        fetchPolicy: 'no-cache'
      })
      // users.map(u => {
      //   u.fullname = `${u.firstname} ${u.lastname}`
      //   return u
      // })
      // console.log(users)
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

class DepartmentStore {

  @observable listLoading = true
  @observable departments = []

  @action
  async getDepartments(){
    let result
    try {
      result = await client.query({ query: department.GET_PAGINATED_DEPARTMENTS, variables: { limit: 5 } })
    } catch (error) {

    }
    const { departments } = result.data
    this.departments = departments
    this.listLoading = false
  }

  @action
  addDepartment(_department){
    this.departments = [ _department, ...this.departments ]
  }
}

export default AdminStore