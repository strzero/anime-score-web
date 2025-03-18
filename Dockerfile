FROM node:23-alpine
WORKDIR /app
RUN npm install -g pnpm socat
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm build
CMD ["sh", "-c", "socat TCP-LISTEN:5100,fork TCP:$AS_API_URL & pnpm start"]
EXPOSE 5101
