import Event from './Event'
import Landing from './Landing'
import AdminStore from './AdminStore'
import Me from './me'

export default {
  event: new Event(),
  landing: new Landing(),
  admin: new AdminStore(),
  me: new Me()
}
