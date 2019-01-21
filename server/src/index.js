import 'dotenv/config'
import http from 'http'
import path from 'path'
import cors from 'cors'
import express from 'express'
import history from 'connect-history-api-fallback'
import morgan from 'morgan'
import jwt from 'jsonwebtoken'
import DataLoader from 'dataloader'
import { ApolloServer } from 'apollo-server-express'
import { PubSub } from 'apollo-server'
import { AuthenticationError } from 'apollo-server'
import rp from 'request-promise'

import schema from './schema'
import resolvers from './resolvers'
import models, { connect } from './models/index'
import loaders from './loaders'

import { RedisPubSub } from 'graphql-redis-subscriptions'
import Redis from 'ioredis'

const port = process.env.SERVER_PORT || 8000
const host = process.env.NODE_ENV === 'production' ? process.env.HOST_NAME : 'localhost'

const app = express()

// Subscription
// const pubsub = new PubSub()
const options = {
  host: process.env.REDIS_PUBSUB_HOST || '127.0.0.1',   // Redis host
  port: process.env.REDIS_PUBSUB_PORT || 6379,          // Redis port
  retry_strategy: options => {
    // reconnect after
    return Math.max(options.attempt * 100, 3000);
  }
};

const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options)
})

// const corsOptions = {
//   origin: [ `http://${host}:${port}`, `http://${host}:2048`, `http://${host}:3003` ],
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// // cors
// app.use(cors(corsOptions));
// // api fallback for SPA
// app.use(history({
//   rewrites:[
//       {from: /^\/api\/.*$/, to: function(context){
//           return context.parsedUrl.pathname;
//       }},
//   ]
// }))
// morgan logging
morgan.token('decodeUrl', function (req, res) {
  return decodeURI(req.originalUrl)
})
// morgan.token('graphql-query', (req) => {
//   if(req.originalUrl.startsWith('/graph')){
//     const {query, variables, operationName} = req.body;
//     return `\n    - GraphQL: \n   Variables: ${JSON.stringify(variables)}`;
//     // return `GRAPHQL: \nOperation Name: ${operationName} \nQuery: ${query} \nVariables: ${JSON.stringify(variables)}`;
//   }
// });

// app.use(
//   morgan(`- :method :decodeUrl :status :response-time ms`)
// )

const getMe = async req => {
  const token = req.headers['x-token']

  if (token) {
    try {
      return await jwt.verify(token, process.env.TOKEN_SECRET)
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.'
      )
    }
  }
}

const newErr = (message, code) => new ApolloError(message, code)

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  playground: process.env.NODE_ENV === 'development',
  formatError: error => {
    // errorLogger(error)

    const { extensions } = error
    if (extensions && extensions.code === 'UNAUTHENTICATED') {
      // console.log('UNAUTHENTICATED')
      return {
        ...error,
        statusCode: 401,
        message: error.message
      }
    }

    // const message = error.message
    //   .replace('SequelizeValidationError: ', '')
    //   .replace('Validation error: ', '')

    return { message: error.message, httpCode: +error.extensions.code }
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
        newErr,
        pubsub,
        loaders: {
          user: new DataLoader(keys =>
            loaders.user.batchUsers(keys, models)
          )
        }
      }
    }

    if (req) {
      const me = await getMe(req)
      const isAdmin = me && me.role.includes('admin')

      return {
        models,
        newErr,
        me,
        pubsub,
        isAdmin,
        secret: process.env.TOKEN_SECRET,
        loaders: {
          user: new DataLoader(keys =>
            loaders.user.batchUsers(keys, models)
          )
        }
      }
    }
  }
})

server.applyMiddleware({
  app,
  path: '/graphql',
  cors: {
    origin: [ `http://${host}:${port}`, `http://${host}:2048`, `http://${host}:8080` ]
  }
})

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

connect(function(err){
  if(!err){
    httpServer.listen({ port }, () => {
      console.log(`Apollo Server starts on ${host}:${port}/graphql`)
      app.emit('serverStarted')
    })
  }
})

export {
  app,
  httpServer
}

// app.get('/', (req, res) => {
//   res.render('index')
// })

app.get('/api/status', (req, res) => {
  res.send({
    status: 'ok',
    instance: process.env.INSTANCE,
    code: 200
  })
})

app.get('/api/auth', async (req, res) => {
  let me
  try {
    me = await getMe(req)
  } catch (error) {
    return res.send({ status: 403, message: 'Permission denied' })
  }
  if(!me){
    return res.send({status: 403, message: 'Permission denied'})
  }
  return res.send({ status: 'ok', me})
})

const errorLogger = async (error) => {
  const url = await rp({
    method: 'POST',
    uri: 'https://pastebin.com/api/api_post.php',
    form: {
      api_dev_key: '3602972a4e65d3a560086a2849d02cb6',
      api_user_key: '0213e2a399bb2eb2764fe875eb77385e',
      api_option: 'paste',
      api_paste_name: 'eventbox-dashboard (backend) GraphQL Error',
      api_paste_code: JSON.stringify(error),
      api_paste_format: 'javascript',
      api_paste_private: 2,
      api_paste_expire_date: '1M'
    }
  })
  rp({
    method: 'POST',
    uri: 'https://hooks.slack.com/services/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',
    body: JSON.stringify({
      attachments: [
        {
          'fallback': 'Required plain-text summary of the attachment.',
          'color': '#36a64f',
          'pretext': 'GraphQL Error',
          'author_name': 'From: vinhnguyen1211 API',
          'author_link': 'https://github.com/legend1250/eventbox-dashboard',
          'title': 'Open error detail',
          'title_link': url,
          'text': 'See error detail',
          'fields': [
            {
              'title': 'Priority',
              'value': 'High',
              'short': false
            }
          ],
          'footer': 'Slack API',
          'footer_icon': 'https://platform.slack-edge.com/img/default_application_icon.png',
          'ts': new Date().getTime() / 1000
        }
      ]
    })
  })
}
