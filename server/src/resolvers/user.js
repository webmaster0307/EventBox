import jwt from 'jsonwebtoken'
import uuidV4 from 'uuid/v4'
import { combineResolvers } from 'graphql-resolvers'
import { AuthenticationError, UserInputError } from 'apollo-server'
import { isAuthenticated, isAdmin } from './authorization'
import rp from 'request-promise'

import nodemailer from 'nodemailer'
import confirmEmail from './mailTemplate/confirmEmail'

const tokenExpired = 60 * 60 * 8 // 8 hours
const tokenExpiredMobile = '7d' // 7 days
const EVENTBOX_HOST = process.env.EVENTBOX_HOST || 'http://localhost:8000'

const createToken = async (models, user, secret, type = 0) => {
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
  // type = 0 => web
  // type = 1 => mobile
  return await jwt.sign(payLoad, secret, {
    expiresIn: type === 0 ? tokenExpired : tokenExpiredMobile
  })
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USERNAME,
    pass: process.env.NODEMAILER_PASSWORD
  }
})

const verifyEmailOptions = ({ receiver, verifyLink }) => {
  return {
    from: process.env.NODEMAILER_USERNAME,
    to: receiver,
    subject: 'Verify Your Account',
    html: confirmEmail(receiver, verifyLink)
  }
}

export default {
  Query: {
    users: combineResolvers(isAdmin, async (parent, args, { models }) => {
      return await models.User.find(undefined, undefined, {
        sort: {
          createdAt: -1
        }
      })
    }),

    user: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => await models.User.findById(id)
    ),

    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null
      }
      const currentUser = await models.User.findById(me.id)
      const isReviewer = await models.DepartmentUser.findOne({
        userId: me.id,
        departmentRole: 'reviewer'
      })
      if (isReviewer) {
        currentUser.role.push('reviewer')
      }
      // console.log('current: ',currentUser);

      return currentUser
    }
  },

  Mutation: {
    signUp: async (parent, { username, email, password }, { models, secret }) => {
      let user = await models.User.findOne({ username })
      if (user) {
        throw new UserInputError('Email or username has been taken')
      }

      user = await models.User.findOne({ email })
      if (user) {
        throw new UserInputError('Email or username has been taken')
      }

      user = await models.User.create({ username, email, password })
      const token = await createToken(models, user, secret)
      const splittedToken = token.split('.')[1]
      await models.User.updateOne({ email }, { activateToken: splittedToken })

      transporter.sendMail(
        verifyEmailOptions({
          receiver: email,
          verifyLink: `${EVENTBOX_HOST}/api/verify?token=${splittedToken}`
        }),
        (err) => {
          if (err) throw new Error(err)
        }
      )

      const recheckTime = 1000 * 60 * 15
      setTimeout(async () => {
        const user = await models.User.findOne({ email })
        if (!user.isActivated) {
          await models.User.deleteOne({ email }, () => console.log(`Deleted user: ${username}`))
        }
      }, recheckTime)

      return true
    },

    signIn: async (parent, { username, password, type }, { models, secret }) => {
      const user = await models.User.findByLogin(username)

      if (!user) {
        throw new UserInputError('No user found with this login credentials.')
      }

      const isValid = await user.validatePassword(password)
      if (!isValid) {
        throw new UserInputError('Invalid password.')
      }

      if (!user.isActivated) {
        throw new UserInputError('Your account not yet activated!')
      }

      return { token: createToken(models, user, secret, type) }
    },

    updateUser: combineResolvers(isAuthenticated, async (parent, { username }, { models, me }) => {
      const user = await models.User.findById(me.id)
      if (!user) {
        throw new UserInputError('No user found with this login credentials.')
      }
      return await models.User.findByIdAndUpdate(me.id, { username }, { new: true })
    }),

    deleteUser: combineResolvers(isAdmin, async (parent, { id }, { models }) => {
      await models.User.findByIdAndRemove(id)
      return true
    }),

    updateProfie: combineResolvers(
      isAuthenticated,
      async (parent, { firstname, lastname, phoneNumber }, { models, me }) => {
        const updated = await models.User.findByIdAndUpdate(me.id, {
          firstname,
          lastname,
          phoneNumber
        })
        return !!updated
      }
    ),

    photoUpload: combineResolvers(isAuthenticated, async (parent, { file }, { me, models }) => {
      const { stream, filename, mimetype, encoding } = await file
      const UPLOAD_HOST = process.env.EVENTBOX_UPLOAD
      const result = () => {
        return new Promise((resolve) => {
          const buffer = []
          stream.on('data', (chunk) => {
            buffer.push(chunk)
          })
          stream.on('end', async () => {
            const imgBuffer = Buffer.concat(buffer)
            const options = {
              method: 'POST',
              uri: `${UPLOAD_HOST}/upload`,
              formData: {
                file: {
                  value: imgBuffer,
                  options: {
                    filename,
                    contentType: mimetype
                  }
                }
              },
              json: true
            }
            try {
              const {
                file: { filename }
              } = await rp(options)

              resolve(filename)
            } catch (error) {
              throw new ApolloError(error, '400')
            }
          })
        })
      }
      const source = await result()
      const photo = `${UPLOAD_HOST}/image/${source}`
      await models.User.findByIdAndUpdate(me.id, { photo })

      return photo
    })
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
      const departmentIds = roles.map((item) => item.departmentId)
      const departments = await models.Department.find({
        _id: {
          $in: departmentIds
        }
      })
      return departments
    }
  }
}
