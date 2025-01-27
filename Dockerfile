# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run test
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine AS stage-1
COPY --from=build /app/build /usr/share/nginx/html
