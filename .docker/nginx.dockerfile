FROM nginx:latest

LABEL maintainer="vinh_nguyen1211@yahoo.com.vn"

COPY ./.docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
