import { expect } from 'chai'

import * as userApi from './userApi'

describe('users', () => {
  describe('user(id: String!): User', () => {
    it('returns a user when user can be found', async () => {
      const expectedResult = {
        data: {
          user: {
            id: '5c35e34fc90cbf0a105a9ed7',
            username: 'toai',
            email: 'pinz.impossible@gmail.com',
            role: ['user']
          }
        }
      }

      const result = await userApi.user({ id: '5c35e34fc90cbf0a105a9ed7' })

      expect(result.data).to.eql(expectedResult)
    })

    it('returns null when user cannot be found', async () => {
      const expectedResult = {
        data: {
          user: null
        }
      }

      const result = await userApi.user({ id: '42' })

      expect(result.data).to.eql(expectedResult)
    })
  })
describe('users', () => {
  it('returns a list of users', async () => {
    const expectedResult = {
      data: {
          users: [
            {
              id: '5c35e34fc90cbf0a105a9ed7',
              username: 'toai',
              email: 'pinz.impossible@gmail.com',
              role: ['user']
            },
            {
              id: '5c35e447c90cbf0a105a9ed9',
              username: 'mark',
              email: 'mark@gmule.com',
              role: ['user']
            },
            {
              id: '5c35e88329884c0aa096e6a3',
              username: 'thanhhuy',
              email: 'huyhuythanh3010@gmail.com',
              role: ['user']
            },
            {
              id: '5c35f283fd0a5541406cb4aa',
              username: 'quangkhai',
              email: 'quangkhai897@gmail.com',
              role: ['user']
            },
            {
              id: '5c35f5e8ee02da41c87aaea2',
              username: 'vinh',
              email: 'vinh@ya.com',
              role: ['user', 'admin']
            }
          ]   
      }
    }
    const { data: { data: { signIn: { token } } } } = await userApi.signIn({ username: 'vinh', password: '123' })
    let result
    try {
      result = await userApi.users({data},token
        // [
        // {
        //   id: '5c35e34fc90cbf0a105a9ed7',
        //   username: 'toai',
        //   email: 'pinz.impossible@gmail.com',
        //   role: ['user']
        // },
        // {
        //   id: '5c35e447c90cbf0a105a9ed9',
        //   username: 'mark',
        //   email: 'mark@gmule.com',
        //   role: ['user']
        // },
        // {
        //   id: '5c35e88329884c0aa096e6a3',
        //   username: 'thanhhuy',
        //   email: 'huyhuythanh3010@gmail.com',
        //   role: ['user']
        // },
        // {
        //   id: '5c35f283fd0a5541406cb4aa',
        //   username: 'quangkhai',
        //   email: 'quangkhai897@gmail.com',
        //   role: ['user']
        // },
        // {
        //   id: '5c35f5e8ee02da41c87aaea2',
        //   username: 'vinh',
        //   email: 'vinh@ya.com',
        //   role: ['user', 'admin']
        // }],
      )
    } catch (error) {
      console.log('err: ', error.response.data);
    }
    // const result = await userApi.users(token) 
    console.log('expectedResult: ', result.data)
    expect(result.data).to.eql(expectedResult)

  })

})


  describe('me: User', () => {
    it('returns null when no user is signed in', async () => {
      const expectedResult = {
        data: {
          me: null
        }
      }
      const { data } = await userApi.me()

      expect(data).to.eql(expectedResult)
    })

    it('returns me when me is signed in', async () => {
      const expectedResult = {
        data: {
          me: {
            id: '5c35e88329884c0aa096e6a3',
            username: 'thanhhuy',
            email: 'huyhuythanh3010@gmail.com'
          }
        }
      }

      const {
        data: {
          data: {
            signIn: { token }
          }
        }
      } = await userApi.signIn({
        login: 'thanhhuy',
        password: '123'
      })

      const { data } = await userApi.me(token)

      expect(data).to.eql(expectedResult)
    })
  })

  describe('signUp, updateUser, deleteUser', () => {
    it('signs up a user, updates a user and deletes the user as admin', async () => {
      // sign up

      let {
        data: {
          data: {
            signUp: { token }
          }
        }
      } = await userApi.signUp({
        username: 'Mark',
        email: 'mark@gmule.com',
        password: 'asdasdasd'
      })

      const {
        data: {
          data: { me }
        }
      } = await userApi.me(token)

      expect(me).to.eql({
        id: '3',
        username: 'Mark',
        email: 'mark@gmule.com'
      })

      // update as user

      const {
        data: {
          data: { updateUser }
        }
      } = await userApi.updateUser({ username: 'Mark' }, token)

      expect(updateUser.username).to.eql('Mark')

      // delete as admin

      const {
        data: {
          data: {
            signIn: { token: adminToken }
          }
        }
      } = await userApi.signIn({
        login: 'rwieruch',
        password: 'rwieruch'
      })

      const {
        data: {
          data: { deleteUser }
        }
      } = await userApi.deleteUser({ id: me.id }, adminToken)

      expect(deleteUser).to.eql(true)
    })
  })

  describe('deleteUser(id: String!): Boolean!', () => {
    it('returns an error because only admins can delete a user', async () => {
      const {
        data: {
          data: {
            signIn: { token }
          }
        }
      } = await userApi.signIn({
        login: 'ddavids',
        password: 'ddavids'
      })

      const {
        data: { errors }
      } = await userApi.deleteUser({ id: '1' }, token)

      expect(errors[0].message).to.eql('Not authorized as admin.')
    })
  })

  describe('updateUser(username: String!): User!', () => {
    it('returns an error because only authenticated users can update a user', async () => {
      const {
        data: { errors }
      } = await userApi.updateUser({ username: 'Mark' })

      expect(errors[0].message).to.eql('Not authenticated as user.')
    })
  })

  describe('signIn(login: String!, password: String!): Token!', () => {
    it('returns a token when a user signs in with username', async () => {
      const {
        data: {
          data: {
            signIn: { token }
          }
        }
      } = await userApi.signIn({
        login: 'ddavids',
        password: 'ddavids'
      })

      expect(token).to.be.a('string')
    })

    it('returns a token when a user signs in with email', async () => {
      const {
        data: {
          data: {
            signIn: { token }
          }
        }
      } = await userApi.signIn({
        login: 'hello@david.com',
        password: 'ddavids'
      })

      expect(token).to.be.a('string')
    })

    it('returns an error when a user provides a wrong password', async () => {
      const {
        data: { errors }
      } = await userApi.signIn({
        login: 'ddavids',
        password: 'dontknow'
      })

      expect(errors[0].message).to.eql('Invalid password.')
    })
  })

  it('returns an error when a user is not found', async () => {
    const {
      data: { errors }
    } = await userApi.signIn({
      login: 'dontknow',
      password: 'ddavids'
    })

    expect(errors[0].message).to.eql(
      'No user found with this login credentials.'
    )
  })
})


