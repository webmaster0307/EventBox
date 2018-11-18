import React from 'react';
import { client } from './'
import { Router, Route, Switch, Link } from 'react-router-dom';
import gql from 'graphql-tag';

import history from './constants/history';
import * as routes from './constants/routes';
import withSession from './views/Authorizing/Session/withSession'

import { SignUpPage, SignInPage} from './views/Authorizing';
import { Page404 } from './views/ErrorPage';

import SiderDemo from './views/Layout';

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
            <SiderDemo session={session} /> 
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

// const AuthorizedContainer = () => (
//   <Switch>
//     <Route 
//       component={SiderDemo}
//     />
//   </Switch>
// )

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