import React, { Component } from 'react'
// import UpdateForm from './update'
import { Tabs, Radio } from 'antd'
import Profile from './tabs/Profile'
import ChangePassword from './tabs/ChangePassword'
import BasicSettings from './tabs/BasicSettings'

const TabPane = Tabs.TabPane
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class AccountPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'left'
    }
  }

  handleModeChange = (e) => {
    const mode = e.target.value
    this.setState({ mode })
  }

  render() {
    const { mode } = this.state
    return (
      <div>
        {/* <UpdateForm /> */}
        <RadioGroup onChange={this.handleModeChange} value={mode} style={{ marginBottom: 8 }}>
          <RadioButton value='top'>Horizontal</RadioButton>
          <RadioButton value='left'>Vertical</RadioButton>
        </RadioGroup>

        <Tabs defaultActiveKey='1' tabPosition={mode}>
          <TabPane tab={'Profile'} key='1'>
            <Profile />
          </TabPane>
          <TabPane tab={'Change Password'} key='2'>
            <ChangePassword />
          </TabPane>
          <TabPane tab={'Basic Settings'} key='3'>
            <BasicSettings />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default AccountPage
