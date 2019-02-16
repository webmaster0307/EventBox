import loginMethod from './userLogin'

const API_URL = `http://localhost:${process.env.SERVER_PORT || 8000}/graphql`

const adminLogin = () => {
  const usrAdmin = 'vinh'
  const pwdAdmin = '123'
  return loginMethod({ username: usrAdmin, password: pwdAdmin })
}

const userLogin = ({ username, password }) => {
  return loginMethod({ username, password })
}

export { adminLogin, userLogin, API_URL }
