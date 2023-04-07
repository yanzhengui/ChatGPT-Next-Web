# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy over files from host to container
COPY . .

# Install yarn and dependencies
RUN apk update
RUN yarn install && npm install -g concurrently
RUN apk add --no-cache git && apk add --no-cache libc6-compat

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found." && exit 1; \
  fi

ENV OPENAI_API_KEY=""
ENV CODE=""
ARG DOCKER=true

# Build production codebase
RUN yarn build

# Expose port
EXPOSE 3000

# Start the app when Docker container runs
CMD ["yarn", "start"]
