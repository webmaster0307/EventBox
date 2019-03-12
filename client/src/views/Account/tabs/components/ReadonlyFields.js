import React from 'react'
import { Form, Input, Tag } from 'antd'
import { Query } from 'react-apollo'
import { session } from '@gqlQueries'
import { withTranslation } from 'react-i18next'

// const roleColor = (role) => {
//   switch (role) {
//     case 'admin': {
//       return 'red'
//     }
//     case 'reviewer': {
//       return 'purple'
//     }
//     default: {
//       return 'blue'
//     }
//   }
// }

const fsFormLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
}

export default withTranslation('translations')(({ t: translate }) => (
  <div
    style={{
      borderRadius: 10,
      background: 'rgba(214, 229, 255, 0.4)',
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      // alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Query query={session.GET_LOCAL_SESSION}>
      {({ data }) => {
        const { username, email, role, departments } = data.me
        const formFields = [
          {
            label: translate('usn'),
            customRender: <Input value={username} readOnly />
          },
          {
            label: 'Email',
            customRender: <Input value={email} readOnly />
          },
          {
            label: translate('Role'),
            customRender: role.map((r) => (
              <Tag key={r} color={r === 'admin' ? 'red' : r === 'user' ? 'blue' : 'purple'}>
                {r}
              </Tag>
            ))
          },
          {
            label: translate('Department'),
            customRender: departments.map((dep) => (
              <Tag key={dep.id} color='orange'>
                {dep.name}
              </Tag>
            ))
          }
        ]

        return formFields.map((item) => {
          const { label, customRender } = item
          return (
            <Form.Item key={label} label={label} colon={false} {...fsFormLayout}>
              {customRender}
            </Form.Item>
          )
        })
      }}
    </Query>
  </div>
))
