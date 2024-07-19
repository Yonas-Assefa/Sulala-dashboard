FROM oven/bun AS builder

WORKDIR /app

COPY package* ./
COPY bun.lockb ./

RUN bun install --production

COPY . .

RUN bun run build

FROM oven/bun

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

ENV NODE_ENV production
ENV ENV production
ENV PORT 3000

RUN addgroup --system --gid 1001 ovenbun
RUN adduser --system --uid 1001 nextjs

RUN chown -R nextjs:ovenbun .

USER nextjs

EXPOSE 3000

CMD ["bun", "server.js"]
