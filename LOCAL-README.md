# 本地预览

先启动 Docker Desktop，在当前文件夹运行：

```powershell
docker compose up --build -d
```

打开 http://localhost:1313/ 。此配置仅供本地预览，不会发布到线上。

停止预览：

```powershell
docker compose down
```

以后再次启动可使用 `docker compose up -d`。

个人资料在 `_data/profile.yml`，导航在 `_data/navigation.yml`，首页在 `index.html`。
Education、Hobbies 和 Publications 位于首页，导航点击后滚动到对应板块。Showcase 暂时隐藏。
头像使用 `assets/images/photos/portrait.jpg`，原始 `Linkedin.jpg` 也已保留。
修改 `_config.yml` 后运行 `docker compose restart`。

旧模板和旧备份已清理。当前模板来自 https://github.com/luost26/academic-homepage 。

## GitHub Pages 部署

目标仓库：https://github.com/QifengChen-007/qifengchen.github.io

在仓库 Settings → Pages 中将 Source 设为 GitHub Actions。GitHub Free 需要公开仓库；私有仓库需要支持 Pages 的付费套餐。

启用后，推送到 `main` 会运行 `.github/workflows/deploy-pages.yml`，自动构建并发布。
也可以在 Actions 中手动运行 “Deploy website to GitHub Pages”。

网站地址：https://qifengchen-007.github.io/qifengchen.github.io/

正式环境通过 `_config.production.yml` 设置域名和路径；本地 Docker 预览仍使用 http://localhost:1313/。
