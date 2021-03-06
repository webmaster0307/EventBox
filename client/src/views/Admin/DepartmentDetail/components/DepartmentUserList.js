import React from 'react'
// import Reviewers from './Reviewers'
// import Operators from './Operators'
import { Row, Col, Button } from 'antd'
import { withModal } from '@components'
import { useTranslation } from 'react-i18next'
import FormAddUser from './FormAddUser'
import Member from './Members'

const DepartmentUsers = (props) => {
  const { departmentId } = props.match.params
  const Reviewers = new Member(departmentId, 'reviewer').render()
  const ChiefOperators = new Member(departmentId, 'chief').render()

  return (
    <Row>
      <AddMember departmentId={departmentId} />
      <Row>
        <Col span={11}>
          <Reviewers />
        </Col>
        <Col offset={2} span={11}>
          <ChiefOperators />
        </Col>
      </Row>
    </Row>
  )
}

export default DepartmentUsers

const AddMember = withModal(({ modal, departmentId }) => {
  const [t] = useTranslation()

  return (
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
  )
})

// @withModal
// @withRouter
// class UserList extends Component {
//   state = {
//     loading: true,
//     users: []
//   }

//   componentDidMount = async () => {
//     let result
//     const { departmentId } = this.props.match.params

//     try {
//       result = await client.query({
//         query: departmentUser.GET_USERS_BY_DEPARTMENT,
//         variables: { departmentId }
//       })
//     } catch (error) {
//       return message.error('Failed to get users from department')
//     }
//     this.setState({
//       users: result.data.usersOfDepartment,
//       loading: false
//     })
//     // console.log('result: ',result.data)
//   }

//   handleAddMember = () => {
//     const { modal } = this.props
//     modal.show({
//       title: 'Thêm mới thành',
//       body: <FormAddUser onAddSuccess={this.handleAddSuccess} />
//     })
//   }

//   handleAddSuccess = (user) => {
//     this.setState({ users: [...this.state.users, user] })
//     const { modal } = this.props
//     modal.close()
//   }

//   handleRemoveUser = async (userId) => {
//     const { departmentId } = this.props.match.params
//     try {
//       await client.mutate({
//         mutation: departmentUser.REMOVE_FROM_DEPARTMENT,
//         variables: { departmentId, userId }
//       })
//     } catch (error) {
//       // console.log('error: ',error)
//       return message.error('Failed to delete user from department')
//     }
//     this.setState({
//       users: this.state.users.filter((user) => user.id !== userId)
//     })
//     message.success('Remove user from department successfully!')
//   }

//   render() {
//     const { users, loading } = this.state

//     return (
//       <div>
//         <Button type='primary' onClick={this.handleAddMember}>
//           Thêm thành viên
//         </Button>
//         <Divider />
//         <List
//           itemLayout='horizontal'
//           dataSource={users}
//           className='department-user-list__wrapper'
//           renderItem={(item) => (
//             <List.Item key={item.id}>
//               <Skeleton loading={loading} active avatar>
//                 <List.Item.Meta
//                   avatar={<Avatar size={36} />}
//                   title={
//                     <span>
//                       {item.username} | {item.email}
//                     </span>
//                   }
//                   description={`UserID: ${item.id}`}
//                 />
//                 <div>
//                   <Popconfirm
//                     placement='topRight'
//                     title='Are you sure to remove user from department?'
//                     onConfirm={() => this.handleRemoveUser(item.id)}
//                     okText='Yes'
//                     cancelText='No'
//                   >
//                     <Button type='danger'>Xóa</Button>
//                   </Popconfirm>
//                 </div>
//               </Skeleton>
//             </List.Item>
//           )}
//         />
//       </div>
//     )
//   }
// }

// @withModal
// @withRouter
// class HeadDepartmentList extends Component {
//   state = {
//     loading: true,
//     users: []
//   }

//   componentDidMount = async () => {
//     // let result
//     // const { departmentId } = this.props.match.params
//     // try {
//     //   result = await client.query({
//     //     query: department.GET_USERS_BY_DEPARTMENT,
//     //     variables: { departmentId }
//     //   })
//     // } catch (error) {
//     //   return message.error('Failed to get users from department')
//     // }
//     // this.setState({
//     //   users: result.data.userOfDepartments,
//     //   loading: false
//     // })
//     // console.log('result: ',result.data)
//   }

//   handleAddMember = () => {
//     // const { modal } = this.props
//     // modal.show({
//     //   title: 'Thêm mới thành',
//     //   body: <FormAddUser onAddSuccess={this.handleAddSuccess} />
//     // })
//   }

//   handleAddSuccess = () => {}

//   render() {
//     // const { users, loading } = this.state
//     const users = [
//       { id: '5c28526aa071de0a0886a897', username: 'user', email: 'user@ya.co', __typename: 'User' },
//       {
//         id: '5c395603bdc12c00255b3615',
//         username: 'nammai3',
//         email: 'nam1997@gmail.com',
//         __typename: 'User'
//       }
//     ]
//     const loading = true

//     return (
//       <div>
//         <Button type='primary' onClick={this.handleAddMember}>
//           Thêm trưởng khoa
//         </Button>
//         <Divider />
//         <List
//           itemLayout='horizontal'
//           dataSource={users}
//           renderItem={(item) => (
//             <List.Item key={item.id}>
//               <Skeleton loading={loading} active avatar>
//                 <List.Item.Meta
//                   avatar={<Avatar size={36} />}
//                   title={
//                     <span>
//                       {item.username} | {item.email}
//                     </span>
//                   }
//                   description={`UserID: ${item.id}`}
//                 />
//               </Skeleton>
//             </List.Item>
//           )}
//         />
//       </div>
//     )
//   }
// }
