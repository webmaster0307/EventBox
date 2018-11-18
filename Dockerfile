#------------------------------------------------------
#               Client build begin
#------------------------------------------------------
FROM node:8.12 as builder

RUN mkdir -p /app/client

WORKDIR /app/client

COPY ["./client/package.json", "./client/yarn.lock", "./"] 
RUN npm install -g --silent yarn
RUN yarn install

COPY ["./client" , "./"]

RUN yarn build

#------------------------------------------------------
#               Server build begin
#------------------------------------------------------
## Specifies the base image we're extending
FROM node:8.12

## Create base directory
RUN mkdir -p /app/server

## Specify the "working directory" for the rest of the Dockerfile
WORKDIR /app/server

## Install packages using NPM 5 (bundled with the node:9 image)
COPY ["./server/package.json", "./server/yarn.lock", "/app/server/"]
RUN npm install -g --silent yarn
RUN yarn install

RUN npm install -g pm2
RUN npm install -g babel-cli

## Add application code
COPY ["./server/.babelrc", "/app/server/"]
COPY ["./server/src", "/app/server/src"]

WORKDIR /app/server

COPY --from=builder /app/client/build ./src/public

# CMD [ "yarn" "run" "start-prod" ]