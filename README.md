# TypeFlow

这是一个使用 [Next.js](https://nextjs.org) 构建的打字练习应用，使用 [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) 引导创建。

## 开发入门

首先，运行开发服务器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

你可以通过修改 `app/page.js` 来开始编辑页面。页面会随着你的编辑自动更新。

本项目使用 [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) 自动优化并加载 [Geist](https://vercel.com/font)，这是 Vercel 的新字体系列。

## 部署到 Cloudflare Pages

### 方法一：使用 Wrangler CLI 部署

1. 首先安装 Wrangler CLI：
```bash
npm install -g wrangler
```

2. 登录到你的 Cloudflare 账户：
```bash
wrangler login
```

3. 创建 Cloudflare Pages 项目：
```bash
wrangler pages project create typeflow --production-branch main --compatibility-flags nodejs_compat
```

4. 部署到 Cloudflare Pages：
```bash
rm -rf .vercel/output/static/* && npm run pages:deploy
```

部署完成后，Wrangler 会提供一个可访问的 URL。

### 方法二：通过 Cloudflare Dashboard 部署

1. 确保你的代码已经推送到 GitHub 仓库

2. 登录到 Cloudflare Dashboard，进入 Pages 部分

3. 点击 "Create a project" 并选择 "Connect to Git"

4. 选择包含你项目的 GitHub 仓库

5. 配置构建设置：
   - 框架预设：选择 "Next.js"
   - 构建命令：`npm run pages:build`
   - 构建输出目录：`.vercel/output/static`
   - Node.js 版本：22.x（或与 package.json 中的 engines 字段匹配的版本）
   - 兼容性标志：在 "Environment variables" 中添加 `NODE_VERSION=22` 和 `NEXT_USE_NETLIFY_EDGE=true`

6. 高级设置：
   - 在 "Functions" 部分启用 "Node.js 兼容性标志"
   - 在 "Compatibility Flags" 中添加 `nodejs_compat`

7. 点击 "Save and Deploy"

完成以上步骤后，Cloudflare Pages 将自动构建并部署你的应用。每次推送到主分支时都会触发自动部署。

## 了解更多

要了解更多关于 Next.js 的信息，请查看以下资源：

- [Next.js 文档](https://nextjs.org/docs) - 了解 Next.js 特性和 API
- [学习 Next.js](https://nextjs.org/learn) - 交互式 Next.js 教程

你可以查看 [Next.js GitHub 仓库](https://github.com/vercel/next.js)，欢迎你的反馈和贡献！
