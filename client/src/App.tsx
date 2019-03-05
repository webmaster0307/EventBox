import React, { useEffect } from 'react'
import { client } from './'
import { Router, Route, Switch } from 'react-router-dom'
import gql from 'graphql-tag'
import queryString from 'query-string'

import history from './constants/history'
import * as routes from '@routes'
import withSession, { withSessionProps } from './views/Authorizing/Session/withSession'

import { SignUpPage, SignInPage } from './views/Authorizing'
import { Page404 } from './views/ErrorPage'

import Landing from './views/Landing'
import LandingEventDetail from './views/Landing/EventDetail'
import DashboardContainer from './views/Layout/Container'

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
  const { refetch, session } = props

  useEffect(() => {
    // TODO: handle VL auth
    // const { code } = queryString.parse(window.location.search)
    // if (code) {
    //   console.log('a: ', code)
    //   var formData = new FormData()
    //   formData.append('code', code.toString())
    //   fetch('https://cntttest.vanlanguni.edu.vn:18081/Cap21T4/LoginManagement/Account/GetInfo', {
    //     method: 'POST',
    //     body: formData
    //   })
    //     .then((res) => res.json())
    //     .then((res) => {
    //       console.log('res: ', res)
    //     })
    //     .catch((err) => {
    //       console.log('err: ', err)
    //     })
    // }
    client.mutate({ mutation: setSession, variables: { session } })
    // console.log('session: ', session)
  })

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
          render={() =>
            session && session.me ? (
              <DashboardContainer session={session} />
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
