FROM node


# Create app directory
RUN mkdir -p /usr/src/gateway
WORKDIR /usr/src/gateway

COPY package.json /usr/src/gateway/
RUN npm install -g gulp
RUN npm install

# Bundle app source
COPY . /usr/src/gateway

CMD ["npm", "start"]

