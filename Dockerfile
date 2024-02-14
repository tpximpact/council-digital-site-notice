FROM node:20

WORKDIR /src/app

COPY package.json ./

RUN yarn install

COPY . .

ENV NODE_ENV=production

EXPOSE 3000

# Specify the command to run your application
CMD ["npm", "run", "dev"]