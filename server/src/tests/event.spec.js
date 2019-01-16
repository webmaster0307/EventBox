import { expect } from 'chai'
import chalk from 'chalk'
import * as userApi from './userApi'
import * as eventApi from './eventApi'

describe('event', () => {
  describe('detailEvent(id: ID!): [Event]', () => {
    it.only('returns details of event', async () => {
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
      const result = await eventApi.personalEvent({ id: '5c3d93883997b71214c014e1'}, token)
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

  describe('deleteEvent', ()=>{
    it('return an error ')
  })
})

describe('createEvent', () => {
  describe('createEvent($title: String!, $thumbnail: String!, $description: String!, $shortDescription: String,$organizationName: String!, $organizationLogo: String, $organizationDescription: String, $startTime: String, $endTime: String, $location: String, $address: String): [Ev]', () => {
    it.only('return create new event', async () => {
      let expectedResult = {
          data: {
            createEvent:{
              title: 'Event01',
              description: "{\"blocks\":[{\"key\":\"be8dd\",\"text\":\"des\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
              status: 'draft'
            }
        }
      }
      const {data:{data:{signIn: {token}}}}= await userApi.signIn({ username: 'toai', password: '123' })
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
        address: "123/123 Nguyễn Khắc Nhu" }, token)
        // console.log('result: ', result.data)
      } catch (error) {
        console.log('err: ',error.response.data);
      }
      console.log('expectedResult: ',result.data)
      expect(result.data).to.eql(expectedResult)
    })
  })
})
describe('updateEvent', () => {
  describe('updateEvent($id: ID!, $title: String!, $thumbnail: String!, $description: String!, $shortDescription: String, $categoryId: String, $location: String, $regFrom: String, $regTo: String, $organizationName: String!, $organizationLogo: String, $organizationDescription: String, $startTime: String, $endTime: String, $address: String): [uEv]', () => {
    it.only('return update new event', async () => {
      let expectedResult = {
          data: {
            updateEvent:{
              id:'5c3e9f3dfdc79842649ae1f6',
              title: 'Event02',
              description: "{\"blocks\":[{\"key\":\"be8dd\",\"text\":\"des\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
              status: 'draft'
            }
        }
      }
      const {data:{data:{signIn: {token}}}}= await userApi.signIn({ username: 'toai', password: '123' })
      // console.log('token: ',token)
      let result
      try {
        result = await eventApi.updateEvent({
        id:'5c3e9f3dfdc79842649ae1f6',
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
        address: "123/123 Nguyễn Khắc Nhu" }, token)
        // console.log('result: ', result.data)
      } catch (error) {
        console.log('err: ',error.response.data);
      }
      console.log('expectedResult: ',result.data)
      expect(result.data).to.eql(expectedResult)
    })
  })
})
