import Home from '../Account/Home'
import { Events, EventCreate, EventDetail, EventUpdate } from '../Event'
import AccountPage from '../Account'
import { AdminPage, Department, DepartmentDetail } from '../Admin'
import { EventsReview, EventDetailReview } from '../EventReview'
import * as routes from '@routes'

export const routesComp = [
  {
    exact: true,
    path: routes.DASHBOARD,
    component: Home,
    roles: ['admin', 'user']
  },
  {
    exact: true,
    path: routes.DB_ADMIN,
    component: AdminPage,
    roles: ['admin']
  },
  {
    exact: true,
    path: routes.DB_ADMIN_DEPARTMENT,
    component: Department,
    roles: ['admin']
  },
  {
    exact: true,
    path: routes.DB_ADMIN_DEPARTMENT_UPDATE,
    component: DepartmentDetail,
    roles: ['admin']
  },
  {
    exact: true,
    path: routes.DASHBOARD_MYACCOUNT,
    component: AccountPage,
    roles: ['admin', 'user']
  },
  {
    exact: true,
    path: routes.DASHBOARD_EVENT,
    component: Events,
    roles: ['admin', 'user']
  },
  {
    exact: true,
    path: routes.DASHBOARD_EVENT_CREATE,
    component: EventCreate,
    roles: ['admin', 'user']
  },
  {
    exact: true,
    path: routes.DASHBOARD_EVENT_DETAIL,
    component: EventDetail,
    roles: ['admin', 'user']
  },
  {
    exact: true,
    path: routes.DASHBOARD_EVENT_UPDATE,
    component: EventUpdate,
    roles: ['admin', 'user']
  },
  {
    exact: true,
    path: routes.DB_EVENT_REVIEW,
    component: EventsReview,
    roles: ['admin', 'user']
  },
  {
    exact: true,
    path: routes.DB_EVENT_DETAIL_REVIEW,
    component: EventDetailReview,
    roles: ['admin', 'user']
  }
]

export const routesMenu = [
  // {
  //   title: 'Admin',
  //   path: `${basename}/admin`,
  //   roles: ['admin'],
  //   icon: 'star',
  //   breadcumbs: ['Administration']
  // },
  {
    title: 'Admin',
    roles: ['admin'],
    icon: 'star',
    subComponent: [
      {
        title: 'Accounts',
        path: routes.DB_ADMIN,
        icon: 'team',
        breadcumbs: ['Admin', 'Accounts']
      },
      {
        title: 'Departments',
        path: routes.DB_ADMIN_DEPARTMENT,
        icon: 'home',
        breadcumbs: ['Admin', 'Departments']
      }
    ]
  },
  {
    title: 'My account',
    roles: ['admin', 'user'],
    icon: 'user',
    subComponent: [
      {
        title: 'Information',
        path: routes.DASHBOARD_MYACCOUNT,
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
        path: routes.DASHBOARD_EVENT,
        icon: 'bars',
        breadcumbs: ['Events', 'Event list']
      },
      {
        title: 'Create',
        path: routes.DASHBOARD_EVENT_CREATE,
        icon: 'form',
        breadcumbs: ['Events', 'Event create']
      }
    ]
  },
  {
    title: 'Xét duyệt',
    roles: ['admin', 'reviewer'],
    icon: 'file-protect',
    subComponent: [
      {
        title: 'Sự kiện',
        path: routes.DB_EVENT_REVIEW,
        icon: 'bars',
        breadcumbs: ['Events', 'Event list']
      }
    ]
  }
]
