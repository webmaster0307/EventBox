import 'dotenv/config';
import http from 'http';
import path from 'path'
import cors from 'cors';
import express from 'express';
import history from 'connect-history-api-fallback'
import morgan from 'morgan'
import jwt from 'jsonwebtoken';
import DataLoader from 'dataloader';
import { ApolloServer } from 'apollo-server-express';
import { AuthenticationError } from 'apollo-server';

import schema from './schema';
import resolvers from './resolvers';
import models from './models';
import loaders from './loaders';

const port = process.env.SERVER_PORT || 5000;
const host = process.env.NODE_ENV === 'production' ? process.env.HOST_NAME : 'localhost'

const app = express();

const corsOptions = {
  origin: `http://${host}:${port}`,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// cors
app.use(cors());
// api fallback for SPA
app.use(history({
  rewrites:[
      {from: /^\/api\/.*$/, to: function(context){
          return context.parsedUrl.pathname;
      }},
  ]
}))
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

app.use(
  morgan(`- :method :decodeUrl :status :response-time ms`)
)

// set view engine
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');

const getMe = async req => {
  const token = req.headers['x-token'];
  
  if (token) {
    try {
      return await jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  // playground: process.env.NODE_ENV === 'development',
  formatError: error => {
    const { extensions } = error 
    if(extensions && extensions.code === 'UNAUTHENTICATED'){
      // console.log('UNAUTHENTICATED')
      return {
        ...error,
        statusCode: 401,
        message: error.message
      }
    }
    
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message,
    };
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
        loaders: {
          user: new DataLoader(keys =>
            loaders.user.batchUsers(keys, models),
          ),
        },
      };
    }

    if (req) {
      const me = await getMe(req);

      return {
        models,
        me,
        secret: process.env.TOKEN_SECRET,
        loaders: {
          user: new DataLoader(keys =>
            loaders.user.batchUsers(keys, models),
          ),
        },
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port }, () => {
  console.log(`Apollo Server starts on //${host}:${port}/graphql`);
});

// app.get('/', (req, res) => {
//   res.render('index')
// })

app.get('/api/status', (req, res) => {
  res.send({ 
    status: 'ok', 
    code: 200
  });
});

app.get('/api/auth', async (req, res) => {
  const me = await getMe(req)
  if(!me){
    return res.send({status: 403, message: 'Permission denied'})
  }
  res.send({ status: 'ok', me})
})