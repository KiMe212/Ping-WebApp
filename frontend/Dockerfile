FROM node:16-slim as build

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . ./

RUN npm run build

CMD ["npm", "start"]
