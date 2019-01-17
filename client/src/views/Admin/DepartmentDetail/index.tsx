import React, { Component } from 'react'
import { Query, QueryProps } from 'react-apollo';
import { Tabs, Spin } from 'antd';
import { department } from '@gqlQueries'
import { RouteComponentProps, match } from 'react-router'
import UserList from './components/DepartmentUserList'
import './styles.scss'

const { TabPane } = Tabs

interface Props extends RouteComponentProps {
  match: match<{ departmentId: string }>;
}

class DepartmentDetail extends Component<Props>{

  render() {
    const { departmentId } = this.props.match.params

    return (
      <Query
        query={department.GET_DEPARTMENT_BYID}
        variables={{ id: departmentId }}
      >
        {({ data, loading }) => {
          const { department } = data
          if(loading){
            return <Spin />
          }

          return(
            <Tabs defaultActiveKey='1'>
              <TabPane tab='Thông tin' key='1' >
                <DepartmentInfo  department={department} />
              </TabPane>
              <TabPane tab='Thành viên' key='2'> 
                <UserList />
              </TabPane>
            </Tabs>
          )
        }}
      </Query>
    )
  }
}

export default DepartmentDetail

const DepartmentInfo = ({ department: { name, description } } : any) => (
  <div>
    <h2>{name}</h2>
    <div>{description}</div>
  </div>
)