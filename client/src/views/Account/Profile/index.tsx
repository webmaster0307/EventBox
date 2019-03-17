import React, { Component, useEffect, useState } from 'react'
// import UpdateForm from './update'
import { Tabs, Radio } from 'antd'
import Profile from './tabs/Profile'
import ChangePassword from './tabs/ChangePassword'
import BasicSettings from './tabs/BasicSettings'

const TabPane = Tabs.TabPane
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

const AccountPage = () => {
  const [mode, setMode] = useState<'left'>('left')

  return (
    <div>
      {/* <UpdateForm /> */}
      <RadioGroup
        onChange={({ target }) => {
          setMode(target.value)
        }}
        value={mode}
        style={{ marginBottom: 8 }}
      >
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

export default AccountPage
