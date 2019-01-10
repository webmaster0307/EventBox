// GraphQL
export const HOME = '/'
export const SIGN_UP = '/signup'
export const SIGN_IN = '/signin'
export const EVENT = '/event'
// 
export const DASHBOARD = '/dashboard'
// 
export const DASHBOARD_MYACCOUNT    = `${DASHBOARD}/myaccount`
// 
export const DASHBOARD_EVENT        = `${DASHBOARD}/events`
export const DASHBOARD_EVENT_CREATE = `${DASHBOARD_EVENT}/create`
export const DASHBOARD_EVENT_DETAIL = `${DASHBOARD_EVENT}/detail/:eventId`
export const DASHBOARD_EVENT_UPDATE = `${DASHBOARD_EVENT}/update/:eventId`
// 
export const DB_ADMIN                      = `${DASHBOARD}/admin`
export const DB_ADMIN_DEPARTMENT           = `${DB_ADMIN}/departments`
export const DB_ADMIN_DEPARTMENT_UPDATE    = `${DB_ADMIN_DEPARTMENT}/:departmentId`

export const UNAUTHORIZED           = '/unauthorized'

// REST
export const API_STATUS = '/api/status'