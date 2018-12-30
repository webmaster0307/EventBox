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
COPY ["./package.json", "./yarn.lock", "/app/server/"]
RUN yarn install

RUN npm install -g pm2 babel-cli

## Add application code
COPY ["./.babelrc", "/app/server/"]
COPY ["./src", "/app/server/src"]

# CMD [ "yarn" "run" "start-prod" ]