# node:22 — pnpm 11 requires Node >= 22.13
FROM node:22-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NEXT_TELEMETRY_DISABLED=1

# Pin pnpm version — avoid corepack pulling incompatible/newer release
RUN corepack enable && corepack install -g pnpm@10.11.0

WORKDIR /app

# Copy manifests — fresh install on Linux gets correct @tailwindcss/oxide binding
COPY package.json pnpm.yaml ./
RUN pnpm install --no-frozen-lockfile

# Build
COPY . .
RUN pnpm build

EXPOSE 3000
ENV NODE_ENV=production

CMD pnpm start
