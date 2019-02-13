import jwt from 'jsonwebtoken'
import uuidV4 from 'uuid/v4'
import { combineResolvers } from 'graphql-resolvers'
import { AuthenticationError, UserInputError } from 'apollo-server'
import { isAuthenticated, isAdmin } from './authorization'

import nodemailer from 'nodemailer'
import confirmEmail from './mailTemplate/confirmEmail'

const tokenExpired = 60 * 60 * 8 // 8 hours

const createToken = async (models, user, secret) => {
  const { id, email, username, role } = user
  const jti = uuidV4()
  const payLoad = {
    iss: process.env.TOKEN_ISSUER || 'EVENTBOX',
    id,
    email,
    username,
    role,
    jti
  }
  return await jwt.sign(payLoad, secret, {
    expiresIn: tokenExpired
  })
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USERNAME,
    pass: process.env.NODEMAILER_PASSWORD
  }
})

const verifyEmailOptions = ({receiver, verifyLink}) => {
  return {
    from: process.env.NODEMAILER_USERNAME,
    to: receiver,
    subject: 'Verify Your Account',
    html: confirmEmail(receiver, verifyLink)
  }
}

export default {
  Query: {
    users: combineResolvers(
      isAdmin,
      async (parent, args, { models }) => {
        return await models.User.find()
      }),

    user: async (parent, { id }, { models }) =>
      await models.User.findById(id),

    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null
      }
      const currentUser = await models.User.findById(me.id)
      const isReviewer = await models.DepartmentUser.findOne({ userId: me.id, departmentRole: 'reviewer' })
      if(isReviewer){
        currentUser.role.push('reviewer')
      }
      // console.log('current: ',currentUser);

      return currentUser
    }
  },

  Mutation: {
    signUp: async (
      parent,
      { username, email, password },
      { models, secret }
    ) => {
      let user = await models.User.findOne({ username })
      if (user) {
        throw new UserInputError(
          'Email or username has been taken'
        )
      }

      user = await models.User.findOne({ email })
      if (user) {
        throw new UserInputError(
          'Email or username has been taken'
        )
      }

      user = await models.User.create({ username, email, password })
      const token = await createToken(models, user, secret)
      const splittedToken = token.split('.')[1]
      await models.User.updateOne({ email }, { activateToken: splittedToken })

      transporter.sendMail(
        verifyEmailOptions({
          receiver: email,
          verifyLink: `http://localhost:8000/api/verify?token=${splittedToken}`
        }), (err) => {
        if(err) throw new Error(err)
      })

      const recheckTime = 1000 * 60 * 15
      setTimeout(async () => {
        const user = await models.User.findOne({ email })
        if (!user.isActivated) {
          await models.User.deleteOne({ email }, () => console.log(`Deleted user: ${username}`))
        }
      }, recheckTime)

      return true
    },

    signIn: async (
      parent,
      { username, password },
      { models, secret }
    ) => {
      const user = await models.User.findByLogin(username)

      if (!user) {
        throw new UserInputError(
          'No user found with this login credentials.'
        )
      }

      const isValid = await user.validatePassword(password)
      if (!isValid) {
        throw new UserInputError('Invalid password.')
      }

      if (!user.isActivated) {
        throw new UserInputError('Your account not yet activated!')
      }

      return { token: createToken(models, user, secret) }
    },

    updateUser: combineResolvers(
      isAuthenticated,
      async (parent, { username }, { models, me }) => {
        const user = await models.User.findById(me.id)
        if (!user) {
          throw new UserInputError(
            'No user found with this login credentials.'
          )
        }
        return await models.User.findByIdAndUpdate(me.id, { username }, { new: true })
      }
    ),

    deleteUser: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        await models.User.findByIdAndRemove(id)
        return true
      }
    )
  },

  User: {
    events: async (user, args, { models }) =>
      await models.Event.findAll({
        where: {
          userId: user.id
        }
      }),
    departments: async (user, args, { models }) => {
      const roles = await models.DepartmentUser.find({
        userId: user.id
      })
      const departmentIds = roles.map(item => item.departmentId)
      const departments = await models.Department.find({
        _id: {
          $in: departmentIds
        }
      })
      return departments
    }
  }
}
