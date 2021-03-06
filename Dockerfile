FROM node


# Create app directory
RUN mkdir -p /usr/src/cacheApi
WORKDIR /usr/src/gateway

COPY package.json /usr/src/cacheApi/
RUN npm install -g gulp
RUN npm install

# Bundle app source
COPY . /usr/src/cacheApi

ENV NODE_ENV development


EXPOSE 3023


CMD ["npm", "start"]


