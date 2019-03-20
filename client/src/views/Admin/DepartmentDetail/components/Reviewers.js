import React from 'react'
import { List, Avatar, Divider, Skeleton, Tag, Button, Popconfirm, message } from 'antd'
import { departmentUser } from '@gqlQueries'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { useTranslation } from 'react-i18next'
import FakeLoading from '../../../Departments/ListLoading'

const role = 'reviewer'

const Reviewers = ({ departmentId }) => {
  const { data, loading } = useQuery(departmentUser.GET_DEPARTMENT_USERS, {
    variables: { departmentId, role }
  })

  if (loading) {
    return <FakeLoading />
  }
  //
  const { departmentUsers } = data
  // console.log('departmentUsers: ', departmentUsers)

  if (!departmentUsers) {
    return null
  }

  return (
    <div>
      <Divider />
      <List
        itemLayout='horizontal'
        dataSource={departmentUsers}
        className='department-user-list__wrapper'
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Skeleton loading={loading} active avatar>
              <List.Item.Meta
                avatar={<Avatar size={36} src={item.user.photo} />}
                title={
                  <span>
                    {item.user.username} | {item.user.email}
                  </span>
                }
                description={<Tag color='blue'>{item.departmentRole}</Tag>}
              />
              <RemoveConfirmation departmentId={departmentId} userId={item.user.id} />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  )
}

export default Reviewers

const RemoveConfirmation = ({ departmentId, userId }) => {
  const [t] = useTranslation()
  const removeUser = useMutation(departmentUser.REMOVE_FROM_DEPARTMENT, {
    variables: { departmentId, userId },
    update: (cache, { data: { removeMember } }) => {
      if (!removeMember) {
        return
      }
      try {
        const data = cache.readQuery({
          query: departmentUser.GET_DEPARTMENT_USERS,
          variables: { departmentId, role }
        })
        cache.writeQuery({
          query: departmentUser.GET_DEPARTMENT_USERS,
          variables: { departmentId, role },
          data: {
            ...data,
            departmentUsers: data.departmentUsers.filter((item) => item.user.id !== userId)
          }
        })
        message.success(t('Remove user from department successfully!'))
      } catch (error) {
        // console.log('error: ', error)
      }
    }
  })
  return (
    <Popconfirm
      placement='topRight'
      title='Are you sure to remove user from department?'
      onConfirm={removeUser}
      okText='Yes'
      cancelText='No'
    >
      <Button type='danger'>{t('Remove')}</Button>
    </Popconfirm>
  )
}
