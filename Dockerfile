FROM node:18

WORKDIR usr/src/api

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3333

CMD ["npm", "run", "start"]
