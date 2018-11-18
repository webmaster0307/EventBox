import Home from '../Home'
import LandingPage from '../Landing';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import { EventCreate } from '../Event';


export const routesComp = [
  {
    exact: true,
    path: '/',
    component: Home,
    roles: ['admin', 'user']
  },
  {
    exact: true,
    path: '/admin',
    component: AdminPage,
    roles: ['admin']
  },
  {
    exact: true,
    path: '/account',
    component: AccountPage,
    roles: ['admin', 'user']
  },
  {
    exact: true,
    path: '/events',
    component: LandingPage,
    roles: ['admin', 'user']
  },
  {
    exact: true,
    path: '/events/create',
    component: EventCreate,
    roles: ['admin', 'user']
  }
]

export const routesMenu = [
  {
    title: 'Admin',
    path: '/admin',
    roles: ['admin'],
    icon: 'star',
    breadcumbs: ['Administration']
  },
  {
    title: 'My account',
    roles: ['admin', 'user'],
    icon: 'user',
    subComponent: [
      {
        title: 'Information',
        path: '/account',
        icon: 'idcard',
        breadcumbs: ['Account', 'Account information']
      }
    ]
  },
  {
    title: 'Events',
    roles: ['admin', 'user'],
    icon: 'file',
    subComponent: [
      {
        title: 'List',
        path: '/events',
        icon: 'bars',
        breadcumbs: ['Events', 'Event list']
      },
      {
        title: 'Create',
        path: '/events/create',
        icon: 'edit',
        breadcumbs: [ 'Events', 'Event create']
      }
    ]
  },
]