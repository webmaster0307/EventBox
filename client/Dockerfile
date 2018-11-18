#------------------------------------------------------
#               Client dev begin
#------------------------------------------------------
FROM node:8.12

RUN mkdir -p /app/client

WORKDIR /app/client

COPY ["./package.json", "./"]
RUN npm install --silent

COPY [".", "./"]

CMD [ "npm", "start" ]