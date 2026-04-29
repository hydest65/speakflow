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

1. 首页
2. 视频库
3. 收藏夹
4. 学习卡片
5. AI陪练
6. 学员信息 / 会员

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

首页是默认入口，应表达安静、平和、低压力的学习氛围，优先展示学习入口、进度、成就、打卡动力和少量文字型新上内容。
视频库是分支页面，应像学习资源工作台，承载搜索、筛选和视频卡片。

收藏夹保持轻量，只展示收藏视频。

Tips 采用“左侧视频列表 + 右侧表达库”的工作台结构，表达库分为单词、短语、地道表达，并支持中文显示切换。

AI陪练使用对话工作台布局：左侧场景，中间对话，右侧评分和建议。

会员页同时展示学习记录和年度会员权益。

跟读训练页使用三栏结构：左侧视频，中间逐句字幕，右侧跟读和 AI 评分。

## 6. 0.1.4 视觉补充

- 首页不显示 TED 视频卡、视频窗口、视频缩略图或播放控件。
- 视频库桌面端可以显示视频卡片；首页只显示文字型新上内容。
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

## 9. SaaS style selection board

`style-lab.html` is the current visual selection board for SpeakVlog/SpeakFlow.
Use it to decide the preferred product feeling before applying broad UI changes
to the main pages.

Current preferred direction:

- Modern SaaS product language.
- White or near-white background: `#F8FAFC`.
- White cards with subtle shadow:
  `0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)`.
- Blue primary color: `#3B82F6`.
- Indigo secondary accent: `#6366F1`.
- Slate gray support text: `#94A3B8` or nearby accessible gray.
- Primary buttons use a blue-to-indigo gradient with a restrained glow shadow.
- Tags use a light blue background and blue text.
- Rounded corners stay around 12px to 16px for cards and controls.

Decision questions:

- Would the founder want to open this interface every day?
- Does it feel like an adult learning product, not a childish training-school page?
- Are video, subtitles, shadowing, AI feedback, and membership value immediately clear?
- Does the interface feel trustworthy enough to charge for?

## 10. Homepage and branch-page information architecture

The homepage should create a quiet, calm, low-pressure learning mood. It should
not behave like the video library.

Homepage rules:

- No video player, video window, embedded video frame, or large video preview on the homepage.
- First screen focuses on a calm learning invitation, one primary "start learning" path, and one secondary path to browse videos.
- Show lightweight learner information, daily rhythm, and a small text-only list of new lessons.
- Use whitespace, short copy, soft borders, and restrained blue accents.

Branch-page rules:

- `library.html` owns the full video library, filters, video cards, and search.
- `favorites.html` owns saved videos.
- `tips.html` owns learning cards for words, phrases, and natural expressions.
- `learn.html` owns the immersive video/subtitle/shadowing experience.
- `ai.html` owns scenario conversation practice.

Selected homepage layout:

- Use Option B, the calm split entrance.
- Left side owns the quiet learning invitation and primary start button.
- Right side owns learner progress, weekly goal, and small achievement data.
- Below the first screen, show only three small cards: today's lesson, one tip, and one check-in motivation.
- New lessons appear as text-only rows, with no video window or thumbnail preview.
- The homepage navigation should stay focused on branch pages: video library, favorites, learning cards, and learner information.
