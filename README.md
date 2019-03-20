# eventbox-dashboard

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4e75cb98a3564e8fb98206f6697bd6cd)](https://app.codacy.com/app/legend1250/eventbox-dashboard?utm_source=github.com&utm_medium=referral&utm_content=legend1250/eventbox-dashboard&utm_campaign=Badge_Grade_Settings) [![Build Status](https://drone.eventvlu.tk/api/badges/legend1250/eventbox-dashboard/status.svg)](https://drone.eventvlu.tk/legend1250/eventbox-dashboard) [![Build Status](https://dev.azure.com/legend12500/legend12500/_apis/build/status/legend1250.eventbox-dashboard?branchName=dev)](https://dev.azure.com/legend12500/legend12500/_build/latest?definitionId=1&branchName=dev)


A dashboard for Events management

## Features

* React (create-react-app) with Apollo Client 2
  * Queries, Mutations, Subscriptions, Antd UI Kit
* Node.js with Express and Apollo Server 2
  * cursor-based Pagination
* MongoDB Database with Mongoose
  * entities: users, events
* Authentication
  * powered by JWT and local storage
  * Sign Up, Sign In, Sign Out
* Authorization
  * protected endpoint (e.g. verify valid session)
  * protected resolvers (e.g. e.g. session-based, role-based)
  * protected routes (e.g. session-based, role-based)
* performance optimizations
  * example of using Facebook's dataloader
* E2E testing

## Installation

* `git clone git@github.com:legend1250/eventbox-dashboard.git`
* `cd eventbox-dashboard`

### Client

* `cd client`
* `npm install`
* `npm start`
* visit `http://localhost:3000`

### Server

* `cd server`
* `touch .env`
* `npm install`
* fill out *.env file* (see below)
* `npm start`
* optional visit `http://localhost:8000` for GraphQL playground

#### .env file

Since this boilerplate project is using MongoDB, you have to install it for your machine and get a database up and running. After you have created a database and a database user, you can fill out the environment variables in the *server/.env* file.

```
SERVER_PORT=8000
MONGODB_URI=mongodb://localhost:27017/eventbox

TOKEN_SECRET=asdlplplfwfwefwekwself.2342.dawasdq
```

The `TOKEN_SECRET` is just a random string for your authentication. Keep all these information secure by adding the *.env* file to your *.gitignore* file. No third-party should have access to this information.

#### Testing

* adjust `test-server` npm script with `TEST_DATABASE` environment variable in package.json to match your testing database name
  * to match it from package.json: `createdb mytestdatabase` with psql
* one terminal: npm run test-server
* second terminal: npm run test
