import React, { Component } from 'react'
import QueueAnim from 'rc-queue-anim'
import { Row, Col, AutoComplete, Form, Button, Tabs, Icon, Select, Skeleton, message } from 'antd'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import * as routes from '@routes'
import { event } from '@gqlQueries'
import { Query } from 'react-apollo'

import { categoryOpts, selectTimeOpts } from '../../../constants/options'

const FormItem = Form.Item
const TabPane = Tabs.TabPane
const Option = Select.Option

@withRouter
class FirstSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      suggestions: []
    }
  }

  handleGoToEventDetail = (event) => {
    this.props.history.push(`${routes.EVENT}/${event.slug}-${event.id}`)
  }

  handleAutoCompleteSelect(value) {
    console.log(value)
  }

  handleAutoCompleteSearch = (eventsForSearch, words) => {
    if (words) {
      const suggestions = eventsForSearch.filter(title =>
        title.toLowerCase().indexOf(words.toLowerCase()) !== -1)
      this.setState({ suggestions })
    } else this.setState({ suggestions: [] })
  }

  render() {
    const { suggestions } = this.state
    const { i18n } = this.props
    const { getFieldDecorator } = this.props.form
    const formInputLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 24 }
      }
    }
    const formButtonLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 24 }
      }
    }

    const categoryOptions = []
    categoryOpts.map((opt, i) => {
      categoryOptions.push(<Option key={opt.key}>{i18n.t(opt.text)}</Option>)
      return opt
    })

    const selectTimeOptions = []
    selectTimeOpts.map((opt, i) => {
      selectTimeOptions.push(<Option key={opt.key}>{i18n.t(opt.text)}</Option>)
      return opt
    })

    return (
      <div className='home-page-wrapper content0-wrapper'>
        <div className='home-page content0'>
          <div className='title-wrapper'>
            <Tabs defaultActiveKey='1'>
              <TabPane
                tab={
                  <span>
                    <Icon type='form' />
                    {i18n.t('Search by keywords')}
                  </span>
                }
                key='1'
              >
                <Form
                  style={{
                    background: 'rgba(0,0,0,.03)',
                    borderRadius: 10,
                    padding: 10
                  }}
                >
                  <Query query={event.EVENTS_FOR_SEARCH}>
                    {({loading, error, data: { eventsForSearch }}) => {
                      if (loading) return <Skeleton />
                      if (error) return message.error(error)
                      return (
                        <FormItem {...formInputLayout}>
                          {getFieldDecorator('searchbar', { rules: [] }) (
                            <AutoComplete
                              id='searchbar'
                              dataSource={suggestions}
                              onSelect={(v) => this.handleAutoCompleteSelect(v)}
                              onSearch={(v) => this.handleAutoCompleteSearch(eventsForSearch, v)}
                              placeholder='Search for events...'
                              style={{ width: '60%' }}
                            />
                          )}
                        </FormItem>
                      )
                    }}
                  </Query>
                  <FormItem {...formButtonLayout}>
                    <Button
                      style={{
                        background: 'rgba(13, 32, 51, .8)',
                        border: 'rgba(13, 32, 51, .8)'
                      }}
                      type='primary'
                      htmlType='submit'
                    >
                      {i18n.t('Search')}
                      <Icon type='search' />
                    </Button>
                  </FormItem>
                </Form>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <Icon type='bars' />
                    {i18n.t('Search by Options')}
                  </span>
                }
                key='2'
              >
                <Row gutter={20}>
                  <Col xs={0} sm={0} md={6} lg={6} />
                  <Col xs={24} sm={24} md={6} lg={6} style={{ margin: '10px 0' }}>
                    <Select
                      suffixIcon={<Icon type='calendar' />}
                      placeholder='Select categories'
                      mode='multiple'
                      style={{ width: '100%' }}
                      onSelect={(e) => {
                        console.log(e)
                      }}
                    >
                      {categoryOptions}
                    </Select>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6} style={{ margin: '10px 0' }}>
                    <Select
                      placeholder='Select time'
                      style={{ width: '100%' }}
                      onSelect={(e) => {
                        console.log(e)
                      }}
                    >
                      {selectTimeOptions}
                    </Select>
                  </Col>
                  <Col xs={0} sm={0} md={6} lg={6} />
                </Row>
              </TabPane>
            </Tabs>
          </div>
          <OverPack playScale={0.3} className=''>
            <QueueAnim
              className='block-wrapper'
              type='bottom'
              key='block'
              leaveReverse
              component={Row}
            >
              {/* {listChildren} */}
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    )
  }
}

export default translate('translations')(Form.create()(FirstSection))
