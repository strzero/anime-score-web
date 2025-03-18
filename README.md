# 运行

## Docker

```python
docker run -d --name anime-score-web -p 5101:5101 --add-host host.docker.internal:host-gateway -e AS_API_URL=http://host.docker.internal:5100 stellatezero/anime-score-web
```

 AS_API_URL指定anime-score-api的端口地址

### 手动部署

```shell
npm install -g pnpm
pnpm install
pnpm build
pnpm start
```

也可改用其他包管理器
