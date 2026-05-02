# HK 技术博客

这是一个基于 Astro 搭建的中文个人技术博客，当前部署目标为 GitHub Pages 仓库 `3436567162/hust-Phoenix`。

## 本地开发

```bash
npm install
npm run dev
```

## 本地验证

```bash
npm run test
npm run check
npm run build
```

## 内容维护

文章内容位于 `src/content/posts/`，项目条目位于 `src/content/projects/`。

文章 frontmatter 需要包含：

- `title`
- `description`
- `date`
- `category`
- `tags`
- `featured`
- `draft`

项目 frontmatter 需要包含：

- `title`
- `summary`
- `techStack`
- `featured`
- `order`

可选字段：

- `updatedDate`
- `repoUrl`
- `demoUrl`

## GitHub Pages 部署

1. 将本地仓库推送到 `https://github.com/3436567162/hust-Phoenix`
2. 打开 GitHub 仓库设置中的 `Pages`
3. 将 Source 设为 `GitHub Actions`
4. 确保默认分支为 `main`
5. 推送到 `main` 后，`.github/workflows/deploy.yml` 会自动执行构建和发布

部署地址：

- `https://3436567162.github.io/hust-Phoenix/`

## 当前部署约定

- `astro.config.mjs` 已配置：
  - `site = https://3436567162.github.io`
  - `base = /hust-Phoenix`
- `src/config/site.ts` 中的站点信息与 GitHub Pages 路径一致
- canonical、Open Graph 和 sitemap 会基于该地址生成

如果后续切换到自定义域名，需要同步修改：

- `astro.config.mjs`
- `src/config/site.ts`
