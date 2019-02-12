import { expect } from 'chai'

import * as userApi from './userApi'
import * as departmentApi from './departmentApi'

describe('departments', () => {
  describe('departments(page: Int, limit: Int!): [Departments]', () => {
    it.only('should returns a list of department', async () => {
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

describe('updateDepartment', ()=>{
  describe('updateDepartment($id: ID!,$name:String,$description:String)',()=>{
    it.only('return Update Department', async ()=>{
      let expectedResult = {
        data: {
          updateDepartment: {
            id:'',
            name: 'ngôn ngữ anh',
            description:'{\"blocks\":[{\"key\":\"be8dd\",\"text\":\"des\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}'
          }
        }
      }

      const { data: { data: { signIn: { token } } } } = await userApi.signIn({ username: 'vinh', password: '123' })

      let result
      try {
        result = await departmentApi.updateDepartment({
          id:'',
          name:'Luat',
          description:'Luat Kinh Te'
        })
      } catch (error) {
        
      }
    })
  })
})
