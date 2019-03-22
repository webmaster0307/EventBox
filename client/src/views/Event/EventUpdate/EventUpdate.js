import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { client } from '@client'
import { Form, Button, message, Spin, BackTop } from 'antd'
import { OriganizationArea, DateHoldingArea, DescriptionArea } from '../common'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { event as eventQueries, session } from '@gqlQueries'
import { Query, Mutation } from 'react-apollo'
// import * as routes from '@routes'

const FormItem = Form.Item

@inject('stores')
@observer
class EventUpdate extends Component {
  state = {
    loading: true
  }
  editor = null

  componentDidMount = async () => {
    const { eventId } = this.props.match.params
    const {
      form,
      stores: { event }
    } = this.props
    event.editorEventCreate = EditorState.createEmpty()
    const { error, event: eventDetail } = await event.getEventById(eventId)
    if (error) {
      return message.error(error)
    }
    form.setFieldsValue({
      title: eventDetail.title,
      thumbnail: eventDetail.images.thumbnail,
      shortDescription: eventDetail.shortDescription,
      maxTickets: eventDetail.maxTickets,
      registerEndAt: moment(eventDetail.registerEndAt),
      organizationName: eventDetail.organizationName,
      organizationLogo: eventDetail.organizationLogo,
      organizationDescription: eventDetail.organizationDescription,
      startTime: moment(eventDetail.startTime),
      endTime: moment(eventDetail.endTime),
      location: eventDetail.location,
      address: eventDetail.address
    })
    this.setState({ loading: false })
    event.editorEventCreate = EditorState.createWithContent(
      convertFromRaw(JSON.parse(eventDetail.description))
    )
  }

  _handleUpdateEvent = (event) => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        const { eventId } = this.props.match.params
        const { event } = this.props.stores
        const dataSubmit = {
          id: eventId,
          ...values,
          description: JSON.stringify(convertToRaw(event.editorEventCreate.getCurrentContent())),
          rawHtmlContent: stateToHTML(event.editorEventCreate.getCurrentContent()),
          startTime: values.startTime._d,
          endTime: values.endTime._d
        }
        this.setState({ buttonLoading: true }, () => {
          client
            .mutate({
              mutation: eventQueries.UPDATE_EVENT_BYID,
              variables: dataSubmit,
              update: (cache, { data: { updateEvent } }) => {
                if (!updateEvent) {
                  // return alert('Failed to delete')
                }
                try {
                  const data = cache.readQuery({
                    query: eventQueries.GET_PAGINATED_EVENTS_WITH_USERS
                  })
                  cache.writeQuery({
                    query: eventQueries.GET_PAGINATED_EVENTS_WITH_USERS,
                    data: {
                      ...data,
                      events: {
                        ...data.events,
                        edges: data.events.edges.map((node) => {
                          if (node.id === eventId) {
                            return {
                              ...node,
                              ...updateEvent
                            }
                          } else {
                            return node
                          }
                        })
                      }
                    }
                  })
                } catch (error) {
                  // console.log('error: ',error)
                }
              }
            })
            .then(({ data, errors }) => {
              this.setState({ buttonLoading: false })
              if (errors) {
                return message.error('Failed to update event')
              }
              message.success('Event updated successfully!')
            })
            .catch(({ graphQLErrors }) => {
              this.setState({ buttonLoading: false })
              const msg =
                (graphQLErrors && graphQLErrors.map((err) => err.message).join(', ')) ||
                'Failed to update event'
              return message.error(msg)
            })
        })
      }
    })
  }

  // handlePublishEvent = async () => {
  //   const { eventId } = this.props.match.params
  //   let result
  //   try {
  //     result = await client.mutate({
  //       mutation: eventQueries.PUBLISH_EVENT_BYID,
  //       variables: { id: eventId },
  //       update: (cache, { data: { publishEvent } }) => {
  //         if (!publishEvent) {
  //           // return alert('Failed to delete')
  //         }
  //         try {
  //           const data = cache.readQuery({
  //             query: eventQueries.GET_PAGINATED_EVENTS_WITH_USERS
  //           })
  //           cache.writeQuery({
  //             query: eventQueries.GET_PAGINATED_EVENTS_WITH_USERS,
  //             data: {
  //               ...data,
  //               events: {
  //                 ...data.events,
  //                 edges: data.events.edges.map((node) => {
  //                   if (node.id === eventId) {
  //                     return {
  //                       ...node,
  //                       ...publishEvent
  //                     }
  //                   } else {
  //                     return node
  //                   }
  //                 })
  //               }
  //             }
  //           })
  //         } catch (error) {
  //           // console.log('error: ',error)
  //         }
  //       }
  //     })
  //   } catch ({ graphQLErrors }) {
  //     const msg =
  //       (graphQLErrors && graphQLErrors.map((err) => err.message).join(', ')) ||
  //       'Failed to update event'
  //     return message.error(msg)
  //   }
  //   const {
  //     data: { publishEvent }
  //   } = result
  //   if (publishEvent) {
  //     // console.log('result: ',result)
  //     message.success('Xuất bản sự kiện thành công')
  //     this.props.history.push(`${routes.DASHBOARD}/events`)
  //   }
  // }

  render() {
    const { loading, buttonLoading } = this.state
    const { eventId } = this.props.match.params

    return (
      <Spin spinning={loading}>
        <Form onSubmit={this._handleUpdateEvent} hideRequiredMark>
          <DescriptionArea {...this.props} loading={loading} updateStage />
          <OriganizationArea {...this.props} />
          <DateHoldingArea {...this.props} />
          <FormItem>
            <Button
              type='primary'
              htmlType='submit'
              loading={buttonLoading}
              icon='form'
              style={{ marginRight: 24 }}
            >
              Update Event
            </Button>
            <Query query={session.GET_LOCAL_SESSION}>
              {({ data }) =>
                data &&
                data.me &&
                data.me.role.includes('admin') && (
                  <Mutation
                    mutation={eventQueries.PUBLISH_DIRECTLY}
                    variables={{ eventId }}
                    update={(cache, { data: { publishDirectly } }) => {
                      if (!publishDirectly) {
                        return alert('Failed to publish')
                      }
                      const data = cache.readQuery({
                        query: eventQueries.GET_PAGINATED_EVENTS_WITH_USERS
                      })
                      console.log('publishDirectly: ', publishDirectly)
                      try {
                        cache.writeQuery({
                          query: eventQueries.GET_PAGINATED_EVENTS_WITH_USERS,
                          data: {
                            ...data,
                            events: {
                              ...data.events,
                              edges: data.events.edges.map((node) => {
                                if (node.id !== eventId) {
                                  return node
                                } else {
                                  return {
                                    ...node,
                                    ...publishDirectly
                                  }
                                }
                              }),
                              pageInfo: data.events.pageInfo
                            }
                          }
                        })
                      } catch (error) {
                        console.log('error: ', error)
                      }
                    }}
                  >
                    {(publishDirectly, { data, loading }) => (
                      <Button
                        type='primary'
                        loading={loading}
                        icon='thunderbold'
                        onClick={publishDirectly}
                      >
                        Publish (by Admin)
                      </Button>
                    )}
                  </Mutation>
                )
              }
            </Query>
          </FormItem>
        </Form>
        <BackTop />
      </Spin>
    )
  }
}

export default Form.create()(withRouter(EventUpdate))
