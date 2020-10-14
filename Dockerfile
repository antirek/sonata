FROM node:12.19.0

RUN apt-get update
ARG NODE_ENV

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

RUN npm install

COPY . /usr/src/app
CMD [ "npm", "start" ]