FROM node:14

RUN mkdir -p /app

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json /app/

RUN npm install

COPY . /app/

EXPOSE 4200

CMD [ "npm","start" ]