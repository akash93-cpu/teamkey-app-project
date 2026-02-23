FROM node:20-alpine

WORKDIR /frontend-java

COPY package*.json ./
RUN npm install

EXPOSE 5173

CMD ["npm", "start"]