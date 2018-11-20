import React from 'react'
import { client } from '../../'
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { getSession } from '../Authorizing/Session/localQueries'
import { routesComp, routesMenu } from './routes'
import { Page404 } from '../ErrorPage';
import Header from './Header'
import './styles.scss'

const { Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SiderDemo extends React.Component {
  
  state = {
    collapsed: false,
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  handleGotoHome = () => {
    if(this.props.history.pathname !== '/'){
      this.props.history.push('/')
    }
  }

  getSession = () => {
    client.query({query: getSession}).then( result => {
      const { me } = result.data
      console.log('me: ',me);
    })
  }

  render() {
    const { me } = this.props.session

    return(
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="layout-logo__wrapper" onClick={this.handleGotoHome} />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {routesMenu.filter(route => route.roles.includes(me.role)).map(item => {
              if(item.subComponent){
                return(
                  <SubMenu
                    key={item.title}
                    title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}
                  >
                    {item.subComponent.map(it => (
                      <Menu.Item key={it.title} >
                        <Link to={it.path} >
                          <Icon type={it.icon} />
                          <span>{it.title}</span>
                        </Link>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                )
              }
              else{
                return(
                  <Menu.Item key={item.title} >
                    <Link to={item.path} >
                      <Icon type={item.icon} />
                      <span>{item.title}</span>
                    </Link>
                  </Menu.Item>
                )
              }
            })}
          </Menu>
        </Sider>
        <Layout>
          <Header user={me} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>EventBox</Breadcrumb.Item>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Switch>
                {routesComp.filter(route => route.component && route.roles.includes(me.role)).map(route => (
                  <Route key={route.path} {...route} />
                ))}
                <Route component={Page404} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(SiderDemo)