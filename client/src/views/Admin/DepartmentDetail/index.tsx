import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { Tabs, Spin } from 'antd'
import { department as departmentQueries } from '@gqlQueries'
import { RouteComponentProps, match } from 'react-router'
import UserList from './components/DepartmentUserList'
import './styles.scss'

const { TabPane } = Tabs

interface Props extends RouteComponentProps {
  match: match<{ departmentId: string }>
}

const DepartmentDetail = (props: Props) => {
  const { departmentId } = props.match.params

  const { data, loading } = useQuery(departmentQueries.GET_DEPARTMENT_BYID, {
    variables: { id: departmentId }
  })
  if (loading) {
    return <Spin />
  }
  const { department } = data as any
  return (
    <Tabs defaultActiveKey='1'>
      <TabPane tab='Thông tin' key='1'>
        <DepartmentInfo department={department} />
      </TabPane>
      <TabPane tab='Thành viên' key='2'>
        <UserList {...props} />
      </TabPane>
    </Tabs>
  )
}

export default DepartmentDetail

const DepartmentInfo = ({ department: { name, description } }: any) => (
  <div>
    <h2>{name}</h2>
    <div>{description}</div>
  </div>
)
