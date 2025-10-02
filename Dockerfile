# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy build output
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./

# Optional: only if you have a public folder
# COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start", "--", "-H", "0.0.0.0"]
