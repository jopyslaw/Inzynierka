FROM node:18-alpine as development

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","run","dev"]

#FROM node:18-alpine as production

#ARG NODE_ENV=production
#ENV NODE_ENV=${NODE_ENV}

#WORKDIR /usr/src/app

#COPY package*.json .

#RUN npm ci --only=production

#COPY --from=development /usr/src/app/dist ./dist

#CMD ["node", "dist/index.js"]
