import React from 'react'
import { client } from './'
import { Router, Route, Switch } from 'react-router-dom'
import gql from 'graphql-tag'

import history from './constants/history'
import * as routes from '@routes'
import withSession from './views/Authorizing/Session/withSession'

import { SignUpPage, SignInPage } from './views/Authorizing'
import { Page404 } from './views/ErrorPage'

import Landing from './views/Landing'

import Container from './views/Layout/Container'

const setSession = gql`
  mutation($session: Session) {
    setSession(session: $session) @client
  }
`

@withSession
class App extends React.Component {

  componentDidMount = () => {
    const { session } = this.props
    client.mutate({ mutation: setSession, variables: { session } })
  }
  
  render(){
    const { session, refetch } = this.props

    return(
      <Router history={history}>
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
            path={routes.HOME}
            render={() => <Landing refetch={refetch} session={session} />}
          />
          <Route
            exact
            path={`${routes.DASHBOARD}*`}
            render={() => session && session.me ? 
              <Container session={session} />
              :
              <SignInPage refetch={refetch} session={session} /> 
            }
          />
          <Route
            component={Page404}
          />
        </Switch>
      </Router>
    )
  }
}

export default App

// const AuthorizedContainer = () => (
//   <Switch>
//     <Route
//       component={SiderDemo}
//     />
//   </Switch>
// )

// const NavigationNonAuth = () => (
//   <ul>
//     <li>
//       <Link to={routes.SIGN_IN}>Sign In</Link>
//     </li>
//     <li>
//       <Link to={routes.SIGN_UP}>Sign Up</Link>
//     </li>
//   </ul>
// )

// const UnauthorizedContainer = ({history, session, refetch}) => (
//   <Switch>
//     <Route
//       exact
//       path={routes.SIGN_UP}
//       component={() => <SignUpPage refetch={refetch} />}
//     />
//     <Route
//       exact
//       path={routes.SIGN_IN}
//       component={() => <SignInPage refetch={refetch} session={session} />}
//     />
//     <Route
//       exact
//       path={routes.HOME}
//       component={() => <SignInPage refetch={refetch} history={history} />}
//     />
//     <Route
//       exact
//       path={routes.LANDING}
//       render={() => <Landing />}
//     />
//     <Route
//       component={Page404}
//     />
//   </Switch>
// )
