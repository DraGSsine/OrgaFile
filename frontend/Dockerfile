FROM node:22.13.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .


CMD ["npm", "run", "dev"]