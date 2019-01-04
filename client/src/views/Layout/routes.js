import Home from '../Account/Home'
import { Events, EventDetail } from '../Event'
import EventCreate from '../Event/EventCreate/EventCreate'
import EventUpdate from '../Event/EventUpdate/EventUpdate'
import AccountPage from '../Account'
import AdminPage from '../Admin'
import * as routes from '@routes'

import { CreateDraftEvent } from '../DraftEvent'

export const basename = routes.DASHBOARD

export const routesComp = [
  {
    exact: true,
    path: `${basename}`,
    component: Home,
    roles: ['admin', 'user']
  },
  {
    exact: true,
    path: `${basename}/admin`,
    component: AdminPage,
    roles: ['admin']
  },
  {
    exact: true,
    path: `${basename}/account`,
    component: AccountPage,
    roles: ['admin', 'user']
  },
  {
    exact: true,
    path: `${basename}/events`,
    component: Events,
    roles: ['admin', 'user']
  },
  {
    exact: true,
    path: `${basename}/events/create`,
    component: EventCreate,
    roles: ['admin', 'user']
  },
  {
    exact: true,
    path: `${basename}/events/detail/:eventId`,
    component: EventDetail,
    roles: ['admin', 'user']
  },
  {
    exact: true,
    path: `${basename}/events/update/:eventId`,
    component: EventUpdate,
    roles: ['admin', 'user']
  },
  {
    exact: true,
    path: `${basename}/draft-events`,
    component: Events,
    roles: ['admin', 'user']
  },
  {
    exact: true,
    path: `${basename}/draft-events/create`,
    component: CreateDraftEvent,
    roles: ['admin', 'user']
  }
]

export const routesMenu = [
  {
    title: 'Admin',
    path: `${basename}/admin`,
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
        path: `${basename}/account`,
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
        path: `${basename}/events`,
        icon: 'bars',
        breadcumbs: ['Events', 'Event list']
      },
      {
        title: 'Create',
        path: `${basename}/events/create`,
        icon: 'form',
        breadcumbs: [ 'Events', 'Event create' ]
      }
    ]
  }
  // {
  //   title: 'Draft Events',
  //   roles: ['admin', 'user'],
  //   icon: 'file',
  //   subComponent: [
  //     {
  //       title: 'List',
  //       path: `${basename}/draft-events`,
  //       icon: 'bars',
  //       breadcumbs: ['Draft Events', 'Draft event list']
  //     },
  //     {
  //       title: 'Create',
  //       path: `${basename}/draft-events/create`,
  //       icon: 'form',
  //       breadcumbs: [ 'Draft Events', 'Create draft event' ]
  //     }
  //   ]
  // }
]