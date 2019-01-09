import { expect } from 'chai'

import * as userApi from './api'
import * as eventApi from './eventApi'

describe('events', () => {
  describe('events(limit: Int!, status:String!): [Events]',
    () => {
      it('return a list of events', async () => {
        const expectResult = {
          data: {
            events: [
              {
                title: "Event01",
                status: "draft",
                images: {
                  thumbnail: "https://i.imgur.com/3PuAloY.png"
                },
                createdAt,
                user:{
                  username:"toai"
                }
              },
              
            ]
          }
        }
        const { data: { data : { signIn: { token } } } } = await userApi.signIn({ username: 'thanhhuy', password: '123' })
        const result = await eventApi.departments({ limit: 1 }, token)
        expect(result.data).to.eql(expectResult)
      })
    })
})

