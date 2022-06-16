FROM node:14.19-alpine as base

RUN mkdir /app

COPY . /app

WORKDIR /app

RUN npm install

RUN npm run build

FROM node:14.19-alpine as product

COPY package*.json ./
RUN npm install

COPY --from=base /app/dist/ ./dist

CMD ["npm", "run", "start:prod"]
