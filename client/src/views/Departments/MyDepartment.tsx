import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { user } from '@gqlQueries'
import { Spin, Tabs } from 'antd'
import DepartmentUsers from './DepartmetUsers'
const { TabPane } = Tabs

const MyDepartment = ({ departmentId }: { departmentId: string }) => {
  const { data, loading } = useQuery(user.GET_MY_DEPARTMENT, { variables: { departmentId } })

  if (loading) {
    return <Spin />
  }
  const { myDepartment } = data

  return (
    <Tabs defaultActiveKey='1'>
      <TabPane tab='Thông tin' key='1'>
        <DepartmentInfo department={myDepartment && myDepartment.department} />
      </TabPane>
      <TabPane tab='Thành viên' key='2'>
        <DepartmentUsers />
      </TabPane>
    </Tabs>
  )
}

export default MyDepartment

const DepartmentInfo = ({ department: { name, description } }: any) => (
  <div>
    <h2>{name}</h2>
    <div>{description}</div>
  </div>
)
