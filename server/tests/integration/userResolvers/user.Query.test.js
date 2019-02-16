import { expect } from 'chai'
import { adminLogin, userLogin } from '../../utils'
import * as userApi from './userApi'

describe.only('User Resolvers Query', () => {
  describe('query user(id: $id)', () => {
    it('Should returns null if "id" parameter is not exist', async () => {
      const expectedResult = {
        data: {
          user: null
        }
      }
      const { token } = await adminLogin()
      const { data } = await userApi.user({ id: '5c251320613e7e0025233cad' }, token)

      expect(data).to.eql(expectedResult)
    })

    it('should returns a user', async () => {
      const expectedResult = {
        data: {
          user: {
            id: '5c67c8db0993f7210ef97450',
            username: 'vinh',
            email: 'vinh@ya.co',
            role: ['user', 'admin']
          }
        }
      }
      const { token } = await adminLogin()
      const { data } = await userApi.user({ id: '5c67c8db0993f7210ef97450' }, token)

      expect(data).to.eql(expectedResult)
    })
  })

  describe('query users', () => {
    it('Should throw Error() if not logged as an administrator', async () => {
      const expectedResult = 'Not authorized as admin.'
      const { token } = await userLogin({ username: 'user', password: '123' })
      const {
        data: { errors }
      } = await userApi.users(token)
      const [{ message }] = errors
      expect(message).to.eql(expectedResult)
    })

    it('Should returns a list of users', async () => {
      const expectedResult = {
        data: {
          users: [
            {
              id: '5c67c8db0993f7210ef97451',
              username: 'user',
              email: 'user@gmail.com',
              role: ['user']
            },
            {
              id: '5c67c8db0993f7210ef97450',
              username: 'vinh',
              email: 'vinh@ya.co',
              role: ['user', 'admin']
            }
          ]
        }
      }
      const { token } = await adminLogin()
      const { data } = await userApi.users(token)
      expect(data).to.eql(expectedResult)
    })
  })

  describe('query me', () => {
    it('Should return self information', async () => {
      const expectedResult = {
        me: {
          id: '5c67c8db0993f7210ef97451',
          email: 'user@gmail.com',
          username: 'user',
          firstname: '',
          lastname: '',
          role: ['user'],
          isActivated: true
        }
      }
      const { token } = await userLogin({ username: 'user', password: '123' })
      const {
        data: { data }
      } = await userApi.me(token)
      expect(data).to.eql(expectedResult)
    })
  })
})
