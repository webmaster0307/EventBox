import { combineResolvers } from 'graphql-resolvers'
import mongoose from 'mongoose'
import { isAuthenticated, isEventOwner, isAdmin } from './authorization'
import { EVENTS } from '../subscription'
import { ApolloError } from 'apollo-server'
import uuidV4 from 'uuid/v4'
import rp from 'request-promise'

const qr = require('qr-image')
import nodemailer from 'nodemailer'
import registerForm from './mailTemplate/registerEvent'
import moment from 'moment'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USERNAME,
    pass: process.env.NODEMAILER_PASSWORD
  }
})

const mailOptions = ({ receiver, ticketSvgSrc }) => {
  return {
    from: process.env.NODEMAILER_USERNAME,
    to: receiver,
    subject: 'VLU EventBox',
    html: registerForm(receiver, ticketSvgSrc)
    // attachments: [{
    //   filename: imgName,
    //   path: `${process.cwd()}/${cid}.png`,
    //   cid: `${cid}@xyz.s`
    // }]
  }
}

const slackSendQRCode = ({ userRegister, eventName, ticketPng }) => {
  rp({
    method: 'POST',
    uri: 'https://hooks.slack.com/services/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',
    body: JSON.stringify({
      attachments: [
        {
          fallback: 'Required plain-text summary of the attachment.',
          color: '#36a64f',
          pretext: 'Optional text that appears above the attachment block',
          author_name: 'Vinh Nguyễn',
          author_link: 'https://github.com/legend1250',
          title: 'User register an event',
          text: `${userRegister} \n${eventName}`,
          image_url: ticketPng,
          footer: 'Event ticket',
          footer_icon: 'https://avatars1.githubusercontent.com/u/15612361?s=460&v=4',
          ts: new Date().getTime() / 1000
        }
      ]
    })
  })
}

const toCursorHash = (string) => Buffer.from(string).toString('base64')

const fromCursorHash = (string) => Buffer.from(string, 'base64').toString('ascii')

export default {
  Query: {
    events: async (parent, { status, cursor, limit = 50 }, { models, me, isAdmin }) => {
      const cursorOptions = cursor
        ? {
            createdAt: {
              $lt: fromCursorHash(cursor)
            }
          }
        : {}
      let selfEventsCondition
      if (!status) {
        selfEventsCondition = !isAdmin
          ? {
              userId: me.id
            }
          : {}
      } else {
        selfEventsCondition = {
          status
        }
      }

      const events = await models.Event.find(
        {
          ...cursorOptions,
          ...selfEventsCondition
        },
        null,
        {
          limit: limit + 1,
          sort: {
            createdAt: -1
          }
        }
      )

      const hasNextPage = events.length > limit
      const edges = hasNextPage ? events.slice(0, -1) : events

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor:
            events.length > 0 ? toCursorHash(edges[edges.length - 1].createdAt.toString()) : ''
        }
      }
    },
    eventsHome: async (parent, { limit = 8 }, { me, models }) => {
      const events = await models.Event.find(
        {
          status: 'active'
        },
        null,
        {
          limit,
          sort: {
            createdAt: -1
          }
        }
      )
      return events
    },
    event: combineResolvers(
      // TODO: authorization handling, open for temporarily
      // isEventOwner,
      async (parent, { id }, { me, models }) => {
        return await models.Event.findById(id)
      }
    ),

    eventsInReview: async (parent, { status, page = 0, limit = 10 }, { models, me, isAdmin }) => {
      // const departmentIds = await models.DepartmentUser
      //   .find({ userId: me.id, departmentRole: 'reviewer' }, 'departmentId')
      //   .map(doc => doc.departmentId.toString())

      const departments = await models.DepartmentUser.find(
        {
          userId: me.id,
          departmentRole: 'reviewer'
        },
        'departmentId'
      )
      const departmentIds = departments.map((doc) => doc.departmentId)
      const edges = await models.Event.find(
        {
          status: 'in-review',
          departments: {
            $in: departmentIds
          }
        },
        null,
        {
          skip: page * limit,
          limit: limit + 1,
          sort: {
            updatedAt: -1
          }
        }
      )

      return {
        edges,
        departmentIds: departmentIds.map((item) => item.toString())
      }
    },

    countEventByType: async (parent, args, { models }) => {
      const entertainment = ['livemusic', 'artnculture', 'theaternplays', 'nightlife', 'outdoor']
      const learning = ['conference', 'seminarsncourses']
      const others = ['exhibitions', 'meetups', 'sports', 'community', 'attractions']
      return {
        entertainment: await models.Event.count({
          categories: {
            $in: entertainment
          }
        }),
        learning: await models.Event.count({
          categories: {
            $in: learning
          }
        }),
        others: await models.Event.count({
          categories: {
            $in: others
          }
        })
      }
    },

    eventsForSearch: async (parent, args, { models }) => {
      return await models.Event.find({
        startTime: {
          $gte: new Date()
        }
      }).then((data) => data.map((e) => e.title))
    },

    eventsForCheckin: combineResolvers(isAuthenticated, async (parent, args, { me, models }) => {
      // console.log('me: ', me)
      const events = await models.Event.find({
        userId: mongoose.Types.ObjectId(me.id),
        status: 'active'
      })
      return events
    })
  },

  Mutation: {
    createEvent: combineResolvers(isAuthenticated, async (parent, args, { models, me }) => {
      const { thumbnail, ...rest } = args
      const event = await models.Event.create({
        ...rest,
        images: {
          thumbnail
        },
        userId: me.id
      })

      // pubsub.publish(EVENTS.EVENT.CREATED, {
      //   eventCreated: { event }
      // })

      return event
    }),
    updateEvent: combineResolvers(isEventOwner, async (parent, args, { models, me }) => {
      const { id, thumbnail, ...rest } = args
      const event = await models.Event.findByIdAndUpdate(
        id,
        {
          ...rest,
          images: {
            thumbnail
          },
          status: 'draft'
        },
        {
          new: true
        }
      )

      return event
    }),

    deleteEvent: combineResolvers(isEventOwner, async (parent, { id }, { models }) => {
      try {
        const { errors } = await models.Event.findByIdAndDelete(id)
        if (errors) {
          return false
        }
      } catch (error) {
        return false
      }
      return true
    }),

    publishEvent: combineResolvers(
      isEventOwner,
      async (parent, { id, departmentIds }, { models, pubsub }) => {
        try {
          const event = await models.Event.findByIdAndUpdate(
            id,
            {
              status: 'in-review',
              departments: departmentIds
            },
            {
              new: true
            }
          )
          // console.log('event: ',event);
          departmentIds.forEach((id) => {
            pubsub.publish(`${EVENTS.EVENT.SUBMITED_REVIEW} ${id}`, {
              eventSubmited: event
            })
          })
          // const thumbnail = event?.images?.thumbnail
          // console.log('thumbnail: ',thumbnail);
          return event
        } catch (error) {
          throw new Error('Failed to publish event')
        }
      }
    ),

    approveEvent: combineResolvers(
      // TODO: authenticate by review-er role
      // isEventOwner,
      async (parent, { id }, { models }) => {
        try {
          const { errors } = await models.Event.findByIdAndUpdate(id, {
            status: 'active'
          })
          if (errors) {
            return false
          }
        } catch (error) {
          return false
        }
        return true
      }
    ),
    rejectEvent: combineResolvers(
      // TODO: authenticate by review-er role
      // isEventOwner,
      async (parent, { id }, { models }) => {
        try {
          const { errors } = await models.Event.findByIdAndUpdate(id, {
            status: 'rejected'
          })
          if (errors) {
            return false
          }
        } catch (error) {
          return false
        }
        return true
      }
    ),
    joinEvent: combineResolvers(
      isAuthenticated,
      async (parent, { eventId }, { me, models, pubsub }) => {
        //
        const eventExisted = await models.Event.findById(eventId)
        if (!eventExisted) {
          throw new ApolloError('Event is not recognized', '400')
        }
        const count = await models.Ticket.countDocuments({ eventId: eventExisted.id })
        if (count >= eventExisted.maxTickets) {
          throw new ApolloError('Ticket is sold out', '400')
        }
        const closeTime = new Date(eventExisted.registerEndAt).getTime()
        const now = new Date().getTime()
        if (now >= closeTime) {
          throw new ApolloError('Event was close, cannot register ticket', '400')
        }
        // upload svg host
        const UPLOAD_HOST = process.env.EVENTBOX_UPLOAD
        if (!UPLOAD_HOST) {
          throw new ApolloError('Missing upload hosting', '400')
        }
        //
        const isJoined = await models.Ticket.findOne({
          userId: me.id,
          eventId
        })
        if (isJoined) {
          throw new ApolloError('You are already registered this event', '400')
        }
        const code = uuidV4()
        const imgSvg = qr.image(code, {
          type: 'svg'
        })
        const buffer = []
        const result = () => {
          return new Promise((resolve) => {
            imgSvg.on('data', (chunk) => {
              buffer.push(chunk)
            })
            imgSvg.on('end', async () => {
              const imgBuffer = Buffer.concat(buffer)
              const imgName = `${me.username}_${eventExisted.slug}.svg`
              const options = {
                method: 'POST',
                uri: `${UPLOAD_HOST}/upload`,
                formData: {
                  file: {
                    value: imgBuffer,
                    options: {
                      filename: imgName,
                      contentType: 'image/svg+xml'
                    }
                  }
                },
                json: true
              }
              try {
                const {
                  file: { filename }
                } = await rp(options)
                const ticket = await models.Ticket.create({
                  userId: me.id,
                  eventId,
                  code,
                  ticketSvgSrc: `${UPLOAD_HOST}/ticket/${filename}`
                })
                if (process.env.NODE_ENV === 'production') {
                  transporter.sendMail(
                    mailOptions({
                      receiver: me.email,
                      imgName,
                      ticketSvgSrc: `${UPLOAD_HOST}/ticket/${filename}`
                    })
                  )
                } else {
                  slackSendQRCode({
                    userRegister: `${me.username} | ${me.email} | ${me.id}`,
                    eventName: `${eventExisted.title} ${eventExisted.id}`,
                    ticketPng: `${UPLOAD_HOST}/ticket/${filename}/1`
                  })
                }
                resolve(ticket)
              } catch (error) {
                throw new ApolloError(error, '400')
              }
            })
          })
        }
        const ticket = await result()
        return ticket
        // try {
        //   const usr = await models.User.findById(userId)
        //   const evt = await models.Event.findById(eventId)
        //   if (usr && evt && !evt.participants.some((usrId) => usrId === userId)) {
        //     const qr_svg = qr.image(usr.email)
        //     qr_svg.pipe(fs.createWriteStream(`${usr._id}.png`))

        //     fs.stat(`${process.cwd()}/${usr._id}.png`, function(err) {
        //       if (err) throw new ApolloError('File not found!', '403')
        //       transporter.sendMail(
        //         mailOptions({
        //           receiver: usr.email,
        //           cid: usr._id
        //         }),
        //         (err) => {
        //           if (err) throw new ApolloError('An error occurred when mail is sending!', '403')
        //           fs.unlink(`${process.cwd()}/${usr._id}.png`, function(err) {
        //             if (err) throw new ApolloError('Cannot delete deprecated QR image!', '403')
        //           })
        //         }
        //       )
        //     })

        //     evt.participants.push(userId)
        //     const participants = evt.participants
        //     await models.Event.updateOne(
        //       {
        //         _id: eventId
        //       },
        //       {
        //         $set: {
        //           participants
        //         }
        //       },
        //       (err) => {
        //         if (err) throw new ApolloError('An error occurred when updating event!', '403')
        //       }
        //     )
        //     pubsub.publish(EVENTS.EVENT.EVENT_UPDATE, {
        //       eventUpdate: {
        //         type: 'join',
        //         _id: eventId,
        //         participants
        //       }
        //     })

        //     return true
        //   }
        //   return false
        // } catch (err) {
        //   throw new ApolloError(err, '400')
        // }
      }
    ),
    unjoinEvent: async (parent, { userId, eventId }, { models, pubsub }) => {
      try {
        const usr = await models.User.findById(userId)
        const evt = await models.Event.findById(eventId)
        if (usr && evt && !evt.participants.some((usrId) => usrId === userId)) {
          evt.participants.filter((usrId) => usrId !== userId)
          const participants = evt.participants
          await models.Event.updateOne(
            {
              _id: eventId
            },
            {
              $set: {
                participants
              }
            }
          )
          pubsub.publish(EVENTS.EVENT.EVENT_UPDATE, {
            eventUpdate: {
              type: 'unjoin',
              _id: eventId,
              participants
            }
          })
          return true
        }
        return false
      } catch (err) {
        throw new ApolloError(err, '400')
      }
    },

    publishDirectly: combineResolvers(isAdmin, async (parent, { eventId }, { models }) => {
      try {
        const updated = await models.Event.findByIdAndUpdate(
          eventId,
          {
            status: 'active'
          },
          { new: true }
        )
        return updated
      } catch (err) {
        throw new ApolloError(err, '400')
      }
    })
  },

  Event: {
    user: async (event, args, { loaders }) => await loaders.user.load(event.userId),

    departments: async (event, args, { models }) => {
      const ids = event.departments.map((id) => mongoose.Types.ObjectId(id))
      const departments = await models.Department.find({
        _id: {
          $in: ids
        }
      })
      return departments
    },

    categories: async (event, args, { models }) => {
      const ids = event.categories.map((id) => mongoose.Types.ObjectId(id))
      const categories = await models.Category.find({
        _id: {
          $in: ids
        }
      })
      return categories
    }
  },

  Subscription: {
    eventCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.EVENT.CREATED)
    },
    eventSubmited: {
      resolve: (payload, args, context, info) => {
        // Manipulate and return the new value
        const { description, ...eventSubmited } = payload.eventSubmited
        // console.log('rest: ',eventSubmited)
        // console.log('typeof: ',typeof eventSubmited)
        return {
          ...eventSubmited,
          id: mongoose.Types.ObjectId(eventSubmited._id)
        }
      },
      subscribe: (parent, { departmentIds }, { models, pubsub }, info) => {
        const arrIterator = departmentIds.map((id) => `${EVENTS.EVENT.SUBMITED_REVIEW} ${id}`)
        return pubsub.asyncIterator(arrIterator)
      }
    },
    eventUpdate: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator(EVENTS.EVENT.EVENT_UPDATE)
    },
    eventCheckedIn: {
      subscribe: (parent, { eventId }, { pubsub }) =>
        pubsub.asyncIterator(`${EVENTS.EVENT.CHECKIN} ${eventId}`)
    }
  }
}
