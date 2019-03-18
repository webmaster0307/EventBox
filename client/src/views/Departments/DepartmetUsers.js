import React from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { departmentUser } from '@gqlQueries'
import { Spin, List, Skeleton, Avatar, Button, Divider, Tag, Popconfirm, message } from 'antd'
import { withTranslation, useTranslation } from 'react-i18next'
import { withModal } from '@components'
import FormAddUser from './FormAddUser'

const DepartmentUsers = ({ t, selfRole, departmentId }) => {
  const { data, loading } = useQuery(departmentUser.GET_DEPARTMENT_USERS, {
    variables: { departmentId }
  })

  if (loading) {
    return <Spin />
  }
  const { departmentUsers } = data
  if (!departmentUsers) {
    return null
  }

  return (
    <div>
      {selfRole === 'chief' && <ButtonAdd departmentId={departmentId} />}
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
                description={
                  <Tag color={item.departmentRole === 'chief' ? 'red' : 'blue'}>
                    {item.departmentRole}
                  </Tag>
                }
              />
              {selfRole === 'chief' && (
                <div>
                  <ButtonDelete departmentId={departmentId} userId={item.user.id} />
                </div>
              )}
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  )
}

export default withTranslation()(DepartmentUsers)

const ButtonAdd = withModal(({ modal, departmentId }) => {
  const [t] = useTranslation()
  return (
    <div>
      <Button
        type='primary'
        onClick={() => {
          modal.show({
            title: t('Add member'),
            body: <FormAddUser departmentId={departmentId} onClose={modal.close} />
          })
        }}
      >
        {t('Add member')}
      </Button>
      <Divider />
    </div>
  )
})

const ButtonDelete = ({ departmentId, userId }) => {
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
          variables: { departmentId }
        })
        cache.writeQuery({
          query: departmentUser.GET_DEPARTMENT_USERS,
          variables: { departmentId },
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
      <Button type='danger'>Xóa</Button>
    </Popconfirm>
  )
}
