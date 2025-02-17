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

要将应用部署到 Cloudflare Pages，请按照以下步骤操作：

1. 确保你的代码已经推送到 GitHub 仓库

2. 登录到 Cloudflare Dashboard，进入 Pages 部分

3. 点击 "Create a project" 并选择 "Connect to Git"

4. 选择包含你项目的 GitHub 仓库

5. 配置构建设置：
   - 构建命令：`npm run build`
   - 构建输出目录：`.next`
   - Node.js 版本：选择与你的本地开发环境相匹配的版本

6. 环境变量设置（如果需要）：
   - 在 "Environment variables" 部分添加必要的环境变量

7. 点击 "Save and Deploy"

完成以上步骤后，Cloudflare Pages 将自动构建并部署你的应用。每次推送到主分支时都会触发自动部署。

## 了解更多

要了解更多关于 Next.js 的信息，请查看以下资源：

- [Next.js 文档](https://nextjs.org/docs) - 了解 Next.js 特性和 API
- [学习 Next.js](https://nextjs.org/learn) - 交互式 Next.js 教程

你可以查看 [Next.js GitHub 仓库](https://github.com/vercel/next.js)，欢迎你的反馈和贡献！
