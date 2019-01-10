import { expect } from 'chai'

import * as userApi from './api'
import * as eventApi from './eventApi'

describe('event', () => {
  describe('event(id: ID!): [Event]', () => {
    it.only('returns details of event', async () => {
      const expectedResult = {
        data: {
            event:
                {
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
                  }
        }
      }

      const { data: { data : { signIn: { token } } } } = await userApi.signIn({ username: 'toai', password: '123' })
      const result = await eventApi.event({id:"5c35e372c90cbf0a105a9ed8"}, token)

      expect(result.data).to.eql(expectedResult)
    })

  })

})
