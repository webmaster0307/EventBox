import categoryResolvers from './category'
import contactResolvers from './contact'
import departmentResolvers from './department'
import userResolvers from './user'
import eventResolvers from './event'
import departmentuserResolvers from './departmentUser'
import eventUserResolvers from './eventUser'
import scalarCustom from './scalarCustom'

export default [
  scalarCustom,
  categoryResolvers,
  contactResolvers,
  departmentResolvers,
  eventResolvers,
  userResolvers,
  departmentuserResolvers,
  eventUserResolvers
]
