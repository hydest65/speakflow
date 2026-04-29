# SpeakFlow 技术方案

## 1. 当前阶段

当前项目是静态前端原型，使用：

- HTML
- CSS
- JavaScript 数据驱动渲染
- Node.js 后端代理
- 本地图片资源
- 模拟数据

目标是先验证信息架构、页面布局和核心学习流程。

## 2. 当前页面

```text
index.html       视频库
favorites.html   收藏夹
tips.html        Tips
ai.html          AI陪练
pricing.html     会员 + 学习记录
learn.html       视频跟读训练页
styles.css       全局样式
app.js           视频数据、筛选、收藏、学习进度、AI 陪练模拟、收藏夹渲染和字幕点击高亮交互
server.js        静态文件服务和 OpenAI API 后端代理
package.json     Node 启动脚本
.env.example     本地环境变量模板，不包含真实密钥
assets/          Logo 和图片资源
docs/            项目文档
references/      轻量项目记忆和收尾流程
```

## 3. 页面职责

视频库负责今日学习状态、今日任务、推荐视频、视频筛选和视频卡片。

收藏夹负责展示已收藏视频、进入对应学习页，并提供空状态引导。

Tips 负责展示真实视频学习方法。

AI陪练负责展示场景列表、对话区、输入入口、评分和建议。

AI 陪练优先调用 `/api/ai/chat`。后端通过 `AI_PROVIDER` 选择模型供应商：默认 `minimax`，读取 `MINIMAX_API_KEY` 并调用 MiniMax OpenAI-compatible Chat Completions；也保留 `openai` 作为备用。若后端不可用或 Key 未配置，前端自动回退到本地模拟回复。

后端还提供 `GET /api/health`，用于部署后检查服务是否可访问，以及当前 provider 是否配置了 API Key。

会员页负责展示学习记录、年度会员权益和开通入口。

跟读训练页负责展示视频、逐句字幕、跟读录音入口、AI 评分和重点表达。

## 4. 后续数据模型

```ts
type Video = {
  id: string;
  title: string;
  description: string;
  sourceType: "vlog" | "interview" | "workplace" | "ai-dialogue";
  topic: "daily" | "workplace" | "travel" | "interview" | "vlog";
  difficulty: "beginner" | "intermediate" | "advanced";
  durationSeconds: number;
  thumbnailUrl: string;
  videoUrl: string;
  isFavorite: boolean;
};

type Sentence = {
  id: string;
  videoId: string;
  startTime: number;
  endTime: number;
  english: string;
  chinese: string;
  keywords: string[];
  expressionNote?: string;
};
```

## 5. 推荐升级路线

阶段 1：静态原型增强。

- 用本地 JS 数据驱动视频列表。已完成第一版。
- 用 `localStorage` 保存收藏视频。已完成第一版。
- 用 `localStorage` 保存打卡状态。开发中。
- 用模拟数据展示 AI 评分。已用于跟读和 AI 陪练原型。

阶段 2：React 应用化。

- Vite + React。
- TypeScript。
- 组件化导航、视频卡片、字幕列表、AI 对话、会员记录。

阶段 3：后端产品化。

- 视频、收藏、录音、AI 评分、学习进度和支付 API。AI 后端代理已完成第一版。
- 用户登录和会员权限。

## 6. 0.1.4 技术状态补充

- `videos` 数据当前通过 `tedLanguageVideos` 覆盖首页素材，用于展示 8 个 TED 语言学习视频。
- 学习页支持 `subtitleUrl` 字段，并通过 `fetch()` 加载本地 `.vtt` 文件。
- `parseVtt()` 会将 WebVTT cue 转换为 `{ start, end, english, chinese, note }` 字幕数据。
- `hydrateSubtitles()` 会在学习页初始渲染后异步替换动态字幕栏；加载失败时回退到内置 `sentences`。
- `server.js` 已增加 `.vtt` 的 `text/vtt; charset=utf-8` 静态资源类型。
- 字幕管线仍为实验性实现。下一轮应先定义统一字幕数据模型，再决定手工录入、VTT/SRT 导入或后端解析。

## 7. Subtitle data model

The learning page now normalizes inline `sentences` and parsed VTT cues through
one frontend cue model before rendering. The current normalized fields are:

```ts
type SubtitleCue = {
  id: string;
  videoId: string;
  index: number;
  startSeconds: number;
  endSeconds: number;
  start: string;
  end: string;
  english: string;
  chinese: string;
  note: string;
  keywords: string[];
  source: "inline" | "vtt" | "srt" | "api";
};
```

See `docs/SUBTITLE_DATA.md` for the field rules and VTT mapping. The next step is
to choose the production subtitle source format, then add validation before
larger subtitle batches are imported.
## 8. 0.1.5 Subtitle AI Lab

- `subtitle-lab.html` and `subtitle-lab.js` add a subtitle annotation workbench for direct video links, local video preview, manual transcript mode, cue editing, and export.
- `server.js` now exposes `/api/subtitle/jobs`, `/api/subtitle/jobs/:jobId`, `/api/subtitle/jobs/:jobId/cues/:cueId`, `/api/subtitle/jobs/:jobId/export`, and `/api/subtitle/diagnostics`.
- Direct video-link mode is designed to download the video, extract audio through FFmpeg, call OpenAI audio transcription, normalize timestamped cues, and generate cue-level learning notes.
- Manual transcript mode remains available for fast UI testing and for videos where the user already has an English transcript.
- Generated job data is stored in local JSON for the MVP. Production should move this to PostgreSQL and queue long-running jobs with BullMQ or Celery.
- `docs/VIDEO_SUBTITLE_AI_SYSTEM.md` is the detailed architecture source for database tables, API shape, and the migration path to a production subtitle pipeline.
