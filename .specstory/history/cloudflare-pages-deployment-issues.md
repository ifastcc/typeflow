## SpecStory

## Cloudflare Pages Deployment Issues (2025/2/17 17:21:23)

_**User**_

帮我检查一下这个项目,部署到 cloudflare pages 的两个方法中,通过 wrangler cli 部署是可以的,第二种方法是不行的?为啥?顺便帮我修改第二种方法?

---

_**Assistant**_

我来帮你分析一下这个问题。

首先，让我检查一下项目的配置文件，看看是否有特殊的构建设置。

---

_**Assistant**_



---

_**Assistant**_



---

_**Assistant**_



我发现了问题所在。第二种方法（通过 Cloudflare Dashboard 部署）的配置说明确实有误。这是因为：

1. 从 `next.config.mjs` 可以看到，项目使用了 `output: 'export'` 配置，这意味着项目是静态导出的。

2. 从 `package.json` 可以看到，项目使用了 `@cloudflare/next-on-pages` 这个特殊的构建工具。

让我帮你修改 README.md 中的第二种部署方法：

---

_**Assistant**_

```
### 方法一：使用 Wrangler CLI 部署
// ... existing code ...

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
// ... existing code ...
```

---

_**Assistant**_



我来解释一下为什么原来的第二种方法不行，以及新的配置为什么是正确的：

1. **原因分析**：
   - 原来的方法不行是因为它使用了标准的 Next.js 构建流程（`npm run build`）
   - 但是这个项目使用了 Cloudflare Pages 特定的构建工具 `@cloudflare/next-on-pages`
   - 项目配置为静态导出（`output: 'export'`），需要特殊的构建流程

2. **新配置的改进**：
   - 使用 `npm run pages:build` 命令，这会调用 `@cloudflare/next-on-pages` 进行构建
   - 正确指定输出目录为 `.vercel/output/static`
   - 添加了必要的 Node.js 兼容性标志
   - 设置了正确的 Node.js 版本（与项目要求匹配）
   - 添加了必要的环境变量

3. **两种方法的区别**：
   - 方法一（Wrangler CLI）更直接，适合本地开发和手动部署
   - 方法二（Dashboard）适合自动化部署，可以配置自动构建和持续集成

这样修改后，两种部署方法都应该可以正常工作了。你可以根据自己的需求选择使用哪种方法。如果你主要是进行开发和测试，建议使用方法一；如果你需要设置自动部署流程，可以使用方法二。

---



---

