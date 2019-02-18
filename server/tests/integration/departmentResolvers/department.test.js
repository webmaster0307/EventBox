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
              description: null,
              name: 'LKT'
            },
            {
              name: 'LKT',
              description: null
            }
          ]
        }
      }

      const { token } = await adminLogin()
      const result = await departmentApi.departments({ limit: 2 }, token)

      expect(result.data).to.eql(expectedResult)
    })
  })
})

describe('createDepartment', () => {
  describe('createDepartment($name:String!,$description:String)', () => {
    it('create Department successful', async () => {
      let expectedResult = {
        data: {
          createDepartment: {
            name: 'LKT'
          }
        }
      }

      const {
        data: {
          data: {
            signIn: { token }
          }
        }
      } = await userApi.signIn({ username: 'vinh', password: '123' })

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
