FROM node:lts-alpine AS base

WORKDIR /app

FROM base AS deps

RUN apk add --no-cache libc6-compat

COPY package.json yarn.lock* .yarnrc.yml ./

RUN corepack enable && corepack prepare yarn@stable --activate
RUN yarn

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable && corepack prepare yarn@stable --activate
RUN yarn build

FROM nginx:alpine AS runner

WORKDIR /app

RUN apk add --no-cache nodejs npm supervisor

RUN rm /etc/nginx/conf.d/default.conf

COPY .docker/supervisord/supervisord.conf /etc/supervisord.conf
COPY .docker/nginx/default.conf /etc/nginx/conf.d

COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app /app

COPY .docker/scripts/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 80

CMD ["/usr/local/bin/entrypoint.sh"]