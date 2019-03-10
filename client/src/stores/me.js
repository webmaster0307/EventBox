import { observable, action } from 'mobx'
import { client } from '@client'
import { session } from '@gqlQueries'

class Me {
  @observable me = {}

  @action
  async getMe() {
    const {
      data: { me }
    } = await client.query({
      query: session.GET_ME,
      fetchPolicy: 'network-only'
    })
    this.me = { ...me }
  }
}

export default Me
