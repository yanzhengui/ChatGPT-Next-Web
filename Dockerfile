# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy over files from host to container
COPY . .

# Install yarn and dependencies
RUN apk update && apk add --no-cache --virtual  python make g++ && \
    npm install -g concurrently && yarn install

ENV OPENAI_API_KEY=""
ENV CODE=""
ARG DOCKER=true

# Build production codebase
RUN yarn build

# Expose port
EXPOSE 3000

# Start the app when Docker container runs
CMD ["yarn", "start"]
