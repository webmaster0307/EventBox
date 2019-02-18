import { expect } from 'chai'
import { userLogin } from '../../utils'
import * as userApi from './userApi'

describe.only('User Resolver Mutation', () => {
  describe('mutation signIn(username: String!,password: String!)', () => {
    it('Should throw Error() if parameters provided is not exist', async () => {
      const expectedResult = 'No user found with this login credentials.'
      const {
        data: { errors }
      } = await userApi.signIn({ username: 'user123', password: '123' })
      const [{ message }] = errors
      expect(message).to.eql(expectedResult)
    })

    it('Should throw Error() if password is not valid', async () => {
      const expectedResult = 'Invalid password.'
      const {
        data: { errors }
      } = await userApi.signIn({ username: 'user', password: '1234' })
      const [{ message }] = errors
      expect(message).to.eql(expectedResult)
    })

    it('Should get token after logging sucessfully', async () => {
      const {
        data: {
          data: {
            signIn: { token }
          }
        }
      } = await userApi.signIn({ username: 'user', password: '123' })
      if (!token) {
        throw new Error('Token undefined')
      }
    })
  })
})
