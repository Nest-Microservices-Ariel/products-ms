FROM node:24-alpine3.22

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN npx prisma generate

EXPOSE 3001

CMD [ "yarn", "start:dev" ]