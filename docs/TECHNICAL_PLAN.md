# SpeakFlow 技术方案

## 1. 当前阶段

当前项目是静态前端原型，使用：

- HTML
- CSS
- JavaScript
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
app.js           字幕点击高亮交互
assets/          Logo 和图片资源
docs/            项目文档
```

`courses.html` 和 `profile.html` 已从主结构移除。学习记录合并到会员页。

## 3. 页面职责

### 视频库

入口页，负责：

- 今日学习状态。
- 今日任务。
- 今日推荐视频。
- 视频筛选。
- 视频卡片列表。

### 收藏夹

负责：

- 展示收藏视频。
- 进入对应学习页。
- 引导回视频库。

### Tips

负责：

- 展示真实视频学习方法。
- 引导进入跟读训练。

### AI陪练

负责：

- 展示场景列表。
- 展示对话区。
- 提供文字和语音输入入口。
- 展示表达完整度评分和建议。

### 会员

负责：

- 展示学习记录。
- 展示年度会员权益。
- 引导开通年度会员。

### 跟读训练页

负责：

- 播放视频。
- 展示逐句字幕。
- 点击字幕高亮。
- 展示跟读录音入口。
- 展示 AI 评分和建议。

## 4. 后续数据模型

### Video

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
```

### Sentence

```ts
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

### AiScenario

```ts
type AiScenario = {
  id: string;
  title: string;
  userRole: string;
  aiRole: string;
  openingMessage: string;
  difficulty: "beginner" | "intermediate" | "advanced";
};
```

### UserProgress

```ts
type UserProgress = {
  streakDays: number;
  totalLearningDays: number;
  completedVideoCount: number;
  averageAiScore: number;
  recentLearningItems: string[];
  weeklyReport: string;
};
```

## 5. 推荐升级路线

### 阶段 1：静态原型增强

- 用本地 JS 数据驱动视频列表。
- 用 localStorage 保存收藏视频。
- 用 localStorage 保存打卡状态。
- 用模拟数据展示 AI 评分。

### 阶段 2：React 应用化

推荐：

- Vite + React。
- TypeScript。
- 组件化导航、视频卡片、字幕列表、AI 对话、会员记录。

### 阶段 3：后端产品化

推荐接口：

- `GET /api/videos`
- `GET /api/videos/:id`
- `GET /api/videos/:id/sentences`
- `GET /api/favorites/videos`
- `POST /api/favorites/videos`
- `DELETE /api/favorites/videos/:videoId`
- `POST /api/recordings`
- `POST /api/speaking-score`
- `GET /api/progress`
- `GET /api/ai/scenarios`
- `POST /api/ai/messages`
- `POST /api/checkout/yearly`

## 6. 开发优先级

P0：

- 新导航结构。
- 视频库、收藏夹、Tips、AI陪练、会员页面可访问。
- 学习记录并入会员页。
- 跟读页三栏结构。

P1：

- 收藏视频可交互。
- 视频筛选可交互。
- 今日任务进度可交互。
- 打卡状态可保存。

P2：

- 录音上传。
- AI 评分。
- AI 对话。
- 登录。
- 年度会员支付。

