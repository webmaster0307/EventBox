import React, { useEffect, useState } from 'react'
import { client } from '@client'
import { Router, Route, Switch } from 'react-router-dom'
import gql from 'graphql-tag'
import queryString from 'query-string'

import history from './constants/history'
import * as routes from '@routes'
import withSession, { withSessionProps } from './views/Authorizing/Session/withSession'

import { SignUpPage, SignInPage } from './views/Authorizing'
// import { Page404 } from './views/ErrorPage'
import Page404 from './Page/404'

import Landing from './views/Landing'
import LandingEventDetail from './views/Landing/EventDetail'
import DashboardContainer from './views/Layout/Container'
import { Skeleton, message } from 'antd'
const Cookies = require('js-cookie')

const setSession = gql`
  mutation($session: Session) {
    setSession(session: $session) @client
  }
`

// @withSession
// class App extends React.Component<withSessionProps> {

//   componentDidMount = () => {
//     const { session } = this.props
//     client.mutate({ mutation: setSession, variables: { session } })
//   }

//   render(){
//     const { session, refetch } = this.props
//     // const { pathname } = window.location
//     // console.log('pathname: ' ,pathname.startsWith('/dashboard'))

//     return(
//       <Router history={history}>
//         <Switch>
//           <Route
//             exact
//             path={routes.SIGN_UP}
//             component={() => <SignUpPage refetch={refetch} />}
//           />
//           <Route
//             exact
//             path={routes.SIGN_IN}
//             component={() => <SignInPage refetch={refetch} session={session} />}
//           />
//           <Route
//             exact
//             path={routes.HOME}
//             render={() => <Landing refetch={refetch} session={session} />}
//           />
//           <Route
//             exact
//             path={`${routes.EVENT}/:eventId`}
//             render={() => <LandingEventDetail refetch={refetch} session={session} />}
//           />
//           <Route
//             exact
//             path={`${routes.DASHBOARD}*`}
//             render={() => session && session.me ?
//               <DashboardContainer session={session} />
//               :
//               <SignInPage refetch={refetch} session={session} />
//             }
//           />
//           <Route
//             component={Page404}
//           />
//         </Switch>
//       </Router>
//     )
//   }
// }

const App = (props: withSessionProps) => {
  // cookie from oauth
  const jwtCookie = Cookies.get('_session_')
  // console.log('jwtCookie: ', jwtCookie)
  //
  const { refetch, session } = props
  // loading oauth
  // const { code, state } = queryString.parse(window.location.search)
  const [oauthLoading, setLoading] = useState(!!jwtCookie)

  useEffect(() => {
    if (jwtCookie) {
      localStorage.setItem('token', jwtCookie)
      refetch().then((res) => {
        setLoading(false)
      })
    }
    client.mutate({ mutation: setSession, variables: { session } })
    // console.log('session: ', session)
  }, [])

  if (oauthLoading) {
    return (
      <div style={{ padding: 50 }}>
        <Skeleton active title={{ width: '100%' }} />
      </div>
    )
  }

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={routes.SIGN_UP} component={() => <SignUpPage refetch={refetch} />} />
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
          path={`${routes.EVENT}/:eventId`}
          render={() => <LandingEventDetail refetch={refetch} session={session} />}
        />
        <Route
          exact
          path={`${routes.DASHBOARD}*`}
          render={(props) =>
            session && session.me ? (
              <DashboardContainer session={session} {...props} />
            ) : (
              <SignInPage refetch={refetch} session={session} />
            )
          }
        />
        <Route component={Page404} />
      </Switch>
    </Router>
  )
}

export default withSession(App)

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
