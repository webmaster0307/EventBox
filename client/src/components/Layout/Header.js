import React, { Component } from 'react'
import { Layout, Avatar, Menu, Dropdown } from 'antd';
import { client } from '../../'
import { signOut } from '../SignOut';

const { Header } = Layout;

const LayoutHeader = props => (
  <Header 
    style={{ background: '#fff', padding: '0 16px', textAlign: 'right' }} 
  >
    <UserAvatar {...props} />
  </Header>
)

export default LayoutHeader

class UserAvatar extends Component{

  render() {
    const { user } = this.props 
    
    return (
      <div className='layout-header-useravatar__wrapper' >
        <span style={{marginRight: 12}} >{user.username}</span>
        <Dropdown overlay={actions} placement="bottomCenter" trigger={['click']} >
          <Avatar size='large' style={{cursor: 'pointer'}} />
        </Dropdown>
      </div>
    );
  }
}

const actions = (
  <Menu>
    <Menu.Item>
      <span>1st menu item</span>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item onClick={() => signOut(client)} >
      <span>Logout</span>
    </Menu.Item>
  </Menu>
);