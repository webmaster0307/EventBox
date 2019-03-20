// GraphQL
export const HOME = '/'
export const SIGN_UP = '/signup'
export const SIGN_IN = '/signin'
export const EVENT = '/event'
//
export const DASHBOARD = '/dashboard'
//
export const DASHBOARD_MYACCOUNT = `${DASHBOARD}/myaccount`
export const DASHBOARD_MYTICKETS = `${DASHBOARD}/mytickets`
export const DASHBOARD_MYDEPARTMENT = `${DASHBOARD}/mydepartment/:departmentId`
//
export const DASHBOARD_EVENT = `${DASHBOARD}/events`
export const DASHBOARD_EVENT_CREATE = `${DASHBOARD_EVENT}/create`
export const DASHBOARD_EVENT_REVIEW = `${DASHBOARD_EVENT}/review`
export const DASHBOARD_EVENT_DETAIL = `${DASHBOARD_EVENT}/detail/:eventId`
export const DASHBOARD_EVENT_UPDATE = `${DASHBOARD_EVENT}/update/:eventId`
export const DASHBOARD_EVENT_CHECKIN = `${DASHBOARD_EVENT}/checkin/:eventId`
//
export const DB_ADMIN = `${DASHBOARD}/admin`
export const DB_ADMIN_DEPARTMENT = `${DB_ADMIN}/departments`
export const DB_ADMIN_DEPARTMENT_UPDATE = `${DB_ADMIN_DEPARTMENT}/:departmentId`
//
export const DB_EVENT_REVIEW = `${DASHBOARD}/review`
export const DB_EVENT_DETAIL_REVIEW = `${DASHBOARD}/review/:eventId`

export const UNAUTHORIZED = '/unauthorized'

// REST
export const API_STATUS = '/api/status'
