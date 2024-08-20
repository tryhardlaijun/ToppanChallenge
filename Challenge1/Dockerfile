# Build stage
FROM node:current-alpine3.19 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:current-alpine3.19 AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=build /app/dist ./dist

CMD ["node", "dist/app.js"]

