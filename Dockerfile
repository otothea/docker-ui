FROM node:7.7.3

MAINTAINER oscar@otothea.com

# WORKDIR

RUN mkdir -p /srv/www
WORKDIR /srv/www

# DEPENDENCIES

COPY package.json package.json
RUN npm install

# APP

COPY api               api
COPY client            client
COPY lib               lib
COPY .babelrc          .babelrc
COPY .eslintrc         .eslintrc
COPY config.example.js config.js
COPY fuse.js           fuse.js
COPY fuse.prod.js      fuse.prod.js

RUN npm run build

CMD NODE_ENV=production npm start

EXPOSE 9898
