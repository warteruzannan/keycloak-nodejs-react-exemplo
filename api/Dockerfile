FROM node:alpine

COPY . /var/www/node-app
WORKDIR /var/www/node-app

ENV KEYCLOAK_SERVER=http://keycloak-host:8080
ENV KEYCLOAK_HELM=test

EXPOSE 4020

RUN yarn install

