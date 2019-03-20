import React from 'react'
import { RouteComponentProps, match } from 'react-router'
import MyDepartment from './MyDepartment'

interface RouteProps extends RouteComponentProps {
  match: match<{ departmentId: string }>
}

export default ({ match }: RouteProps) => {
  const { departmentId } = match.params
  return <MyDepartment departmentId={departmentId} />
}
