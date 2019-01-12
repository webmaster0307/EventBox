#------------------------------------------------------
#               Client build begin
#------------------------------------------------------
FROM node:alpine as builder

RUN mkdir -p /app/client

WORKDIR /app/client

COPY ["./package.json", "./yarn.lock", "./"]

RUN yarn install --prod

COPY "./src" "./src"
COPY "./public" "./public"
COPY ["./.env" , "./config-overrides.js", "./"]

RUN yarn build

#------------------------------------------------------
#               Nginx serving begin
#------------------------------------------------------
FROM nginx

FROM nginx:latest

LABEL maintainer="vinh_nguyen1211@yahoo.com.vn"

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/client/build /usr/share/nginx/html

EXPOSE 80