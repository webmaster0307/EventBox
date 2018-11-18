#------------------------------------------------------
#               Server dev begin
#------------------------------------------------------
FROM node:8.12

RUN mkdir -p /app/server

WORKDIR /app/server

COPY ["./package.json", "./.babelrc", "./"]
RUN npm install --silent
RUN npm install -g nodemon

COPY ["./src", "./"]

CMD [ "npm", "start"]