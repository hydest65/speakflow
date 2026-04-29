# SpeakFlow 版本收尾

## 当前版本

```text
0.2.1
```

版本日期：2026-04-29

版本性质：本地单视频测试库收尾版。重点是清空旧视频库内容，从用户提供的 Notion 视频素材重新开始，并将浏览器不稳定的 MOV 播放路径切换为本地 H.264 MP4 测试文件。

## 仓库状态

仓库目录：

```text
C:\Users\lixin11190\Documents\New project 2\speakflow
```

GitHub 远端：

```text
https://github.com/hydest65/speakflow.git
```

Render 配置：

```text
render.yaml
```

## 本版完成

- 首页改为 Option B 安静学习入口，视频库移到 `library.html` 分支页面。
- 导航统一为：首页、视频库、收藏夹、学习卡片、AI 陪练、会员。
- 清空旧第三方演讲素材和旧本地演示视频条目。
- 视频库从 1 条测试视频重新开始：`notion-test-001`。
- 原始 Notion 文件链接保留为来源记录，站内播放改用本地文件。
- 将 `Video/RPReplay_Final1713515371.mov` 转码为 `Video/RPReplay_Final1713515371.mp4`，并让学习页播放 MP4。
- 新增 `video-test.html`，用于绕过业务页面直接测试 MP4 播放。
- 新增外部链接导入模板 `data/external-video-import-template.json`。
- 版本号从 `0.2.0` 更新到 `0.2.1`，并同步 `VERSION`、`package.json`、`docs/CHANGELOG.md`。
- 产品、技术、视觉文档已同步本地单视频测试方向。

## 当前测试入口

视频库：

```text
file:///C:/Users/lixin11190/Documents/New%20project%202/speakflow/library.html
```

学习页：

```text
file:///C:/Users/lixin11190/Documents/New%20project%202/speakflow/learn.html?video=notion-test-001
```

视频直测页：

```text
file:///C:/Users/lixin11190/Documents/New%20project%202/speakflow/video-test.html
```

## 已知问题

- 当前字幕和精读内容仍是占位内容，等待用户提供真实字幕和精读信息后替换。
- `sourceUrl` 中保留 Notion 签名链接作为来源记录，该链接可能过期，不再作为站内播放源。
- 命令行 Git 在当前 Codex 环境不可用，无法完成本地与 GitHub 远端比较。
- Node 执行在当前 Codex 环境被系统拒绝，无法运行 `npm run check` 或 `node --check`。
- FFmpeg 在用户 PowerShell 中可用，但当前 Codex 命令环境未识别 `ffmpeg`；转码结果文件已在项目目录中确认存在。

## 本地收尾检查

- 关键页面文件存在：`index.html`、`library.html`、`learn.html`、`favorites.html`、`tips.html`、`ai.html`、`pricing.html`、`video-test.html`。
- 关键资源存在：`styles.css`、`app.js`、`assets/speakflow-logo.png`、`Video/RPReplay_Final1713515371.mp4`。
- 当前视频库数据只保留 `notion-test-001`。
- 站内播放源已指向 `Video/RPReplay_Final1713515371.mp4`。
- 旧视频 id 未在页面和主视频数据入口中继续出现。

## GitHub Desktop 操作

由于当前环境无法运行 Git，请用 GitHub Desktop 完成同步：

1. 打开 GitHub Desktop，确认当前仓库是 `speakflow`。
2. 先点击 `Fetch origin`，检查远端是否有新变化。
3. 如果远端有更新，先 `Pull origin`，确认没有冲突后再继续。
4. 查看左侧 Changes，确认包含本版修改。
5. Summary 填写：

```text
Release v0.2.1 local video test library
```

6. 点击 `Commit to main`。
7. 点击 `Push origin`。

如果 GitHub Desktop 显示本地和远端都有新提交，不要直接覆盖，先停下来决定合并方向。
