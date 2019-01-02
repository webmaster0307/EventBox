import React from 'react'
import AccountList from './AccountList'

import withAuthorization from '../Authorizing/Session/withAuthorization'

const AdminPage = () => (
  <div>
    <h1>Admin Page</h1>
    <AccountList />
  </div>
)

export default withAuthorization(session => session && session.me && session.me.role.includes('admin'))(AdminPage)
