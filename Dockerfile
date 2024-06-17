FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN npm install --force

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

ENV NODE_ENV production
ENV ENV production
ENV PORT 3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN chown -R nextjs:nodejs .

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
