import { expect } from 'chai'
import chalk from 'chalk'
import * as userApi from './userApi'
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
            description: '{\"blocks\":[{\"key\":\"6j5u\",\"text\":\"des\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}',
            organizationName: 'VLU',
            organizationLogo: 'https://i.imgur.com/f1Q97JB.png',
            organizationDescription: 'VLU',
            startTime: '1547107310490',
            endTime: '1547712118533',
            location: 'Lucy and Jack Plaza',
            address: '123/123 Nguyễn Khắc Nhu'
          }
        }
      }

      const { data: { data: { signIn: { token } } } } = await userApi.signIn({ username: 'toai', password: '123' })
      const result = await eventApi.detailEvent({ id: '5c3d93883997b71214c014e1' }, token)

      expect(result.data).to.eql(expectedResult)
    })

  })
  describe('personalEvent(id: ID!): [Event]', () => {
    it('returns list of your event', async () => {
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
            updatedAt: '1547539336139'
          }
        }
      }
      const { data: { data: { signIn: { token } } } } = await userApi.signIn({ username: 'toai', password: '123' })
      const result = await eventApi.personalEvent({ id: '5c3d93883997b71214c014e1' }, token)
      console.log(chalk.blue(JSON.stringify(result.data)))
      expect(result.data).to.eql(expectedResult)
    })

  })
})

describe('listEventsHomepage', () => {
  describe('events(status:String, limit: Int!): [Events]', () => {
    it('returns List of event', async () => {
      const expectedResult = {
        data: {
          events: {
            edges: [
              {
                id: '5c40a88ca9ceeb2e906424df',
                title: 'Event01',
                status:'draft',
                createdAt: '1547741324817',
                images: {
                  thumbnail: 'https://i.imgur.com/3PuAloY.png'
                },
                user: {
                  id: '5c35e34fc90cbf0a105a9ed7',
                  username: 'toai'
                }
              }, {
                id: "5c40a86ea9ceeb2e906424de",
                title: "Event01",
                status:'draft',
                createdAt: "1547741294665",
                images: {
                  thumbnail: "https://i.imgur.com/3PuAloY.png"
                },
                user: {
                  id: "5c35e34fc90cbf0a105a9ed7",
                  username: "toai"
                }
              },
              {
                id: "5c3f58366254d23848f86bc7",
                title: "Event01",
                status:'draft',
                createdAt: "1547655222731",
                images: {
                  thumbnail: "https://i.imgur.com/3PuAloY.png"
                },
                user: {
                  id: "5c35e34fc90cbf0a105a9ed7",
                  username: "toai"
                }
              },
              {
                id: "5c3f582f6254d23848f86bc6",
                title: "Event01",
                status:'draft',
                createdAt: "1547655215330",
                images: {
                  thumbnail: "https://i.imgur.com/3PuAloY.png"
                },
                user: {
                  id: "5c35e34fc90cbf0a105a9ed7",
                  username: "toai"
                }
              },
              {
                id: "5c3edaaa179d09221c2e7eb4",
                title: "Event01",
                status:'draft',
                createdAt: "1547623082902",
                images: {
                  thumbnail: "https://i.imgur.com/3PuAloY.png"
                },
                user: {
                  id: "5c35e34fc90cbf0a105a9ed7",
                  username: "toai"
                }
              },
              {
                id: "5c3ed8c1179d09221c2e7eb3",
                title: "Event01",
                status:'draft',
                createdAt: "1547622593306",
                images: {
                  thumbnail: "https://i.imgur.com/3PuAloY.png"
                },
                user: {
                  id: "5c35e34fc90cbf0a105a9ed7",
                  username: "toai"
                }
              },
              {
                id: "5c3eb585836eb617b46ac36f",
                title: "Event05",
                status:'draft',
                createdAt: "1547613573934",
                images: {
                  thumbnail: "https://i.imgur.com/mKpeEWw.jpg"
                },
                user: {
                  id: "5c35f283fd0a5541406cb4aa",
                  username: "quangkhai"
                }
              },
              {
                id: "5c3eb463836eb617b46ac36e",
                title: "Event04",
                status:'draft',
                createdAt: "1547613283625",
                images: {
                  thumbnail: "https://i.imgur.com/3PuAloY.png"
                },
                user: {
                  id: "5c35e88329884c0aa096e6a3",
                  username: "thanhhuy"
                }
              }
            ]
          }
        }
      }
      const { data: { data: { signIn: { token } } } } = await userApi.signIn({ username: 'toai', password: '123' })
      const result = await eventApi.listEventsHomepage({ status: "draft", limit: 8 }, token)

      expect(result.data).to.eql(expectedResult)
    })

  })

  describe('deleteEvent', () => {
    it('return an error ')
  })
})

describe('createEvent', () => {
  describe('createEvent($title: String!, $thumbnail: String!, $description: String!, $shortDescription: String,$organizationName: String!, $organizationLogo: String, $organizationDescription: String, $startTime: String, $endTime: String, $location: String, $address: String): [Ev]', () => {
    it('return create new event', async () => {
      let expectedResult = {
        data: {
          createEvent: {
            title: 'Event01',
            description: "{\"blocks\":[{\"key\":\"be8dd\",\"text\":\"des\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
            status: 'draft'
          }
        }
      }
      const { data: { data: { signIn: { token } } } } = await userApi.signIn({ username: 'toai', password: '123' })
      // console.log('token: ',token)
      let result
      try {
        result = await eventApi.createEvent({
          title: "Event01",
          thumbnail: "https://i.imgur.com/3PuAloY.png",
          shortDescription: "short",
          description: "{\"blocks\":[{\"key\":\"be8dd\",\"text\":\"des\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
          organizationName: "Vanlang University",
          organizationLogo: "https://i.imgur.com/f1Q97JB.png",
          organizationDescription: "VLU",
          startTime: "1547121898322",
          endTime: "1547726700642",
          location: "Lucy and Jack Plaza",
          address: "123/123 Nguyễn Khắc Nhu"
        }, token)
        // console.log('result: ', result.data)
      } catch (error) {
        console.log('err: ', error.response.data);
      }
      console.log('expectedResult: ', result.data)
      expect(result.data).to.eql(expectedResult)
    })
  })
})
describe('updateEvent', () => {
  describe('updateEvent($id: ID!, $title: String!, $thumbnail: String!, $description: String!, $shortDescription: String, $categoryId: String, $location: String, $regFrom: String, $regTo: String, $organizationName: String!, $organizationLogo: String, $organizationDescription: String, $startTime: String, $endTime: String, $address: String): [uEv]', () => {
    it('return update new event', async () => {
      let expectedResult = {
        data: {
          updateEvent: {
            id: '5c3e9f3dfdc79842649ae1f6',
            title: 'Event02',
            description: "{\"blocks\":[{\"key\":\"be8dd\",\"text\":\"des\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
            status: 'draft'
          }
        }
      }
      const { data: { data: { signIn: { token } } } } = await userApi.signIn({ username: 'toai', password: '123' })
      // console.log('token: ',token)
      let result
      try {
        result = await eventApi.updateEvent({
          id: '5c3e9f3dfdc79842649ae1f6',
          title: "Event02",
          thumbnail: "https://i.imgur.com/3PuAloY.png",
          shortDescription: "short",
          description: "{\"blocks\":[{\"key\":\"be8dd\",\"text\":\"des\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
          organizationName: "Vanlang University",
          organizationLogo: "https://i.imgur.com/f1Q97JB.png",
          organizationDescription: "VLU",
          startTime: "1547121898322",
          endTime: "1547726700642",
          location: "Lucy and Jack Plaza",
          address: "123/123 Nguyễn Khắc Nhu"
        }, token)
        // console.log('result: ', result.data)
      } catch (error) {
        console.log('err: ', error.response.data);
      }
      console.log('expectedResult: ', result.data)
      expect(result.data).to.eql(expectedResult)
    })
  })
})
