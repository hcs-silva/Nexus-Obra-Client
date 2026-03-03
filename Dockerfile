FROM node:22-bookworm-slim AS builder

WORKDIR /app

RUN npm install -g pnpm@10.29.1

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG VITE_BACKEND_URL=http://localhost:5005
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN pnpm build

FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]