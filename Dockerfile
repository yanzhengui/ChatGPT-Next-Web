FROM node:18-alpine

RUN apk add --no-cache libc6-compat
RUN apk update && apk add --no-cache git

WORKDIR /app
COPY package.json yarn.lock* package-lock.json* ./

# 安装项目依赖，添加注释
RUN npm install \
    # 这里可以添加注释
    --production \
    && npm cache clean --force \
    && rm -rf /tmp/*

ENV OPENAI_API_KEY=""
ENV CODE=""
ARG DOCKER=true

WORKDIR /app
COPY . .

RUN yarn build

# Expose port
EXPOSE 3000

# Start the app when Docker container runs
CMD ["yarn", "start"]
