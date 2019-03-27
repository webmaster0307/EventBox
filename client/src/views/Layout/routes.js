import Home from '../Account/legacy/Home'
import { AdminPage, Department, DepartmentDetail } from '../Admin'
import { AccountProfile, AccountTickets } from '../Account/'
import MyDepartment from '../Departments'
import { Events, EventCreate, EventDetail, EventUpdate, EventCheckin } from '../Event'
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
    component: AccountProfile,
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
  },
  {
    exact: true,
    path: routes.DASHBOARD_EVENT_CHECKIN,
    component: EventCheckin,
    roles: ['admin', 'user']
  },
  {
    exact: true,
    path: routes.DASHBOARD_MYTICKETS,
    component: AccountTickets,
    roles: ['admin', 'user']
  },
  {
    exact: true,
    path: routes.DASHBOARD_MYDEPARTMENT,
    component: MyDepartment,
    roles: ['admin', 'user']
  }
]

export const routesMenu = [
  {
    title: 'Announcement',
    path: routes.DASHBOARD,
    roles: ['user', 'admin'],
    icon: 'layout',
    breadcumbs: ['Announcement']
  },
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
        title: 'Profile',
        path: routes.DASHBOARD_MYACCOUNT,
        icon: 'profile',
        breadcumbs: ['Account', 'Account information']
      },
      {
        title: 'Tickets',
        path: routes.DASHBOARD_MYTICKETS,
        icon: 'file-search',
        breadcumbs: ['Account', 'Account information']
      }
    ]
  },
  {
    title: 'Departments',
    roles: ['admin', 'user'],
    icon: 'home',
    subComponent: []
  },
  {
    title: 'Events',
    roles: ['admin', 'user'],
    icon: 'project',
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
