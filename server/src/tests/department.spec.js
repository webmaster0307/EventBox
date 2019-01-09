import { expect } from 'chai'

import * as userApi from './api'
import * as departmentApi from './departmentApi'

describe('departments', () => {
  describe('departments(page: Int, limit: Int!): [Departments]', () => {
    it.only('returns a list of department', async () => {
      const expectedResult = {
        data: {
          departments: [
            {
              name: "CNTT",
              description: "CNTT"
            }
          ]
        }
      }

      const { data: { data : { signIn: { token } } } } = await userApi.signIn({ username: 'vinh', password: '123' })
      const result = await departmentApi.departments({ limit: 1 }, token)

      expect(result.data).to.eql(expectedResult)
    })

  })

})
