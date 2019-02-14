import React from 'react'
import withAdmin from '../../Authorizing/Session/withAdmin'

const AdminPage = () => (
  <div>
    <h1>Admin Page</h1>
  </div>
)

export default withAdmin(AdminPage)
