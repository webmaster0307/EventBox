import scalarCustom from './scalarCustom'
import categoryResolvers from './category'
import contactResolvers from './contact'
import departmentResolvers from './department'
import userResolvers from './user'
import eventResolvers from './event'
import departmentuserResolvers from './departmentUser'
import ticketResolvers from './ticket'

export default [
  scalarCustom,
  categoryResolvers,
  contactResolvers,
  departmentResolvers,
  eventResolvers,
  userResolvers,
  departmentuserResolvers,
  ticketResolvers
]
