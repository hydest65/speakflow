# SpeakFlow 版本收尾

## 当前版本

```text
0.1.3
```

版本日期：2026-04-28

版本性质：可部署 AI 学习原型版，重点完成学习闭环、表达库工作台、Node 后端代理与 MiniMax provider 切换。

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

## 本版已完成

- 今日任务、跟读、AI 评分、打卡和会员页学习记录已用 `localStorage` 串成轻量闭环。
- AI陪练页支持场景切换、英文输入、本地模拟追问、评分反馈，并把陪练轮次写入学习记录。
- 跟读页加入临时 CC0 demo 视频，用于验证播放器和学习流程。
- Tips 从学习建议卡片升级为“视频列表 + 单词 / 短语 / 地道表达”的表达库工作台。
- 项目从纯静态站升级为 Node Web Service：`server.js` 提供静态文件、`/api/health`、`/api/ai/chat` 和 `/api/ai/debug`。
- AI 后端支持 provider 切换：默认 `AI_PROVIDER=minimax`，读取 `MINIMAX_API_KEY` 调用 MiniMax；保留 OpenAI 备用配置。
- Render 部署说明、技术方案、视觉规范和项目 brief 已同步当前实现。
- 当前线上排查结论：Render 服务和后端路由可用；MiniMax 返回 `invalid api key (2049)` 时，需要在 Render 中替换有效 MiniMax API Key。

## 收尾检查建议

1. 打开首页测试视频筛选、收藏和导航。
2. 打开 `learn.html?video=meeting-follow-up`，确认 demo 视频可加载，句子点击和跟读/打卡记录可更新。
3. 打开 Tips，确认左侧视频列表、表达类型 tab、筛选 chip 和隐藏中文可用。
4. 打开 AI陪练页，确认本地模拟可用。
5. 打开 `/api/health`，确认返回 `ok: true`、`provider: minimax`，并检查 `aiConfigured`。
6. 打开 `/api/ai/debug`，用固定句测试后端 provider；如果返回 `invalid api key (2049)`，替换 Render 中的 `MINIMAX_API_KEY`。
7. 用 GitHub Desktop 提交并推送，再在 Render 部署最新 commit。

## GitHub Desktop 操作

如果命令行 Git 不可用，用 GitHub Desktop 完成：

1. 确认当前仓库是 `speakflow`。
2. 查看左侧 Changes。
3. Summary 填写：`Release v0.1.3 AI learning prototype`
4. 点击 `Commit to main`。
5. 点击 `Push origin`。
