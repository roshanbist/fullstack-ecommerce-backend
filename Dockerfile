FROM node:alpine AS builder
# create folder in dockerhub with name app
WORKDIR /app
# copy package and lock file to root folder in docker
COPY package.json package-lock.json ./
RUN npm install
# copy everything from root folder to docker hub root folder
COPY . .
RUN npm run build


FROM node:alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 8080
CMD ["node", "dist/src/server.js"]