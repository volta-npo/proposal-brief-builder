# syntax=docker/dockerfile:1
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.27-alpine
LABEL org.opencontainers.image.title="Proposal Brief Builder"
LABEL org.opencontainers.image.description="Turn messy discovery notes into a clean grant proposal brief before anyone writes prose."
LABEL org.opencontainers.image.source="https://github.com/volta-npo/proposal-brief-builder"
COPY infra/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget -qO- http://127.0.0.1:8080/ >/dev/null || exit 1
