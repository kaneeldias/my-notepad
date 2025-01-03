FROM node:lts
WORKDIR /usr/app
COPY package.json .
COPY . .
RUN npm ci --quiet
