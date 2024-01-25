FROM node:18-alpine as development

RUN mkdir -p /app

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json /app/

RUN npm install

COPY . /app/

EXPOSE 4200

CMD [ "npm","start" ]

#FROM node:18-alpine as developmentWindows

#RUN mkdir -p /app

#WORKDIR /app

#ENV PATH /app/node_modules/.bin:$PATH

#COPY package*.json /app/

#RUN npm install

#COPY . /app/

#EXPOSE 4200

#CMD [ "npm","run","enable" ]