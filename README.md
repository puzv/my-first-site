# 我的留言板

昨天的 HTML 练习仍在 Git 历史中。这个版本用 Next.js 显示和提交留言，Prisma 在服务端读写 PostgreSQL。

## 先在本地跑通

1. 使用 Node.js 24。在 PowerShell 进入项目目录，运行 `npm ci`。
2. 运行 `Copy-Item .env.example .env`，在编辑器里把 `.env` 的 `DATABASE_URL` 改成换过密码的开发或测试库连接串。不要把真实连接串放进 Git 或聊天。
3. 确认连接串指向专用数据库，且账号能创建表，运行 `npm run db:deploy`。这个命令会执行已提交的迁移、创建 `guestbook_messages` 表。首次连接远程库时按数据库提供方的要求使用 TLS。
4. 运行 `npm run dev`，打开终端显示的地址。发一条留言并刷新，再用 Navicat 查看 `guestbook_messages`。

## GitHub → Vercel

仓库 `puzv/my-first-site` 已连接到同名 Vercel 项目，生产分支是 `main`。`vercel.json` 为本版本指定 Next.js，不必先改旧 HTML 部署的设置。

1. 在 Vercel 的 **Settings → Environment Variables** 中给 **Preview** 添加测试库的 `DATABASE_URL`，给 **Production** 添加单独的正式库连接串。对两个专用数据库分别运行一次 `npm run db:deploy`，确保每次命令使用的确实是目标环境的连接串。不要让预览连接正式库。后续只改页面时不需要重复建表；新增迁移要单独安排执行。
2. 在功能分支运行 `npm run build`，提交改动后用 `git push -u origin HEAD` 推送。Vercel 项目的 **Deployments** 中会出现分支预览。等 **Ready** 后打开预览，发一条留言并刷新；确认正式网址仍是旧版。
3. 在 GitHub 创建 PR：**base** 选 `main`，**compare** 选功能分支。在 **Files changed** 检查改动，在 **Conversation** 找 Vercel 预览链接。由审核者检查，或自己练习时手动检查；不要在预览未验证时合并。
4. 合并 PR 后会触发 **Production** 部署。等 **Ready**，刷新原来的正式域名，验证新版可保存留言、看不到预览库的测试留言。Git 需要把提交推到 GitHub，只有本地 commit 不触发部署。

这是学习用的匿名留言板；连接可访问的生产网址后，访客也能发布。对外推广前应加访问控制或反滥用措施。
