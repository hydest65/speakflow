# SpeakFlow 视觉与样式标准

## 1. 视觉方向

SpeakFlow 当前采用现代 SaaS 工具型工作台风格，不沿用传统培训机构广告页，也不做儿童英语风格。

关键词：

- 冷静
- 简洁
- 工具感
- 成人学习者友好
- 中英混合
- 真实视频学习感

避免：

- 大面积营销文案
- 过度装饰
- 单一浅绿色学习 App 风格
- 首屏做成宣传落地页

## 2. 导航

顶部导航固定顺序：

1. 视频库
2. 收藏夹
3. Tips
4. AI陪练
5. 会员

导航使用紧凑 segmented nav。当前页使用深蓝到亮蓝渐变实底，非当前页使用浅灰蓝底。

## 3. 品牌 LOGO

当前导航 LOGO 使用 HTML/CSS 绘制的小型品牌标识：

- 左侧 `logo-mark`：深蓝、亮蓝、青色渐变播放图标。
- 右侧 `logo-type`：`SpeakFlow` 字标和 `Real Video Speaking Lab` 副标题。

`assets/speakflow-logo.png` 作为品牌参考图保留，但不是当前导航里的 LOGO。

## 4. 色彩

核心变量：

```css
--bg: #f7f9fc;
--surface: #ffffff;
--surface-soft: #f2f6fb;
--ink: #102033;
--muted: #6b7a90;
--line: #dfe7f0;
--blue: #0b2d67;
--blue-2: #1769d2;
--cyan: #18c9bc;
```

深蓝用于品牌、当前导航、主按钮和重要数据。亮蓝用于操作强调和 AI 评分重点。青色用于辅助强调和正向反馈。背景使用冷白和浅灰蓝。

## 5. 页面规则

视频库是默认入口，应像学习资源工作台，优先展示状态、任务、推荐、筛选和视频卡片。

收藏夹保持轻量，只展示收藏视频。

Tips 采用“左侧视频列表 + 右侧表达库”的工作台结构，表达库分为单词、短语、地道表达，并支持中文显示切换。

AI陪练使用对话工作台布局：左侧场景，中间对话，右侧评分和建议。

会员页同时展示学习记录和年度会员权益。

跟读训练页使用三栏结构：左侧视频，中间逐句字幕，右侧跟读和 AI 评分。

## 6. 0.1.4 视觉补充

- 首页 TED 视频卡使用静态封面，不显示播放三角，避免让用户误以为可在卡片内播放。
- 首页封面显示讲演人、主题词、时长和卡通式讲演人头像；头像不使用真实人物照片。
- 视频库桌面端一行显示 4 个视频预览窗口。
- 学习页当前按参考截图方向改为双栏沉浸式布局：左侧视频和简介，右侧动态字幕。
- 学习页隐藏全局顶部导航，减少沉浸学习时的干扰。
- 动态字幕栏应保持可滚动、卡片式、行距紧凑，并预留收藏星标和自动滚动控制。
## 7. 0.1.5 Subtitle Lab visual rules

- The subtitle lab should feel like a production workbench, not a marketing page.
- Keep the first screen focused on input, environment readiness, video preview, subtitle list, and export actions.
- Use compact panels with 8px radius, clear status chips, and editable text areas that do not shift layout while typing.
- The environment diagnostics block should use warm warning colors when setup is incomplete and green confirmation when real direct-link parsing is ready.

## 8. 0.2.0 data learning page layout rules

- Until the final visual style is chosen, keep `api-learn.html` utilitarian and information-dense.
- Keep the video on the left, scrollable subtitles on the right, and close-reading cards below the video.
- Reduce title and panel chrome sizes so video, subtitles, and cards get most of the viewport.
- Avoid decorative sections on learning pages; controls should support repeated study rather than marketing presentation.
