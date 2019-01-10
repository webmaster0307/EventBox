import { expect } from 'chai'

import * as userApi from './api'
import * as eventApi from './eventApi'

describe('event', () => {
  describe('detailEvent(id: ID!): [Event]', () => {
    it('returns details of event', async () => {
      const expectedResult = {
        data: {
          event:
          {
            title: 'Event01',
            images: {
              thumbnail: 'https://i.imgur.com/3PuAloY.png'
            },
            shortDescription: 'short',
            description: "{\"blocks\":[{\"key\":\"be8dd\",\"text\":\"des\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
            organizationName: 'Vanlang University',
            organizationLogo: 'https://i.imgur.com/f1Q97JB.png',
            organizationDescription: 'VLU',
            startTime: '1547121898322',
            endTime: '1547726700642',
            location: 'Lucy and Jack Plaza',
            address: '123/123 Nguyễn Khắc Nhu'
          }
        }
      }

      const { data: { data: { signIn: { token } } } } = await userApi.signIn({ username: 'toai', password: '123' })
      const result = await eventApi.detailEvent({ id: '5c35e372c90cbf0a105a9ed8' }, token)

      expect(result.data).to.eql(expectedResult)
    })

  })
  describe('personalEvent(id: ID!): [Event]', () => {
    it.only('returns list of your event', async () => {
      const expectedResult = {
        data: {
          event:
            {
              title: 'Event01',
              images: {
                thumbnail: 'https://i.imgur.com/3PuAloY.png'
              },
              status: 'draft',
              user: {
                username: 'toai'
              },
              updatedAt: '1547055129207'
            }
        }
      }
      const { data: { data: { signIn: { token } } } } = await userApi.signIn({ username: 'toai', password: '123' })
      const result = await eventApi.personalEvent({ id: '5c35e372c90cbf0a105a9ed8'}, token)

      expect(result.data).to.eql(expectedResult)
    })

  })


})

describe('listEventsHomepage', () => {
  describe('events(status:String, limit: Int!): [Events]', () => {
    it.only('returns List of event', async () => {
      const expectedResult = {
        data: {
          events: {
            edges: [
              {
                id: '5c36f495e82c9539bc57d290',
                title: 'Event02',
                createdAt: '1547105429025',
                images: {
                  thumbnail: 'https://i.imgur.com/f1Q97JB.png'
                },
                status: 'draft',
                user: {
                  username: 'toai',
                }
              },
              {
                id: '5c36f220b5f15401dc324329',
                title: 'NEON LA RISA 2018 -lan tỏa những nụ cười tỏa nắng',
                status: 'draft',
                images: {
                  thumbnail: 'https://i.ibb.co/8DP5qK4/logo-vlu-8.png'
                },
                createdAt: '1547104800927',
                user: {
                  username: 'quangkhai'
                }
              },
              {
                id: '5c36c1bfd3ad920118f3e3d3',
                images: {
                  thumbnail: 'https://i.ibb.co/vQxmVqD/noelbui.jpg'
                },
                title: 'Cầm Cân Nảy Mực',
                status: 'draft',
                createdAt: '1547092415490',
                user: {
                  username: 'thanhhuy'
                }
              },
              {
                id: '5c35e372c90cbf0a105a9ed8',
                images: {
                  thumbnail: 'https://i.imgur.com/3PuAloY.png'
                },
                title: 'Event01',
                status: 'draft',
                createdAt: '1547035506835',
                user: {
                  username: "toai"
                }
              },

              
            ]
          }
        }
      }
      const { data: { data: { signIn: { token } } } } = await userApi.signIn({ username: 'toai', password: '123' })
      const result = await eventApi.listEventsHomepage({ status: "draft", limit: 2 }, token)

      expect(result.data).to.eql(expectedResult)
    })

  })

})

// describe('createEvent', () => {
//   describe('createEvent(title:String, thumbnail: String!)')

// })
