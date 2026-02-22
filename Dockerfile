FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

RUN addgroup app && adduser -S -G app app
USER app

EXPOSE 3000

CMD ["node", "src/index.js"]