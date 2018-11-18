import React from 'react';
import UpdateForm from './update'

import withAuthorization from '../Session/withAuthorization';


const AccountPage = () => (
  <div>
    <h1>Account Page</h1>
    <UpdateForm />
  </div>
);

export default withAuthorization(session => session && session.me)(
  AccountPage,
);
