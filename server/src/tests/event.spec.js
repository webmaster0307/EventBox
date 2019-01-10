import { expect } from 'chai'

import * as userApi from './api'
import * as eventApi from './eventApi'

describe('events', () => {
<<<<<<< HEAD
  describe('events(status: String, limit: Int): [Events]', () => {
    it.only('returns details of event', async () => {
      const expectedResult = {
        data: {
            events: 
            {
                edges:[{
                    title: "Event01",
                    images: {
                      thumbnail: "https://i.imgur.com/3PuAloY.png"
                    },
                    shortDescription: "short",
                    description: "{\"blocks\":[{\"key\":\"be8dd\",\"text\":\"des\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
                    organizationName: "Vanlang University",
                    organizationLogo: "https://i.imgur.com/f1Q97JB.png",
                    organizationDescription: "VLU",
                    startTime: "1547121898322",
                    endTime: "1547726700642",
                    location: "Lucy and Jack Plaza",
                    address: "123/123 Nguyễn Khắc Nhu"
                  }]
            }
        }
      }

      const { data: { data : { signIn: { token } } } } = await userApi.signIn({ username: 'toai', password: '123' })
      const result = await eventApi.events({status:"draft", limit:8}, token)

      expect(result.data).to.eql(expectedResult)
    })

  })

})
=======
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

>>>>>>> 63feb372f364d07d3fa47d977138d90d3676f409
