# Node.js backend + static file server (replaces plain nginx)
FROM node:20-alpine

# Build tools needed by better-sqlite3 native addon
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Install dependencies first (layer-cache friendly)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy application files
COPY server.js ./
COPY index.html ./

# Persistent data directory (mount a volume here in production)
RUN mkdir -p /app/data

EXPOSE 3000

CMD ["node", "server.js"]
