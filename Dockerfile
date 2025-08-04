FROM node:22.13-alpine

MAINTAINER Mykola

RUN mkdir /app
WORKDIR /app

COPY ./backend/package.json /app

RUN npm i