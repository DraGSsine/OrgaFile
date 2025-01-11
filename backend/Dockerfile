FROM node:22.13.0

WORKDIR /app

COPY package*.json ./
RUN npm i -g @nestjs/cli && npm install

COPY . .

CMD ["nest", "start", "--watch"]