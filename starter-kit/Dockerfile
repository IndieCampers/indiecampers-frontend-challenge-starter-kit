# Based on https://github.com/vercel/next.js/tree/canary/examples/with-docker
# One Dockerfile, two targets:
#   dev     → `docker compose up --watch`       (hot reload, used during the challenge)
#   runner  → `docker compose --profile prod up --build`  (production standalone build)

ARG NODE_VERSION=24-slim

# ---------- deps: install node_modules from the lockfile ----------
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund

# ---------- dev: Next.js dev server with hot reload ----------
FROM node:${NODE_VERSION} AS dev
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["node_modules/.bin/next", "dev", "--hostname", "0.0.0.0"]

# ---------- builder: production build (standalone output) ----------
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------- runner: minimal production image ----------
FROM node:${NODE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
COPY --from=builder --chown=node:node /app/public ./public
RUN mkdir .next && chown node:node .next
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
USER node
EXPOSE 3000
CMD ["node", "server.js"]
