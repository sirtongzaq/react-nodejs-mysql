FROM node:14

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5555

CMD ["npm", "run", "dev"]
