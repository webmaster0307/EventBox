import { expect } from 'chai'

import * as userApi from './userApi'
import * as departmentApi from './departmentApi'

describe('departments', () => {
  describe('departments(page: Int, limit: Int!): [Departments]', () => {
    it('should returns a list of department', async () => {
      const expectedResult = {
        data: {
          departments: [
            {
              name: "NNA",
              description: "NNA"
            },{
              name: "NNA",
              description: "NNA"
            },{
              name: "ngôn ngữ anh",
              description: "NN"
            },
            {
              name: "CNTT",
              description: "CNTT"
            }
          ]
        }
      }

      const { data: { data : { signIn: { token } } } } = await userApi.signIn({ username: 'vinh', password: '123' })
      const result = await departmentApi.departments({ limit: 2}, token)

      expect(result.data).to.eql(expectedResult)
    })

  })

})

describe('createDepartment', ()=>{
  describe('createDepartment($name:String!,$description:String)',()=>{
    it.only('create Department successful', async ()=>{
      let expectedResult = {
        data: {
          createDepartment: {
            name: 'LKT',
          }
        }
      }

      const { data: { data: { signIn: { token } } } } = await userApi.signIn({ username: 'vinh', password: '123' })
      console.log(token);
      
      let result
      try {
        result = await departmentApi.createDepartment({
          name:'LKT',

        },token)
      } catch (error) {
        console.log('err: ', error.response.data);
      }
      console.log('expectedResult: ', result.data)
      expect(result.data).to.eql(expectedResult)
    })
  })
})
