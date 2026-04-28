# SpeakFlow 版本收尾

## 当前版本

```text
0.1.4
```

版本日期：2026-04-28

版本性质：TED 素材首页与学习页体验打磨版。重点保留首页 8 个 TED 语言学习素材、视频封面工作台体验，并将学习页重排为参考截图方向的“视频 + 动态字幕”双栏布局。

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

- 首页视频库保留为 8 个 TED 语言学习相关素材。
- 首页视频卡片改为一行 4 个视频预览窗口。
- TED 视频封面从播放器预览改为静态封面，去掉播放三角。
- TED 封面显示讲演人、主题词、不同颜色和卡通式讲演人头像，避免依赖真实人物照片版权。
- 学习页多次重排后，当前方向改为参考截图的双栏工作台：左侧视频和简介，右侧动态字幕。
- 学习页隐藏全局顶部导航，改用视频卡内部返回入口。
- 动态字幕区增加工具栏、字幕列表和浮动“自动”按钮。
- AI API 暂停继续调试，保留本地模拟和后端 provider 结构。
- 增加本地 WebVTT 字幕加载和解析的实验性管线：`subtitleUrl`、`parseVtt()`、`hydrateSubtitles()`、`subtitles/ted-learn-language.vtt`。
- 服务端增加 `.vtt` 的 `text/vtt; charset=utf-8` 静态类型支持。

## 已知问题

- 字幕解析和字幕来源策略尚未定稿。当前 VTT 文件只用于验证动态字幕栏体验，下一轮准备推倒重做字幕数据规范。
- TED 内容用于原型验证时应继续使用官方嵌入链接和来源说明；正式商业化前需要确认 TED 内容和字幕授权。
- 真实 AI API 暂停部署；MiniMax Key 问题不在本版继续处理。
- 本地服务如果是旧进程，`.vtt` 的 Content-Type 可能仍显示为 `application/octet-stream`；重启服务后会应用新的 `text/vtt` 配置。

## 收尾检查建议

1. 打开首页，确认 8 个 TED 视频卡一行 4 个、封面无播放三角、显示讲演人和卡通头像。
2. 打开 `learn.html?video=ted-learn-language`，确认学习页是左视频、右动态字幕双栏布局。
3. 确认动态字幕列表可以滚动，且页面不再显示逐词精读面板。
4. 打开 `subtitles/ted-learn-language.vtt`，确认本地字幕文件可访问。
5. 打开 `/api/health`，确认服务仍返回 `ok: true`。
6. 用 GitHub Desktop 提交并推送。

## GitHub Desktop 操作

如果命令行 Git 不可用，用 GitHub Desktop 完成：

1. 确认当前仓库是 `speakflow`。
2. 查看左侧 Changes。
3. Summary 填写：

```text
Release v0.1.4 TED learning layout prototype
```

4. 点击 `Commit to main`。
5. 点击 `Push origin`。
