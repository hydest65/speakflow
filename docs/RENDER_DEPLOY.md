# SpeakFlow Render 部署说明

## 当前项目类型

SpeakFlow 当前已升级为 Node Web Service：

- HTML
- CSS
- JavaScript
- 本地图片资源
- Node.js `server.js`
- `/api/ai/chat` AI 后端代理

这样可以把 OpenAI API Key 放在服务端环境变量中，避免暴露在浏览器代码里。

## Render 配置

项目根目录包含：

```text
render.yaml
```

配置含义：

- `env: node`：按 Node Web Service 部署。
- `buildCommand: "npm install"`：安装 Node 项目。
- `startCommand: "npm start"`：启动 `server.js`。
- `OPENAI_MODEL: gpt-5-mini`：默认 AI 模型。
- `OPENAI_API_KEY`：需要在 Render Dashboard 里手动填写，不要提交到代码仓库。
- `pullRequestPreviewsEnabled: true`：后续接 GitHub PR 时可以生成预览。

## OpenAI 环境变量

在 Render Dashboard 中打开当前服务：

1. 点击 Environment。
2. 添加 `OPENAI_API_KEY`。
3. Value 填你的 OpenAI API Key。
4. 保存并重新部署。

如果没有配置 `OPENAI_API_KEY`，AI 陪练页会自动回退到本地模拟回复，不会影响页面测试。

本地或团队协作时可以参考：

```text
.env.example
```

不要把真实 `.env` 或 API Key 提交到代码仓库。

## 推荐上线步骤

1. 用 GitHub Desktop 确认当前文件夹是 `speakflow` 仓库。
2. 提交并推送到 GitHub。
3. 打开 Render。
4. New + 选择 Web Service。
5. 选择 GitHub 仓库。
6. Render 读取 `render.yaml`。
7. 在 Environment 里填写 `OPENAI_API_KEY`。
8. 部署完成后，打开 Render 提供的外网 URL 测试。

## 测试重点

- 首页 `index.html` 能打开。
- 顶部导航能跳转到收藏夹、Tips、AI陪练、会员。
- `styles.css` 正常加载。
- `app.js` 正常加载。
- `assets/` 下资源正常加载。
- `POST /api/ai/chat` 能返回 AI 回复；如果 Key 未配置，应返回 fallback 并由前端使用本地模拟。

## 部署后测试顺序

1. 打开 Render 提供的外网 URL，确认首页能访问。
2. 打开 `/api/health`，确认返回 `ok: true`。
3. 检查 `/api/health` 里的 `aiConfigured`：
   - `false`：说明还没有配置 `OPENAI_API_KEY`，AI 页会使用本地模拟。
   - `true`：说明服务端已读取到 Key。
4. 打开 AI陪练页，输入一句英文并发送。
5. 查看右侧提示：
   - 显示“当前使用真实 AI”：说明 OpenAI 接通。
   - 显示“当前使用本地模拟”：说明后端不可用、Key 未配置，或 OpenAI 请求失败。
