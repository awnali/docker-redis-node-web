FROM node:alpine

WORKDIR /app

EXPOSE 8081

CMD node server.js