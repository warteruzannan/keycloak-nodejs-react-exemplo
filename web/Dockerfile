FROM node:alpine

COPY . /var/www/web-app
WORKDIR /var/www/web-app

ENV REACT_APP_URL_API=http://localhost:4020
EXPOSE 3000

RUN yarn install --frozen-lockfile

