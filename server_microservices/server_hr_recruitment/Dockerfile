FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy tất cả các tệp còn lại và xây dựng ứng dụng
COPY . .
RUN yarn run build && \
    yarn cache clean && \
    rm -rf /root/.cache /app/node_modules

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Chỉ copy các tệp cần thiết từ stage build
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile --production && \
    yarn cache clean

# Copy các tệp đã xây dựng từ stage build
COPY --from=build /app/dist ./dist

# Chạy ứng dụng
CMD ["yarn", "run", "start:prod"]
