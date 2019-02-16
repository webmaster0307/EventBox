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
  })
})
