FROM node:lts-alpine AS prod

WORKDIR /app

COPY package*.json ./
RUN npm install --production
RUN npm install @nestjs/cli

COPY . .
RUN npm run build

CMD ["npm", "run", "start:prod"]

FROM node:lts-alpine AS dev

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]

