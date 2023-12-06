FROM node:16.14-alpine

WORKDIR /app-backend

COPY package*.json ./
COPY packages.npm ./ 

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm" ]
CMD [ "start" ]
