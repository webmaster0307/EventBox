import { expect } from 'chai'
import { adminLogin, userLogin } from '../../utils'
import * as departmentApi from './departmentApi'

describe('departments', () => {
  describe('departments(page: Int, limit: Int!): [Departments]', () => {
    it.only('should returns a list of department', async () => {
      const expectedResult = {
        data: {
          departments: [
            {
              name: 'Khoa CNTT',
              description: 'Khoa CNTT'
            }
          ]
        }
      }

      const { token } = await adminLogin()
      const { data } = await departmentApi.departments({ limit: 2 }, token)

      expect(data).to.eql(expectedResult)
    })
  })
})

describe('createDepartment', () => {
  describe('createDepartment($name:String!,$description:String)', () => {
    it.only('create Department successful', async () => {
      let expectedResult = {
        data: {
          createDepartment: {
            name: 'LKT'
          }
        }
      }

      const { token } = await adminLogin()
      let result
      try {
        result = await departmentApi.createDepartment(
          {
            name: 'LKT'
          },
          token
        )
      } catch (error) {
        console.log('err: ', error.response.data)
      }
      expect(result.data).to.eql(expectedResult)
    })
  })
})
