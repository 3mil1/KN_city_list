FROM node:lts-alpine as prod

WORKDIR /app

COPY package*.json ./
RUN npm install --production
RUN npm install typescript

COPY . .

RUN npm run build

CMD ["npm", "run", "preview"]

FROM node:lts-alpine as dev

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

