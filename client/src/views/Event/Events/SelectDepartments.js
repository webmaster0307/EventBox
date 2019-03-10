import React, { Component } from 'react'
import { Icon, Checkbox, Spin, Button, Row, Col, message } from 'antd'
import { Query, Mutation } from 'react-apollo'
import { event, department } from '@gqlQueries'

const { Group: CheckboxGroup } = Checkbox

export default class SelectDepartments extends Component {
  state = {
    departmentIds: this.props.value || []
  }

  selectDepartments = (departmentIds) => {
    this.setState({ departmentIds })
  }

  render() {
    const {
      props: { eventId, close },
      state: { departmentIds }
    } = this

    return (
      <Query query={department.GET_EVENT_DEPARTMENTS}>
        {({ data, loading }) => {
          let options = []
          if (!loading) {
            options = data.eventDepartments.map((item) => ({
              label: item.name,
              value: item.id
            }))
          }
          return (
            <Spin
              indicator={<Icon type='loading' style={{ fontSize: 24 }} spin />}
              spinning={loading}
            >
              <CheckboxGroup
                value={departmentIds}
                onChange={this.selectDepartments}
                style={{ width: '100%' }}
              >
                <Row>
                  {options.map((opt) => (
                    <Col span={12} key={opt.value} style={{ paddingBottom: 12 }}>
                      <Checkbox value={opt.value}>{opt.label}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </CheckboxGroup>
              <Mutation
                mutation={event.PUBLISH_EVENT_BYID}
                variables={{
                  id: eventId,
                  departmentIds: this.state.departmentIds
                }}
                update={(cache, { data: { publishEvent } }) => {
                  if (!publishEvent) {
                    // return alert('Failed to delete')
                  }
                  const dpmsName = publishEvent.departments.map((d) => d.name).join(', ')
                  message.success(`Published event to [${dpmsName}] successfully!`, 3000)
                  setTimeout(() => {
                    close && close()
                  }, 2000)
                  try {
                    const data = cache.readQuery({
                      query: event.GET_PAGINATED_EVENTS_WITH_USERS
                    })
                    cache.writeQuery({
                      query: event.GET_PAGINATED_EVENTS_WITH_USERS,
                      data: {
                        ...data,
                        events: {
                          ...data.events,
                          edges: data.events.edges.map((node) => {
                            if (node.id === eventId) {
                              return {
                                ...node,
                                ...publishEvent
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
                }}
              >
                {(publishEvent, { data, loading, error }) => (
                  <Row type='flex' justify='center' style={{ padding: 12, paddingTop: 28 }}>
                    <Button type='primary' onClick={publishEvent} loading={loading}>
                      Publish
                    </Button>
                  </Row>
                )}
              </Mutation>
            </Spin>
          )
        }}
      </Query>
    )
  }
}
