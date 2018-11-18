import React from 'react';
import { client } from '../../'
import { Router, Route, Switch, Link } from 'react-router-dom';

import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import withSession from '../Session/withSession';

import * as routes from '../../constants/routes';
import history from '../../constants/history';
import { Page404 } from '../Error';
import SiderDemo from '../Layout';
import gql from 'graphql-tag';

const setSession = gql`
  mutation($session: Session) {
    setSession(session: $session) @client
  }
`

const App = ({ session, refetch }) => {
  client.mutate({ mutation: setSession, variables: { session }})

  return(
    <Router history={history}>
      <div>
        {session && session.me ?
          <div>
            <AuthorizedContainer session={session} refetch={refetch} /> 
          </div>
          :
          <div>
            <NavigationNonAuth />
            <UnauthorizedContainer history={history} session={session} refetch={refetch} />
          </div>
        }
      </div>
    </Router>
  )
}

export default withSession(App);

const AuthorizedContainer = ({session, refetch}) => (
  <Switch>
    <Route 
      component={SiderDemo}
    />
  </Switch>
)

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={routes.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={routes.SIGN_UP}>Sign Up</Link>
    </li>
  </ul>
);

const UnauthorizedContainer = ({history, session, refetch}) => (
  <Switch>
    <Route
      exact
      path={routes.SIGN_UP}
      component={() => <SignUpPage refetch={refetch} />}
    />
    <Route
      exact
      path={routes.SIGN_IN}
      component={() => <SignInPage refetch={refetch} session={session} />}
    />
    <Route
      exact
      path='/'
      component={() => <SignInPage refetch={refetch} history={history} />}
    />
    <Route
      component={Page404}
    />
  </Switch>
)