import Home from '../Account/Home'
import { Events, EventCreate, EventDetail, EventUpdate } from '../Event';
import AccountPage from '../Account';
import AdminPage from '../Admin';

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
    component: Events,
    roles: ['admin', 'user']
  },
  {
    exact: true,
    path: '/events/create',
    component: EventCreate,
    roles: ['admin', 'user']
  },
  {
    exact: true,
    path: '/events/detail/:eventId',
    component: EventDetail,
    roles: ['admin', 'user']
  },
  {
    exact: true,
    path: '/events/update/:eventId',
    component: EventUpdate,
    roles: ['admin', 'user']
  },
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