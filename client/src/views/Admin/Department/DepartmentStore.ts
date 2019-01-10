import { observable, action } from 'mobx'
import { client } from '@client'
import { department } from '@gqlQueries'

class DepartmentStore {

  @observable listLoading = true
  @observable departments: any[] = []

  @action
  async getDepartments(){
    let result: any
    try {
      result = await client.query({ query: department.GET_PAGINATED_DEPARTMENTS, variables: { limit: 5 } })
    } catch (error) {
      
    }
    const { departments } = result.data
    this.departments = departments
    this.listLoading = false
  }

  @action
  addDepartment(_department: any){
    this.departments.unshift(_department)
  }
}

export default DepartmentStore