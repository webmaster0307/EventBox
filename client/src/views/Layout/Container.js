import React from 'react'
import client from '../../apollo'
import { Route, Switch, Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon, Card } from 'antd'
import { routesComp, routesMenu } from './routes'
import Page404 from '../../Page/404'
import Header from './Header'
import * as routes from '@routes'
import './styles.scss'
import { session } from '@gqlQueries'
import { withTranslation } from 'react-i18next'

const { Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu

class Container extends React.Component {
  state = {
    collapsed: false
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed })
  }

  handleGotoHome = () => {
    if (this.props.history.pathname !== routes.DASHBOARD) {
      this.props.history.push(routes.DASHBOARD)
    }
  }

  getSession = () => {
    client.query({ query: session.GET_LOCAL_SESSION }).then((result) => {
      const { me } = result.data
      console.log('me: ', me)
    })
  }

  render() {
    const {
      session: { me },
      t
    } = this.props
    // console.log('t: ', t)

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          breakpoint='lg'
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className='layout-logo__wrapper' onClick={this.handleGotoHome} />
          <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
            {routesMenu
              .filter((route) => {
                if (route.title === 'Departments') {
                  return me.departments.length > 0
                }
                for (let role of me.role) {
                  if (route.roles.includes(role)) {
                    return true
                  }
                }
                return false
              })
              .map((item) => {
                if (item.subComponent) {
                  if (item.title === 'Departments') {
                    return (
                      <SubMenu
                        key={item.title}
                        title={
                          <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                          </span>
                        }
                      >
                        {me.departments.map((it) => (
                          <Menu.Item key={`department-${it.id}`}>
                            <Link to={`${routes.DASHBOARD}/mydepartment/${it.id}`}>
                              {/* <Icon type={it.icon} /> */}
                              <span>{it.name}</span>
                            </Link>
                          </Menu.Item>
                        ))}
                      </SubMenu>
                    )
                  } else {
                    return (
                      <SubMenu
                        key={item.title}
                        title={
                          <span>
                            <Icon type={item.icon} />
                            <span>{t(item.title)}</span>
                          </span>
                        }
                      >
                        {item.subComponent.map((it) => (
                          <Menu.Item key={it.path}>
                            <Link to={it.path}>
                              <Icon type={it.icon} />
                              <span>{t(it.title)}</span>
                            </Link>
                          </Menu.Item>
                        ))}
                      </SubMenu>
                    )
                  }
                } else {
                  return (
                    <Menu.Item key={item.title}>
                      <Link to={item.path}>
                        <Icon type={item.icon} />
                        <span>{t(item.title)}</span>
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
            <Card style={{ background: '#fff', minHeight: 360 }}>
              <Switch>
                {routesComp
                  .filter((route) => {
                    for (let role of me.role) {
                      if (route.roles.includes(role)) {
                        return route.component && true
                      }
                    }
                    return false
                  })
                  .map((route) => (
                    <Route key={route.path} {...route} />
                  ))}
                <Route component={Page404} />
              </Switch>
            </Card>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default withTranslation()(Container)
