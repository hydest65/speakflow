# 视频字幕解析与 AI 批注系统设计

## 1. 项目架构

### MVP 架构

当前最小可运行版本沿用 SpeakFlow 现有结构：

- 前端：`subtitle-lab.html` + `subtitle-lab.js` + `styles.css`
- 后端：`server.js`
- 本地数据：`data/subtitle-jobs.json`
- 视频预览：浏览器本地 `File` 对象或直链视频 URL
- 字幕生成：视频直链可走真实 FFmpeg + OpenAI transcription；粘贴英文稿时走手动稿件切分
- AI 批注：优先调用真实 AI；批注失败时保留字幕并给出可手动补充的备注
- 导出：Markdown、Word、SRT、VTT、JSON

这样可以先验证完整产品闭环：选择本地视频或输入视频链接、生成字幕、点击字幕跳转、编辑字幕/备注、导出学习资料。

### 正式版架构

```text
Web App (Next.js + React + Tailwind)
  |
  | upload video / edit cue / export
  v
API Server (Node.js 或 FastAPI)
  |
  | create job
  v
Queue (BullMQ 或 Celery)
  |
  | step 1: FFmpeg extract audio
  | step 2: Whisper/faster-whisper/OpenAI transcription
  | step 3: normalize SRT/VTT/JSON cues
  | step 4: AI annotations per cue
  | step 5: persist and notify
  v
PostgreSQL + Object Storage
```

推荐正式技术栈：

- 前端：Next.js App Router、React、Tailwind CSS
- 后端：Node.js API routes + BullMQ，或 Python FastAPI + Celery
- 视频处理：FFmpeg
- 语音识别：OpenAI transcription API 起步，长视频或成本优化后迁移 faster-whisper
- 数据库：PostgreSQL
- 文件存储：本地开发用 `uploads/`，生产用 S3/R2
- 队列：BullMQ + Redis 或 Celery + Redis

## 2. 数据库设计

### users

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | uuid | 用户 ID |
| email | text | 登录邮箱 |
| name | text | 用户昵称 |
| created_at | timestamptz | 创建时间 |

### videos

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | uuid | 视频 ID |
| user_id | uuid | 上传者 |
| title | text | 视频标题 |
| original_filename | text | 原文件名 |
| source_url | text | 外部视频链接，可为空 |
| source_type | text | upload / url |
| storage_key | text | 视频对象存储路径 |
| duration_seconds | numeric | 视频时长 |
| status | text | uploaded / processing / completed / failed |
| created_at | timestamptz | 创建时间 |
| updated_at | timestamptz | 更新时间 |

### processing_jobs

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | uuid | 任务 ID |
| video_id | uuid | 关联视频 |
| type | text | extract_audio / transcribe / annotate / export |
| status | text | queued / running / completed / failed |
| progress | integer | 0-100 |
| error_message | text | 失败信息 |
| started_at | timestamptz | 开始时间 |
| finished_at | timestamptz | 结束时间 |

### subtitle_cues

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | uuid | 字幕 ID |
| video_id | uuid | 关联视频 |
| cue_index | integer | 排序 |
| start_seconds | numeric | 开始时间 |
| end_seconds | numeric | 结束时间 |
| text | text | 原文字幕 |
| source | text | whisper / manual / import |
| created_at | timestamptz | 创建时间 |
| updated_at | timestamptz | 更新时间 |

### cue_annotations

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | uuid | 批注 ID |
| cue_id | uuid | 关联字幕 |
| translation | text | 中文翻译 |
| vocabulary | jsonb | 重点词汇 |
| grammar | text | 语法说明 |
| speaking | text | 口语表达说明 |
| shadowing | text | 跟读建议 |
| model | text | 使用的 AI 模型 |
| updated_by | text | ai / user |
| created_at | timestamptz | 创建时间 |
| updated_at | timestamptz | 更新时间 |

### exports

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | uuid | 导出 ID |
| video_id | uuid | 关联视频 |
| format | text | markdown / docx / srt / vtt / json |
| storage_key | text | 导出文件路径 |
| created_at | timestamptz | 创建时间 |

## 3. API 设计

### 视频与任务

- `POST /api/videos`
  - 上传视频或提交视频链接，创建 `videos` 记录。
  - 返回：`video_id`、`upload_url` 或直接返回任务信息。

- `POST /api/videos/:videoId/process`
  - 创建处理任务。
  - 后台执行：提取音频、识别字幕、AI 批注。

- `GET /api/jobs/:jobId`
  - 查询处理状态、进度和错误信息。

### 字幕与批注

- `GET /api/videos/:videoId/cues`
  - 获取字幕和备注列表。

- `PUT /api/cues/:cueId`
  - 手动编辑字幕文本、开始时间、结束时间。

- `PUT /api/cues/:cueId/annotation`
  - 手动编辑中文翻译、词汇、语法、口语说明、跟读建议。

- `POST /api/cues/:cueId/annotation/regenerate`
  - 重新生成单条字幕的 AI 批注。

### 导出

- `GET /api/videos/:videoId/export?format=markdown`
- `GET /api/videos/:videoId/export?format=docx`
- `GET /api/videos/:videoId/export?format=srt`
- `GET /api/videos/:videoId/export?format=vtt`
- `GET /api/videos/:videoId/export?format=json`

## 4. 当前 MVP

已实现页面：

- `subtitle-lab.html`

已实现接口：

- `POST /api/subtitle/jobs`
- `GET /api/subtitle/diagnostics`
- `GET /api/subtitle/jobs/:jobId`
- `PUT /api/subtitle/jobs/:jobId/cues/:cueId`
- `GET /api/subtitle/jobs/:jobId/export?format=markdown|doc|srt|vtt|json`

MVP 使用方式：

1. 启动服务：`npm start`
2. 打开：`http://localhost:3000/subtitle-lab.html`
3. 输入一个可直接播放的视频链接，或选择本地视频文件。
4. 可选：粘贴英文稿；如果输入视频链接且不粘贴英文稿，后端会尝试真实下载视频、提取音频并语音识别。
5. 点击“生成字幕与批注”。
6. 点击某条时间轴，视频跳到对应时间。
7. 编辑字幕或备注，点击“保存本条”。
8. 点击导出按钮下载目标格式。

真实直链处理需要环境配置：

- `OPENAI_API_KEY`：语音识别和 AI 批注。
- `OPENAI_TRANSCRIBE_MODEL`：默认 `whisper-1`。
- `FFMPEG_PATH`：默认使用系统 `ffmpeg`。
- `VIDEO_MAX_BYTES`：默认约 120MB。
- `SUBTITLE_MAX_CUES`：默认最多批注前 40 条字幕。

页面会调用 `GET /api/subtitle/diagnostics` 检查真实解析是否就绪。如果 FFmpeg 或 `OPENAI_API_KEY` 缺失，页面会显示“真实直链解析待配置”，但仍可通过粘贴英文稿测试字幕编辑和导出。

## 5. 下一步实现顺序

1. 接入真实文件上传，保存到 `uploads/videos` 或对象存储。
2. 接入视频链接解析器：直链视频直接下载，公开视频页面可用 yt-dlp 或平台 API 获取媒体流。
3. 后端调用 FFmpeg 提取音频。
4. 接入 Whisper/faster-whisper/OpenAI transcription，生成真实 SRT/VTT/JSON。
5. 加入任务队列和进度轮询。
6. 把本地 JSON 存储迁移到 PostgreSQL。
7. 将 Word 导出从 HTML `.doc` 升级为真实 `.docx`。
8. 加入用户登录、权限隔离和历史任务列表。
