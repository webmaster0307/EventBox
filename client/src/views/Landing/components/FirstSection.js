import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import QueueAnim from 'rc-queue-anim'
import { Row, Col, AutoComplete, Form, Button, Tabs, Icon, Select } from 'antd'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack'
import { translate } from 'react-i18next'

const FormItem = Form.Item
const TabPane = Tabs.TabPane
const Option = Select.Option

@inject('stores')
@observer
class FirstSection extends Component {
  title = () => [{ key: '0', name: 'title', text: 'Products and Services' }]

  block = () => [
    {
      key: '0',
      iconLink: 'https://zos.alipayobjects.com/rmsportal/WBnVOjtIlGWbzyQivuyq.png',
      title: 'One-stop service access',
      description: 'Four times the efficiency of payment, settlement, and accounting access products.'
    },
    {
      key: '1',
      iconLink: 'https://zos.alipayobjects.com/rmsportal/YPMsLQuCEXtuEkmXTTdk.png',
      title: 'One-stop risk monitoring',
      description: 'Prior risk control and quality control capabilities in all requirements configuration.'
    },
    {
      key: '2',
      iconLink: 'https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png',
      title: 'One-stop data operation',
      description: 'Precipitation product access efficiency and operational small two work efficiency data.'
    }
  ]

  render () {
    const { eventList } = this.props.stores.landing
    const { i18n } = this.props
    // const listChildren = this.block().map((item, i) => {
    //   return (
    //     <Col
    //       key={i.toString()} className='block'
    //       md={8} xs={24}
    //     >
    //       <div className='icon'>
    //         <img src={item.iconLink} width='100%' alt='img' />
    //       </div>
    //       <h3 className='content0-title'>{item.title}</h3>
    //       <div>{item.description}</div>
    //     </Col>
    //   )
    // })

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

    let categoryOpts = [
      {key: 'all', text: 'All Categories'},
      {key: 'livemusic', text: 'Live Music'},
      {key: 'artnculture', text: 'Art & Culture'},
      {key: 'theaternplays', text: 'Theater & Plays'},
      {key: 'nightlife', text: 'Night Life'},
      {key: 'outdoor', text: 'Outdoor'},
      {key: 'conference', text: 'Conference'},
      {key: 'seminarsncourses', text: 'Seminar/Courses'},
      {key: 'exhibitions', text: 'Exhibitions'},
      {key: 'meetups', text: 'Meetups'},
      {key: 'sports', text: 'Sports'},
      {key: 'community', text: 'Community'},
      {key: 'attractions', text: 'Attractions'}
    ]

    const categoryOptions = []
    categoryOpts.map((opt, i) => {
      categoryOptions.push(<Option key={opt.key}>{i18n.t(opt.text)}</Option>)
      return opt
    })

    let selectTimeOpts = [
      {key: 'all', text: 'All Upcoming dates'},
      {key: 'today', text: 'Today'},
      {key: 'tomorrow', text: 'Tomorrow'},
      {key: 'thisweek', text: 'This week'},
      {key: 'thismonth', text: 'This month'}
    ]

    const selectTimeOptions = []
    selectTimeOpts.map((opt, i) => {
      selectTimeOptions.push(<Option key={opt.key}>{i18n.t(opt.text)}</Option>)
      return opt
    })

    return (
      <div className='home-page-wrapper content0-wrapper'>
        <div className='home-page content0'>
          <div className='title-wrapper'>
            {/* {this.title().map(item =>
              createElement(item.name.indexOf('title') === 0 ? 'h1' : 'div',
                {
                  key: item.key,
                  className: item.name.indexOf('title') === 0 ? 'title-h1' : 'title-content'
                },
                typeof item.text === 'string' && item.text.match(/\.(svg|gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/)
                  ? createElement('img', {
                    src: item.text,
                    height: '100%',
                    alt: 'img'
                  })
                  : item.text
                )
            )} */}
            <Tabs defaultActiveKey='1'>
              <TabPane tab={<span><Icon type='form' />{i18n.t('Search by keywords')}</span>} key='1'>
                <Form
                  style={{
                    background: 'rgba(0,0,0,.03)',
                    borderRadius: 10,
                    padding: 10
                  }}
                >
                  <FormItem {...formInputLayout}>
                    {getFieldDecorator('searchbar',
                      {
                        rules: [
                          { type: 'string', required: true, message: 'Please input some keywords!' }
                        ]
                      })(<AutoComplete
                      id='searchbar'
                      dataSource={eventList}
                      onSelect={(v) => this.props.stores.landing.handleAutoCompleteSelect(v)}
                      onSearch={(v) => this.props.stores.landing.handleAutoCompleteSearch(v)}
                      placeholder='Search events...'
                      style={{width: '60%'}}
                    />)}
                  </FormItem>
                  <FormItem {...formButtonLayout}>
                    <Button
                      style={{
                        background: 'rgba(13, 32, 51, .8)',
                        border: 'rgba(13, 32, 51, .8)'
                      }}
                      type='primary'
                      htmlType='submit'
                    >
                      {i18n.t('Search')}<Icon type='search' />
                    </Button>
                  </FormItem>
                </Form>
              </TabPane>
              <TabPane tab={<span><Icon type='bars' />{i18n.t('Search by Options')}</span>} key='2'>
                <Row gutter={20}>
                  <Col xs={0} sm={0} md={6} lg={6}/>
                  <Col xs={24} sm={24} md={6} lg={6} style={{margin: '10px 0'}}>
                    <Select
                      suffixIcon={<Icon type='calendar' />}
                      placeholder='Select categories'
                      mode='multiple'
                      style={{ width: '100%' }}
                      onSelect={(e) => { console.log(e) }}
                    >
                      {categoryOptions}
                    </Select>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6} style={{margin: '10px 0'}}>
                    <Select
                      placeholder='Select time'
                      style={{ width: '100%' }}
                      onSelect={(e) => { console.log(e) }}
                    >
                      {selectTimeOptions}
                    </Select>
                  </Col>
                  <Col xs={0} sm={0} md={6} lg={6}/>
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
