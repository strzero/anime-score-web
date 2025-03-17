FROM node:23-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm run build
CMD ["pnpm", "start"]
EXPOSE 5101
