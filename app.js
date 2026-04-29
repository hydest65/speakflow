const FAVORITES_KEY = "speakflow_favorite_videos";
const PROGRESS_KEY = "speakflow_learning_progress";
const AI_SESSION_KEY = "speakflow_ai_session";

const videos = [
  {
    id: "notion-test-001",
    title: "Notion 外部测试视频 01",
    description: "测试阶段使用本地视频文件验证播放、字幕条和精读信息流程，素材来源记录保留在原始链接字段中。",
    source: "Local test video",
    sourceType: "external-link",
    topic: "daily",
    topicLabel: "外部测试",
    difficulty: "intermediate",
    difficultyLabel: "中级",
    durationMinutes: 1,
    date: "2026/4/29",
    thumb: "external",
    videoUrl: "Video/RPReplay_Final1713515371.mp4",
    sourceUrl: "https://file.notion.so/f/f/d45aa900-2c78-46ff-9f54-f9c5fba62551/a78b2389-a7ae-45ac-9c47-0b7e79779d41/RPReplay_Final1713515371.mov?table=block&id=23ad8a19-1e07-48e3-a0bf-2fee20b03d5b&spaceId=d45aa900-2c78-46ff-9f54-f9c5fba62551&expirationTimestamp=1777492800000&signature=VF7tj71YfJgmqN5HrnhCD-1of4hLTNFRLm10YXdiAg4",
    videoType: "video/mp4",
    demoNote: "本地测试素材：当前播放已转码的 MP4 文件，避免 Notion 签名链接过期或 MOV 编码兼容问题。",
    featured: true,
    sentences: [
      { english: "This is the first external test video.", chinese: "这是第一个外部链接测试视频。", note: "占位字幕：等拿到原始字幕后替换为真实句子。" },
      { english: "We are testing playback, subtitles, and close reading notes.", chinese: "我们正在测试播放、字幕和精读信息。", note: "占位精读：用于先验证页面流程。" },
      { english: "The final version should use authorized or owned content.", chinese: "正式版本应使用自有或已授权内容。", note: "内容策略提醒：链接引用不等于获得商用授权。" }
    ]
  }
];


const aiScenarios = [
  {
    id: "coffee",
    title: "咖啡店点单",
    meta: "初级 · 5分钟",
    goal: "完成一次自然点单",
    guidance: "说出饮品、冷热、尺寸，并回应店员追问。",
    opening: "Hi! What can I get for you today?",
    prompts: [
      "Sure. Would you like it hot or iced?",
      "What size would you like?",
      "Would you like that for here or to go?",
      "Great. Can I get your name for the order?"
    ],
    keywords: ["coffee", "latte", "iced", "hot", "medium", "small", "large", "to go", "please"],
    suggestion: "可以补充饮品尺寸和冷热，例如 “Can I get a medium iced latte to go?”"
  },
  {
    id: "hotel",
    title: "酒店入住",
    meta: "初级 · 6分钟",
    goal: "完成入住确认",
    guidance: "说明预订、姓名、房型，并礼貌询问早餐或退房时间。",
    opening: "Good evening. Welcome to SpeakFlow Hotel. Do you have a reservation?",
    prompts: [
      "May I have your name, please?",
      "Would you prefer a room on a higher floor?",
      "Breakfast is served from 7 to 10. Do you need anything else?",
      "Your room is ready. Could you confirm your email address?"
    ],
    keywords: ["reservation", "name", "room", "breakfast", "check-in", "passport", "please"],
    suggestion: "入住场景里可以主动说 “I have a reservation under...” 来表达更完整。"
  },
  {
    id: "meeting",
    title: "英文会议接话",
    meta: "中级 · 8分钟",
    goal: "完成一次会议回应",
    guidance: "练习确认信息、表达赞同、补充观点或提出顾虑。",
    opening: "Before we move on, what do you think about the timeline?",
    prompts: [
      "That makes sense. Could you explain your main concern?",
      "How would you suggest we adjust the plan?",
      "Can you summarize the next step?",
      "Would you be comfortable sharing that with the team?"
    ],
    keywords: ["timeline", "concern", "agree", "suggest", "next step", "plan", "numbers"],
    suggestion: "会议回应可以用 “That makes sense, but I have one concern...” 更自然地接话。"
  },
  {
    id: "interview",
    title: "面试自我介绍",
    meta: "中级 · 8分钟",
    goal: "完成一段清晰自我介绍",
    guidance: "介绍背景、经验、优势，并把回答落到岗位相关能力。",
    opening: "Thanks for coming in today. Could you briefly introduce yourself?",
    prompts: [
      "What project are you most proud of?",
      "How do you usually handle pressure at work?",
      "Why are you interested in this role?",
      "What would you like to improve next?"
    ],
    keywords: ["experience", "project", "team", "role", "strength", "learn", "improve"],
    suggestion: "面试回答建议包含背景、具体项目和你能带来的价值。"
  }
];

let activeAiScenarioId = "coffee";
let aiMessages = [];
let activeTipsVideoId = "notion-test-001";
let activeExpressionTab = "words";
let activeExpressionFilter = "all";
let tipsChineseVisible = true;

const expressionLibrary = {
  "notion-test-001": {
    summary: "外部链接测试视频，先用占位精读内容验证字幕、词汇和表达卡片流程。",
    words: [
      { term: "external", phonetic: "/ɪkˈstɜːrnəl/", cn: "外部的", en: "outside; linked from another source", example: "This is the first external test video.", exampleCn: "这是第一个外部链接测试视频。", status: "unmarked" },
      { term: "playback", phonetic: "/ˈpleɪbæk/", cn: "播放", en: "video or audio playing", example: "We are testing playback, subtitles, and close reading notes.", exampleCn: "我们正在测试播放、字幕和精读信息。", status: "unmarked" }
    ],
    phrases: [
      { term: "test video", phonetic: "", cn: "测试视频", en: "a video used to validate a feature", example: "This is the first external test video.", exampleCn: "这是第一个外部链接测试视频。" },
      { term: "close reading notes", phonetic: "", cn: "精读笔记", en: "detailed learning notes for a line or expression", example: "We are testing playback, subtitles, and close reading notes.", exampleCn: "我们正在测试播放、字幕和精读信息。" }
    ],
    native: [
      { term: "The final version should use...", cn: "正式版本应使用……", en: "A clear way to state a future product rule.", example: "The final version should use authorized or owned content.", exampleCn: "正式版本应使用自有或已授权内容。" }
    ]
  }
};

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

function getAiSession() {
  try {
    return JSON.parse(localStorage.getItem(AI_SESSION_KEY)) || {};
  } catch {
    return {};
  }
}

function setAiSession(session) {
  localStorage.setItem(AI_SESSION_KEY, JSON.stringify(session));
}

function getScenarioById(scenarioId) {
  return aiScenarios.find((scenario) => scenario.id === scenarioId) || aiScenarios[0];
}

function getScenarioMessages(scenarioId) {
  const session = getAiSession();
  const scenario = getScenarioById(scenarioId);
  return session[scenarioId] || [{ role: "ai", text: scenario.opening }];
}

function saveScenarioMessages(scenarioId, messages) {
  const session = getAiSession();
  session[scenarioId] = messages;
  setAiSession(session);
}

function setFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getProgress() {
  const defaults = {
    practicedSentences: {},
    shadowingCounts: {},
    aiScores: [],
    aiPracticeCounts: {},
    aiScenarioHistory: [],
    completedVideos: [],
    checkins: [],
    recentLearning: []
  };

  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(PROGRESS_KEY)) };
  } catch {
    return defaults;
  }
}

function setProgress(progress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function unique(values) {
  return [...new Set(values)];
}

function recordSentencePractice(videoId, sentenceIndex) {
  const progress = getProgress();
  const date = todayKey();
  const current = progress.practicedSentences[date] || [];
  progress.practicedSentences[date] = unique([...current, `${videoId}:${sentenceIndex}`]);
  setProgress(progress);
}

function recordShadowing(videoId) {
  const progress = getProgress();
  const date = todayKey();
  progress.shadowingCounts[date] = (progress.shadowingCounts[date] || 0) + 1;
  progress.aiScores = [...progress.aiScores, { date, source: "shadowing", videoId, score: 82 }].slice(-30);
  setProgress(progress);
}

function recordAiPractice(scenario, score) {
  const progress = getProgress();
  const date = todayKey();
  progress.aiPracticeCounts[date] = (progress.aiPracticeCounts[date] || 0) + 1;
  progress.aiScores = [...progress.aiScores, { date, source: "ai-practice", scenarioId: scenario.id, score }].slice(-30);
  progress.aiScenarioHistory = [
    { date, scenarioId: scenario.id, title: scenario.title, score },
    ...progress.aiScenarioHistory
  ].slice(0, 8);
  progress.recentLearning = [
    { date, videoId: `ai-${scenario.id}`, title: `AI陪练：${scenario.title}` },
    ...progress.recentLearning.filter((item) => item.videoId !== `ai-${scenario.id}`)
  ].slice(0, 5);
  setProgress(progress);
}

function completeCheckin(video) {
  const progress = getProgress();
  const date = todayKey();
  progress.checkins = unique([...progress.checkins, date]).sort();
  progress.completedVideos = unique([...progress.completedVideos, video.id]);
  progress.recentLearning = [
    { date, videoId: video.id, title: video.title },
    ...progress.recentLearning.filter((item) => item.videoId !== video.id)
  ].slice(0, 5);
  setProgress(progress);
}

function getTodayProgress() {
  const progress = getProgress();
  const date = todayKey();
  return {
    sentenceCount: (progress.practicedSentences[date] || []).length,
    shadowingCount: progress.shadowingCounts[date] || 0,
    aiPracticeCount: progress.aiPracticeCounts[date] || 0,
    hasAiScore: progress.aiScores.some((item) => item.date === date),
    hasCheckin: progress.checkins.includes(date)
  };
}

function getAverageScore() {
  const scores = getProgress().aiScores;
  if (!scores.length) return null;
  const total = scores.reduce((sum, item) => sum + item.score, 0);
  return Math.round(total / scores.length);
}

function getStreakDays() {
  const checkins = new Set(getProgress().checkins);
  let streak = 0;
  const cursor = new Date();

  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    if (!checkins.has(key)) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function renderTodayProgress() {
  const stats = document.querySelector("#today-stats");
  const tasks = document.querySelector("#today-task-list");
  if (!stats || !tasks) return;

  const today = getTodayProgress();
  const averageScore = getAverageScore();
  stats.innerHTML = `
    <div class="stat-item primary"><strong>${getStreakDays()}</strong><span>连续打卡</span></div>
    <div class="stat-item"><strong>${today.sentenceCount}</strong><span>今日句子</span></div>
    <div class="stat-item"><strong>${averageScore || "--"}</strong><span>平均评分</span></div>
  `;

  const taskItems = [
    { done: today.sentenceCount >= 3, text: `精听 3 个关键句（${Math.min(today.sentenceCount, 3)}/3）` },
    { done: today.shadowingCount >= 1, text: `完成 1 次跟读录音（${Math.min(today.shadowingCount, 1)}/1）` },
    { done: today.hasAiScore, text: "获得一次 AI 评分" },
    { done: today.hasCheckin, text: "完成今日打卡" }
  ];

  tasks.innerHTML = taskItems.map((item) => `
    <li class="${item.done ? "done" : ""}"><span></span>${item.text}</li>
  `).join("");
}

function isFavorite(videoId) {
  return getFavorites().includes(videoId);
}

function toggleFavorite(videoId) {
  const favorites = getFavorites();
  const nextFavorites = favorites.includes(videoId)
    ? favorites.filter((id) => id !== videoId)
    : [...favorites, videoId];
  setFavorites(nextFavorites);
  renderCurrentPage();
}

function getVideoById(videoId) {
  return videos.find((video) => video.id === videoId) || videos[0];
}

function getCurrentVideo() {
  const params = new URLSearchParams(window.location.search);
  return getVideoById(params.get("video"));
}

function getDurationBucket(video) {
  if (video.durationMinutes <= 3) return "short";
  if (video.durationMinutes <= 8) return "medium";
  return "long";
}

function getVideoLearningState(video) {
  const progress = getProgress();
  if (progress.completedVideos.includes(video.id)) {
    return { label: "已完成", className: "completed" };
  }

  const hasPracticed = Object.values(progress.practicedSentences)
    .some((items) => items.some((item) => item.startsWith(`${video.id}:`)));
  if (hasPracticed) {
    return { label: "学习中", className: "active" };
  }

  return { label: "未开始", className: "new" };
}

function getLibrarySearchText() {
  return document.querySelector("#library-search")?.value.trim().toLowerCase() || "";
}

function matchesSearch(video, searchText) {
  if (!searchText) return true;
  return [
    video.title,
    video.description,
    video.source,
    video.topicLabel,
    video.difficultyLabel
  ].some((value) => value.toLowerCase().includes(searchText));
}

function updateLibrarySummary(filteredVideos) {
  const summary = document.querySelector("#library-summary");
  if (!summary) return;

  const favorites = filteredVideos.filter((video) => isFavorite(video.id)).length;
  const completed = filteredVideos.filter((video) => getProgress().completedVideos.includes(video.id)).length;
  summary.textContent = `当前显示 ${filteredVideos.length} 个片段；${favorites} 个已收藏，${completed} 个已完成。`;
}

function getSpeakerInitials(name = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "SF";
}

function renderVideoPreview(video, extraClass = "") {
  const className = `thumb ${extraClass} ${video.thumb} ${video.videoMode === "embed" ? "has-media" : ""}`.trim();
  const duration = `<span>${video.durationMinutes}分钟</span>`;

  if (video.videoMode === "embed" && video.embedUrl) {
    return `
      <div class="${className}" aria-label="${video.title} 视频封面">
        <div class="media-cover-poster">
          <strong>${video.source || "SpeakFlow"}</strong>
          <small>${video.topicLabel}</small>
          <b>${video.title}</b>
          <em>${video.difficultyLabel} · ${video.durationMinutes} 分钟</em>
        </div>
        ${duration}
      </div>
    `;
  }

  return `<div class="${className}">${duration}</div>`;
}

function createVideoCard(video, options = {}) {
  const favorite = isFavorite(video.id);
  const status = favorite ? "已收藏" : "收藏";
  const favoriteClass = favorite ? "favorite-button active" : "favorite-button";
  const learningState = getVideoLearningState(video);
  const sentenceCount = (video.sentences || videos[0].sentences || []).length;

  return `
    <article class="video-card" data-video-id="${video.id}">
      ${renderVideoPreview(video)}
      <div class="card-body">
        <div class="video-meta-row">
          <span class="learning-state ${learningState.className}">${learningState.label}</span>
          <span>${sentenceCount} 句精听</span>
        </div>
        <div class="card-title-row">
          <h2>${video.title}</h2>
          <button class="${favoriteClass}" type="button" data-favorite="${video.id}" aria-label="${status}${video.title}">${status}</button>
        </div>
        <p>${options.context || video.description}</p>
        <div class="tag-row"><span>${video.source}</span><span>${video.topicLabel}</span><span>${video.difficultyLabel}</span></div>
        <div class="card-foot"><strong>${video.durationMinutes} 分钟</strong><a href="learn.html?video=${video.id}">进入学习</a></div>
      </div>
    </article>
  `;
}

function bindFavoriteButtons() {
  document.querySelectorAll("[data-favorite]").forEach((button) => {
    button.addEventListener("click", () => toggleFavorite(button.dataset.favorite));
  });
}

function renderTodayPick() {
  const pick = videos.find((video) => video.featured) || videos[0];
  const container = document.querySelector("#today-pick");
  if (!container) return;

  container.innerHTML = `
    ${renderVideoPreview(pick, "today-cover")}
    <div class="today-copy">
      <p class="eyebrow">Today's Pick</p>
      <h2>${pick.title}</h2>
      <p>${pick.description}</p>
      <div class="tag-row"><span>${pick.source}</span><span>${pick.topicLabel}</span><span>${pick.difficultyLabel}</span></div>
      <div class="inline-actions">
        <a class="button primary" href="learn.html?video=${pick.id}">进入学习</a>
        <button class="${isFavorite(pick.id) ? "favorite-button active" : "favorite-button"}" type="button" data-favorite="${pick.id}">
          ${isFavorite(pick.id) ? "已收藏" : "收藏"}
        </button>
      </div>
    </div>
  `;
}

function createHomeVideoRow(video) {
  const sentenceCount = (video.sentences || videos[0].sentences || []).length;
  return `
    <article class="calm-new-item">
      <div>
        <span>${video.source} · ${video.difficultyLabel} · ${video.durationMinutes} 分钟</span>
        <h3>${video.title}</h3>
        <p>${video.description}</p>
      </div>
      <a href="learn.html?video=${video.id}">${sentenceCount} 句训练</a>
    </article>
  `;
}

function renderHomePage() {
  const pick = videos.find((video) => video.featured) || videos[0];
  const today = getTodayProgress();
  const averageScore = getAverageScore();

  const startLink = document.querySelector("#home-start-link");
  const featuredLink = document.querySelector("#home-featured-link");
  if (startLink) startLink.href = `learn.html?video=${pick.id}`;
  if (featuredLink) featuredLink.href = `learn.html?video=${pick.id}`;

  const featuredTitle = document.querySelector("#home-featured-title");
  if (featuredTitle) featuredTitle.textContent = pick.title;

  const featuredSummary = document.querySelector("#home-featured-summary");
  if (featuredSummary) {
    featuredSummary.textContent = `${pick.source} · ${pick.difficultyLabel} · ${pick.durationMinutes} 分钟。适合今天完成一次安静的听说训练。`;
  }

  const stats = document.querySelector("#home-student-stats");
  if (stats) {
    stats.innerHTML = `
      <div><strong>${getStreakDays()} 天</strong><span>当前连续学习</span></div>
      <div><strong>${today.sentenceCount} 句</strong><span>今天已经练过的句子</span></div>
      <div><strong>${averageScore || "--"}</strong><span>最近一次 AI 参考评分</span></div>
    `;
  }

  const newVideos = document.querySelector("#home-new-videos");
  if (newVideos) {
    const latestVideos = [...videos].slice(0, 4);
    newVideos.innerHTML = latestVideos.map(createHomeVideoRow).join("");
  }
}

function getFilters() {
  const filters = {};
  document.querySelectorAll("[data-filter]").forEach((select) => {
    filters[select.dataset.filter] = select.value;
  });
  return filters;
}

function matchesFilters(video, filters) {
  return Object.entries(filters).every(([key, value]) => {
    if (value === "all") return true;
    if (key === "duration") return getDurationBucket(video) === value;
    return video[key] === value;
  });
}

function renderLibrary() {
  renderTodayProgress();
  renderTodayPick();
  const grid = document.querySelector("#video-grid");
  if (!grid) return;

  const searchText = getLibrarySearchText();
  const filters = getFilters();
  const filteredVideos = videos.filter((video) => matchesFilters(video, filters) && matchesSearch(video, searchText));
  const isCalmHome = document.body.classList.contains("speakvlog-home");
  const hasActiveFilter = searchText || Object.values(filters).some((value) => value !== "all");
  const visibleVideos = isCalmHome && !hasActiveFilter ? filteredVideos.slice(0, 3) : filteredVideos;
  updateLibrarySummary(filteredVideos);
  grid.innerHTML = visibleVideos.length
    ? visibleVideos.map((video) => createVideoCard(video)).join("")
    : `<article class="video-card empty-state"><div class="card-body"><h2>没有找到合适的视频</h2><p>换一个关键词或筛选条件，继续找今天适合训练的片段。</p></div></article>`;

  document.querySelectorAll("[data-filter]").forEach((select) => {
    select.onchange = renderLibrary;
  });
  const searchInput = document.querySelector("#library-search");
  if (searchInput) searchInput.oninput = renderLibrary;
  bindFavoriteButtons();
}

function renderFavorites() {
  const grid = document.querySelector("#favorites-grid");
  if (!grid) return;

  const favoriteVideos = videos.filter((video) => getFavorites().includes(video.id));
  grid.innerHTML = favoriteVideos.length
    ? favoriteVideos.map((video) => createVideoCard(video, { context: `已收藏 · ${video.topicLabel} · 适合反复训练` })).join("")
    : `<article class="video-card empty-state"><div class="card-body"><h2>还没有收藏视频</h2><p>回到视频库，点击视频卡片上的“收藏”，这里会自动显示你的复习清单。</p><a class="button secondary" href="library.html">浏览视频</a></div></article>`;
  bindFavoriteButtons();
}

function renderVideoPlayer(video) {
  if (video.videoMode === "embed" && video.embedUrl) {
    return `
      <iframe
        class="player media-player embed-player ${video.thumb}"
        src="${video.embedUrl}"
        title="${video.title}"
        allow="fullscreen; picture-in-picture"
        allowfullscreen
        loading="lazy">
      </iframe>
    `;
  }

  if (video.videoUrl) {
    return `
      <video class="player media-player ${video.thumb}" controls preload="metadata" poster="">
        <source src="${video.videoUrl}" type="${video.videoType || "video/mp4"}">
        当前浏览器无法播放该 demo 视频。
      </video>
    `;
  }

  return `<div class="player ${video.thumb}"></div>`;
}

function renderSourceAttribution(video) {
  if (!video.attribution && !video.sourceUrl) return "";
  return `
    <p class="source-attribution">
      ${video.attribution || "外部素材"}
      ${video.sourceUrl ? `<a href="${video.sourceUrl}" target="_blank" rel="noopener noreferrer">查看原始来源</a>` : ""}
    </p>
  `;
}

const wordGlossary = {
  english: { cn: "英语；英文", type: "noun", usage: "谈论语言学习、国际沟通或英语环境时的核心词。" },
  language: { cn: "语言", type: "noun", usage: "可指某一种语言，也可泛指表达系统。" },
  languages: { cn: "语言；多种语言", type: "noun", usage: "复数形式，常用于比较不同语言或讨论语言多样性。" },
  universal: { cn: "通用的；普遍的", type: "adj.", usage: "强调适用于很多地区、人群或场景。" },
  reasons: { cn: "理由；原因", type: "noun", usage: "用于列举观点，常见结构是 reasons to do something。" },
  learn: { cn: "学习", type: "verb", usage: "后面可直接接语言、技能或方法。" },
  another: { cn: "另一；又一", type: "determiner", usage: "强调在已有对象之外再增加一个。" },
  channel: { cn: "引导；塑造", type: "verb", usage: "本句中不是频道，而是表达语言会影响思维路径。" },
  thoughts: { cn: "想法；思维", type: "noun", usage: "常用于讨论观点、认知和内心活动。" },
  speak: { cn: "说；讲话", type: "verb", usage: "可用于语言能力，也可用于公开表达。" },
  chinese: { cn: "中文；中国的", type: "noun/adj.", usage: "根据语境可指语言，也可作形容词。" },
  task: { cn: "任务；工作", type: "noun", usage: "a hard task 表示一件有挑战的事。" },
  show: { cn: "展示；说明", type: "verb", usage: "Let me show you... 是讲解型表达的自然开头。" },
  works: { cn: "运作；起作用", type: "verb", usage: "how it works 用来解释机制或方法。" },
  build: { cn: "构建；建立", type: "verb", usage: "可用于抽象概念、能力和系统。" },
  complex: { cn: "复杂的", type: "adj.", usage: "用来描述概念、问题或结构。" },
  concepts: { cn: "概念", type: "noun", usage: "教育、解释和思维类话题常用词。" },
  considered: { cn: "认为；把……看作", type: "verb", usage: "consider myself... 适合表达自我认知。" },
  fairly: { cn: "相当；还算", type: "adv.", usage: "用于缓和语气，让判断不显得绝对。" },
  read: { cn: "阅读；读过", type: "verb/adj.", usage: "well-read 表示博览群书的。" },
  massive: { cn: "巨大的", type: "adj.", usage: "比 big 更正式、更有强调感。" },
  blind: { cn: "盲的；看不见的", type: "adj.", usage: "blind spot 表示认知盲区。" },
  spot: { cn: "点；位置", type: "noun", usage: "blind spot 是固定搭配。" },
  bookshelf: { cn: "书架", type: "noun", usage: "这里用书架比喻阅读范围。" },
  decided: { cn: "决定了", type: "verb", usage: "decided to... 用于讲述行动计划。" },
  country: { cn: "国家", type: "noun", usage: "every country 表示覆盖所有国家。" },
  sound: { cn: "声音", type: "noun", usage: "可指物理声音，也可延伸到表达权力。" },
  money: { cn: "金钱", type: "noun", usage: "用于类比资源、权力或控制。" },
  power: { cn: "权力；力量", type: "noun", usage: "抽象议题中常与 control 搭配。" },
  control: { cn: "控制", type: "noun/verb", usage: "表示支配、影响或管理能力。" },
  sign: { cn: "手势；符号", type: "noun", usage: "sign language 指手语。" },
  rhythm: { cn: "节奏", type: "noun", usage: "常用于声音、语言、动作和音乐。" },
  music: { cn: "音乐；音乐性", type: "noun", usage: "这里强调手语也有节奏美感。" },
  reclaim: { cn: "重新取回", type: "verb", usage: "常用于权利、身份或话语权。" },
  ownership: { cn: "拥有权；归属感", type: "noun", usage: "reclaim ownership of... 是强观点表达。" },
  door: { cn: "门；机会", type: "noun", usage: "open door 可比喻机会入口。" },
  losing: { cn: "正在失去", type: "verb", usage: "Are we losing...? 用于反思性提问。" },
  important: { cn: "重要的", type: "adj.", usage: "用于强调价值或优先级。" },
  celebrate: { cn: "赞美；庆祝", type: "verb", usage: "celebrate diversity 表示认可多样性。" },
  diversity: { cn: "多样性", type: "noun", usage: "文化和教育话题中的高频词。" },
  differ: { cn: "不同；有差异", type: "verb", usage: "differ in how... 用于描述机制差异。" },
  divide: { cn: "划分；分割", type: "verb", usage: "divide up time 表示划分时间。" },
  time: { cn: "时间", type: "noun", usage: "语言与思维话题中的核心抽象词。" },
  surprising: { cn: "令人意外的", type: "adj.", usage: "用于引出超出预期的结果。" },
  effects: { cn: "影响；效果", type: "noun", usage: "研究类表达常用词。" },
  future: { cn: "未来", type: "noun", usage: "可讨论计划、时间感或可能性。" },
  distant: { cn: "遥远的", type: "adj.", usage: "可指空间距离，也可指心理距离。" },
  tool: { cn: "工具", type: "noun", usage: "not just a tool 用来强调更深层价值。" },
  carries: { cn: "承载；携带", type: "verb", usage: "可用于身份、记忆、意义等抽象对象。" },
  identity: { cn: "身份；认同", type: "noun", usage: "文化和语言议题中的核心词。" },
  memory: { cn: "记忆", type: "noun", usage: "可指个人记忆或集体记忆。" },
  ashamed: { cn: "羞愧的", type: "adj.", usage: "be ashamed of... 表示为某事羞愧。" },
  spelling: { cn: "拼写", type: "noun", usage: "讨论英语规则和学习负担时使用。" },
  surprisingly: { cn: "出人意料地", type: "adv.", usage: "用来强调结果或难度超出预期。" },
  hard: { cn: "困难的", type: "adj.", usage: "hard to master 表示难以掌握。" },
  master: { cn: "掌握", type: "verb", usage: "常用于技能、语言、方法的熟练掌握。" },
  evolves: { cn: "演变；进化", type: "verb", usage: "language evolves over time 是讨论语言变化的自然表达。" },
  rethink: { cn: "重新思考", type: "verb", usage: "rethink the rules 用于提出改革或反思。" },
  rules: { cn: "规则", type: "noun", usage: "可指语法、拼写、制度或方法规则。" }
};

function normalizeWord(word) {
  return word.toLowerCase().replace(/^[^a-z]+|[^a-z]+$/g, "");
}

function buildWordItems(sentence) {
  if (sentence.words?.length) return sentence.words;

  return sentence.english
    .split(/\s+/)
    .map((raw) => {
      const key = normalizeWord(raw);
      const fallback = { cn: "结合本句理解", type: "word", usage: "后续可补充更精确的逐词解析。" };
      return {
        text: raw.replace(/[.,?!:;]+$/g, ""),
        ...(wordGlossary[key] || fallback),
        key
      };
    })
    .filter((item) => item.key);
}

function renderWordPrecision(sentences, sentenceIndex = 0, wordIndex = 0) {
  const sentence = sentences[sentenceIndex] || sentences[0];
  const words = buildWordItems(sentence);
  const activeWord = words[wordIndex] || words[0];

  return `
    <section class="word-precision" id="word-precision">
      <div class="word-precision-head">
        <p class="eyebrow">Word Precision</p>
        <h2>逐词精度</h2>
      </div>
      <p class="word-sentence">${sentence.english}</p>
      <div class="word-grid">
        ${words.map((word, index) => `
          <button class="word-chip ${index === wordIndex ? "active" : ""}" type="button" data-word-index="${index}">
            <strong>${word.text}</strong>
            <span>${word.cn}</span>
          </button>
        `).join("")}
      </div>
      <article class="word-detail" id="word-detail">
        <span>${activeWord.type}</span>
        <h3>${activeWord.text}</h3>
        <strong>${activeWord.cn}</strong>
        <p>${activeWord.usage}</p>
      </article>
    </section>
  `;
}

function bindWordPrecision(sentences, sentenceIndex = 0) {
  document.querySelectorAll("[data-word-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const wordIndex = Number(button.dataset.wordIndex);
      document.querySelector("#word-precision").outerHTML = renderWordPrecision(sentences, sentenceIndex, wordIndex);
      bindWordPrecision(sentences, sentenceIndex);
    });
  });
}

function parseVttTimestamp(timestamp) {
  const parts = timestamp.trim().split(":");
  const secondsPart = parts.pop() || "0";
  const seconds = Number(secondsPart.replace(",", "."));
  const minutes = Number(parts.pop() || 0);
  const hours = Number(parts.pop() || 0);
  return Math.round(hours * 3600 + minutes * 60 + seconds);
}

function formatSubtitleTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function normalizeSubtitleCue(cue, index, videoId, source = "inline") {
  const startSeconds = Number.isFinite(cue.startSeconds)
    ? cue.startSeconds
    : parseVttTimestamp(cue.start || `00:00:${String(index * 7 + 1).padStart(2, "0")}.000`);
  const endSeconds = Number.isFinite(cue.endSeconds)
    ? cue.endSeconds
    : parseVttTimestamp(cue.end || `00:00:${String(index * 7 + 6).padStart(2, "0")}.000`);

  return {
    id: cue.id || `${videoId}-cue-${String(index + 1).padStart(3, "0")}`,
    videoId,
    index,
    startSeconds,
    endSeconds,
    start: formatSubtitleTime(startSeconds),
    end: formatSubtitleTime(endSeconds),
    english: cue.english || cue.text || "",
    chinese: cue.chinese || cue.translation || "",
    note: cue.note || cue.expressionNote || "来自字幕数据，可继续补充重点表达。",
    keywords: cue.keywords || [],
    source
  };
}

function normalizeSubtitleCues(cues, videoId, source = "inline") {
  return (cues || [])
    .map((cue, index) => normalizeSubtitleCue(cue, index, videoId, source))
    .filter((cue) => cue.english);
}

function parseVtt(text) {
  return text
    .replace(/\r/g, "")
    .split(/\n\n+/)
    .map((block) => block.split("\n").filter(Boolean))
    .map((lines, index) => {
      const timingIndex = lines.findIndex((line) => line.includes("-->"));
      if (timingIndex === -1) return null;

      const [startRaw, endRaw] = lines[timingIndex].split("-->").map((part) => part.trim().split(/\s+/)[0]);
      const cueLines = lines.slice(timingIndex + 1);
      const english = cueLines.find((line) => line.startsWith("EN:"))?.replace(/^EN:\s*/, "") || cueLines[0] || "";
      const chinese = cueLines.find((line) => line.startsWith("ZH:"))?.replace(/^ZH:\s*/, "") || cueLines[1] || "";
      if (!english) return null;

      return {
        id: lines[0] && timingIndex > 0 ? lines[0] : undefined,
        index,
        startSeconds: parseVttTimestamp(startRaw),
        endSeconds: parseVttTimestamp(endRaw),
        english,
        chinese,
        note: "来自本地 VTT 字幕文件，可继续补充重点表达。"
      };
    })
    .filter(Boolean);
}

async function loadSubtitles(video) {
  const fallback = normalizeSubtitleCues(video.sentences || videos[0].sentences, video.id, "inline");
  if (!video.subtitleUrl) return fallback;

  try {
    const response = await fetch(video.subtitleUrl);
    if (!response.ok) throw new Error("subtitle not found");
    const subtitles = normalizeSubtitleCues(parseVtt(await response.text()), video.id, "vtt");
    return subtitles.length ? subtitles : fallback;
  } catch {
    return fallback;
  }
}

function getSentenceTime(sentence, index) {
  return sentence.start || `0:${String(index * 7 + 1).padStart(2, "0")}`;
}

function renderSubtitleList(sentences) {
  return sentences.map((sentence, index) => `
    <button class="sentence ${index === 0 ? "active" : ""}" type="button" data-sentence="${index}" data-cue-id="${sentence.id || ""}" data-source="${sentence.source || "inline"}">
      <time>${getSentenceTime(sentence, index)}</time>
      <strong>${sentence.english}</strong>
      <span>${sentence.chinese}</span>
      <em class="sentence-star">☆</em>
    </button>
  `).join("");
}

function bindSubtitleButtons(sentences, videoId) {
  document.querySelectorAll(".sentence").forEach((sentenceButton) => {
    sentenceButton.addEventListener("click", () => {
      const index = Number(sentenceButton.dataset.sentence);
      const sentence = sentences[index];
      if (!sentence) return;

      document.querySelectorAll(".sentence").forEach((item) => item.classList.remove("active"));
      sentenceButton.classList.add("active");
      document.querySelector("#current-sentence").textContent = `当前句：${sentence.english}`;
      document.querySelector("#sentence-note").textContent = sentence.note || "";
      recordSentencePractice(videoId, index);
      updateLearnProgressView(videoId);
    });
  });
}

function renderLearnPage() {
  const video = getCurrentVideo();
  const sentences = normalizeSubtitleCues(video.sentences || videos[0].sentences, video.id, "inline");
  const videoPanel = document.querySelector("#learn-video");
  const sentencePanel = document.querySelector("#learn-sentences");
  const feedbackPanel = document.querySelector("#learn-feedback");
  if (!videoPanel || !sentencePanel || !feedbackPanel) return;

  videoPanel.innerHTML = `
    <div class="learn-video-card">
      <div class="learn-video-head">
        <a class="learn-back" href="index.html" aria-label="返回视频库">‹</a>
        <h1>${video.title}</h1>
        <div class="learn-meta"><span>时长: ${video.durationMinutes}:00</span><span>难度: ${video.difficultyLabel}</span></div>
      </div>
      <div class="learn-player-frame">${renderVideoPlayer(video)}</div>
    </div>
    <section class="video-summary-card">
      <h2><span>▰</span>视频简介</h2>
      <p>${video.description}</p>
      ${video.demoNote ? `<p class="demo-note">${video.demoNote}</p>` : ""}
      ${renderSourceAttribution(video)}
    </section>
  `;

  sentencePanel.innerHTML = `
    <div class="subtitle-head">
      <h1>动态字幕</h1>
      <div class="subtitle-tools" aria-label="字幕工具">
        <button type="button" title="翻译">文</button>
        <button type="button" title="循环">↻</button>
        <button type="button" title="筛选">≡</button>
        <button type="button" title="生词本">▯</button>
        <button type="button" title="导出">⇲</button>
      </div>
    </div>
    <div class="sentence-scroll" id="sentence-scroll">
      ${renderSubtitleList(sentences)}
    </div>
    <button class="auto-scroll-button" type="button">▣ 自动</button>
  `;

  feedbackPanel.innerHTML = `
    <p class="eyebrow">Shadowing</p>
    <h2>跟读录音</h2>
    <p id="current-sentence">当前句：${sentences[0].english}</p>
    <button class="button primary record-button" type="button" data-shadowing="${video.id}">开始录音</button>
    <div class="score-box"><strong>82</strong><span>AI 评分</span></div>
    <p class="feedback-text">你基本读完整了句子，但需要更注意连读和句尾清晰度。</p>
    <div class="lesson-note compact-note"><h2>重点表达</h2><p id="sentence-note">${sentences[0].note}</p></div>
    <p class="progress-note" id="learn-progress-note">${getLearnProgressText(video.id)}</p>
    <div class="inline-actions">
      <button class="${isFavorite(video.id) ? "favorite-button active" : "favorite-button"}" type="button" data-favorite="${video.id}">
        ${isFavorite(video.id) ? "已收藏" : "收藏视频"}
      </button>
      <button class="button secondary" type="button" data-checkin="${video.id}">完成打卡</button>
    </div>
  `;

  bindSubtitleButtons(sentences, video.id);
  bindFavoriteButtons();
  bindLearningActions(video);
  hydrateSubtitles(video);
}

async function hydrateSubtitles(video) {
  const loadedSentences = await loadSubtitles(video);
  const scroll = document.querySelector("#sentence-scroll");
  if (!scroll) return;

  scroll.innerHTML = renderSubtitleList(loadedSentences);
  const currentSentence = document.querySelector("#current-sentence");
  const sentenceNote = document.querySelector("#sentence-note");
  if (currentSentence) currentSentence.textContent = `当前句：${loadedSentences[0].english}`;
  if (sentenceNote) sentenceNote.textContent = loadedSentences[0].note || "";

  bindSubtitleButtons(loadedSentences, video.id);
}

function getLearnProgressText(videoId) {
  const today = getTodayProgress();
  const progress = getProgress();
  const date = todayKey();
  const sentenceCount = (progress.practicedSentences[date] || [])
    .filter((item) => item.startsWith(`${videoId}:`)).length;
  const status = today.hasCheckin ? "今日已打卡" : "今日未打卡";
  return `${status} · 本视频今日已精听 ${sentenceCount} 句 · 跟读 ${today.shadowingCount} 次`;
}

function bindLearningActions(video) {
  const shadowingButton = document.querySelector("[data-shadowing]");
  if (shadowingButton) {
    shadowingButton.addEventListener("click", () => {
      recordShadowing(video.id);
      updateLearnProgressView(video.id);
    });
  }

  const checkinButton = document.querySelector("[data-checkin]");
  if (checkinButton) {
    checkinButton.addEventListener("click", () => {
      completeCheckin(video);
      updateLearnProgressView(video.id);
      checkinButton.textContent = "今日已打卡";
    });
  }
}

function updateLearnProgressView(videoId) {
  const note = document.querySelector("#learn-progress-note");
  if (note) note.textContent = getLearnProgressText(videoId);
}

function renderProfile() {
  const container = document.querySelector("#member-records");
  if (!container) return;

  const progress = getProgress();
  const today = getTodayProgress();
  const averageScore = getAverageScore();
  const recent = progress.recentLearning.length
    ? progress.recentLearning.map((item) => item.title).join(" · ")
    : "还没有完成打卡，先从一个视频开始。";

  container.innerHTML = `
    <article class="record-card"><h2>连续打卡</h2><strong>${getStreakDays()} 天</strong><p>${today.hasCheckin ? "今天已完成打卡。" : "今天还没有打卡。"}</p></article>
    <article class="record-card"><h2>总学习天数</h2><strong>${progress.checkins.length} 天</strong><p>按完成打卡的日期累计。</p></article>
    <article class="record-card"><h2>完成视频</h2><strong>${progress.completedVideos.length} 个</strong><p>完成打卡的视频会计入这里。</p></article>
    <article class="record-card"><h2>AI 平均分</h2><strong>${averageScore || "--"}</strong><p>${averageScore ? "由跟读和 AI 陪练评分计算。" : "完成一次跟读或陪练后生成评分。"}</p></article>
    <article class="record-card wide-record"><h2>最近学习</h2><p>${recent}</p></article>
    <article class="record-card wide-record"><h2>今日进度</h2><p>精听 ${today.sentenceCount} 句 · 跟读 ${today.shadowingCount} 次 · AI 陪练 ${today.aiPracticeCount} 轮 · ${today.hasAiScore ? "已获得 AI 评分" : "未获得 AI 评分"}</p></article>
  `;
}

function scoreAiReply(text, scenario) {
  const normalized = text.toLowerCase();
  const wordCount = normalized.split(/\s+/).filter(Boolean).length;
  const keywordHits = scenario.keywords.filter((keyword) => normalized.includes(keyword)).length;
  const politeness = /\b(please|thanks|thank you|could|would|may i|can i)\b/.test(normalized) ? 8 : 0;
  const score = Math.min(96, 58 + Math.min(wordCount, 18) + keywordHits * 5 + politeness);

  let feedback = scenario.suggestion;
  if (wordCount < 5) {
    feedback = "可以再补充一点信息，让回答更像真实对话中的完整句。";
  } else if (keywordHits >= 2 && politeness) {
    feedback = "表达比较完整，也有礼貌用语。下一步可以继续补充原因或具体细节。";
  } else if (keywordHits >= 1) {
    feedback = "你已经抓住了场景关键词，可以再加入礼貌表达或更完整的请求。";
  }

  return { score, feedback, keywordHits };
}

function getNextAiPrompt(scenario, userMessageCount) {
  return scenario.prompts[(userMessageCount - 1) % scenario.prompts.length];
}

function renderAiPage() {
  const scenario = getScenarioById(activeAiScenarioId);
  aiMessages = getScenarioMessages(scenario.id);
  renderAiScenarios();
  renderAiChat(scenario);
  renderAiFeedback(scenario);
}

function renderAiScenarios() {
  const container = document.querySelector("#ai-scenarios");
  if (!container) return;

  container.innerHTML = `
    <h2>场景</h2>
    ${aiScenarios.map((scenario) => `
      <button class="scenario ${scenario.id === activeAiScenarioId ? "active" : ""}" type="button" data-ai-scenario="${scenario.id}">
        ${scenario.title}<span>${scenario.meta}</span>
      </button>
    `).join("")}
  `;

  document.querySelectorAll("[data-ai-scenario]").forEach((button) => {
    button.addEventListener("click", () => {
      activeAiScenarioId = button.dataset.aiScenario;
      renderAiPage();
    });
  });
}

function renderAiChat(scenario) {
  const container = document.querySelector("#ai-chat");
  if (!container) return;

  container.innerHTML = `
    <div class="chat-scroll" id="chat-scroll">
      ${aiMessages.map((message) => `
        <div class="chat-message ${message.role === "user" ? "user" : "ai"}">
          <span>${message.role === "user" ? "You" : "AI"}</span>
          <p>${message.text}</p>
        </div>
      `).join("")}
    </div>
    <div class="chat-input">
      <input id="ai-input" type="text" placeholder="输入英文回答，比如：I'd like a medium iced latte, please.">
      <button type="button" data-ai-voice>语音</button>
      <button class="primary-send" type="button" data-ai-send>发送</button>
    </div>
  `;

  const input = document.querySelector("#ai-input");
  const send = document.querySelector("[data-ai-send]");
  const voice = document.querySelector("[data-ai-voice]");
  const submit = () => sendAiMessage(scenario, input.value);

  send.addEventListener("click", submit);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") submit();
  });
  voice.addEventListener("click", () => {
    input.value = "I'd like a medium iced latte, please.";
    input.focus();
  });

  const scroll = document.querySelector("#chat-scroll");
  scroll.scrollTop = scroll.scrollHeight;
}

async function requestAiCoach(scenario, userText) {
  const localResult = scoreAiReply(userText, scenario);
  const userMessages = aiMessages
    .filter((message) => message.role === "user")
    .map((message) => ({ role: "user", content: message.text }));

  try {
    const response = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenario: scenario.id,
        scenarioTitle: scenario.title,
        goal: scenario.goal,
        messages: [...userMessages, { role: "user", content: userText }]
      })
    });

    if (!response.ok) throw new Error("AI service unavailable");
    const data = await response.json();
    if (data.fallback) throw new Error(data.error || "AI service fallback");

    return {
      reply: data.reply || getNextAiPrompt(scenario, userMessages.length + 1),
      score: Number(data.score) || localResult.score,
      feedback: data.feedback || localResult.feedback,
      suggestion: data.suggestion || scenario.suggestion,
      keywordHits: localResult.keywordHits,
      source: "api"
    };
  } catch {
    return {
      ...localResult,
      reply: getNextAiPrompt(scenario, userMessages.length + 1),
      suggestion: scenario.suggestion,
      source: "local"
    };
  }
}

async function sendAiMessage(scenario, text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  const userMessageCount = aiMessages.filter((message) => message.role === "user").length + 1;
  const result = await requestAiCoach(scenario, trimmed);
  aiMessages = [
    ...aiMessages,
    { role: "user", text: trimmed },
    { role: "ai", text: result.reply || getNextAiPrompt(scenario, userMessageCount) }
  ];
  recordAiPractice(scenario, result.score);
  saveScenarioMessages(scenario.id, aiMessages);
  renderAiChat(scenario);
  renderAiFeedback(scenario, trimmed, result);
}

function renderAiFeedback(scenario, latestText = "", scoredResult = null) {
  const container = document.querySelector("#ai-feedback");
  if (!container) return;

  const lastUserMessage = latestText || [...aiMessages].reverse().find((message) => message.role === "user")?.text || "";
  const result = scoredResult || (lastUserMessage
    ? scoreAiReply(lastUserMessage, scenario)
    : { score: "--", feedback: "先输入一句英文回答，系统会根据完整度、场景关键词和礼貌表达给出模拟反馈。", keywordHits: 0 }
  );
  const today = getTodayProgress();
  const modeText = result.source === "api"
    ? "当前使用真实 AI"
    : "当前使用本地模拟；部署后配置 MiniMax API Key 可启用真实 AI";

  container.innerHTML = `
    <p class="eyebrow">Session Goal</p>
    <h2>${scenario.goal}</h2>
    <p>${scenario.guidance}</p>
    <div class="score-box"><strong>${result.score}</strong><span>表达完整度</span></div>
    <p class="feedback-text">${result.feedback}</p>
    <p class="progress-note">场景关键词命中：${result.keywordHits} · 当前对话 ${aiMessages.filter((message) => message.role === "user").length} 轮 · 今日 AI 陪练 ${today.aiPracticeCount} 轮</p>
    <p class="ai-mode-note">${modeText}</p>
  `;
}

function getExpressionItems(videoId, tab) {
  const library = expressionLibrary[videoId] || expressionLibrary["notion-test-001"];
  return library[tab] || [];
}

function getExpressionStatuses(items) {
  const statuses = [
    { value: "all", label: `全部 (${items.length})` },
    { value: "unmarked", label: `未标记 (${items.filter((item) => (item.status || "unmarked") === "unmarked").length})` },
    { value: "known", label: `认识 (${items.filter((item) => item.status === "known").length})` },
    { value: "unknown", label: `不认识 (${items.filter((item) => item.status === "unknown").length})` }
  ];
  return statuses;
}

function renderTipsPage() {
  renderTipsVideoList();
  renderTipsHeader();
  renderExpressionTabs();
  renderExpressionFilters();
  renderExpressionGrid();
  bindTipsSearch();
}

function renderTipsVideoList(searchText = "") {
  const container = document.querySelector("#tips-video-list");
  if (!container) return;

  const normalized = searchText.trim().toLowerCase();
  const visibleVideos = videos.filter((video) => video.title.toLowerCase().includes(normalized));
  container.innerHTML = visibleVideos.map((video) => `
    <button class="tips-video-item ${video.id === activeTipsVideoId ? "active" : ""}" type="button" data-tips-video="${video.id}">
      <span>${video.title}</span>
      <small>${video.topicLabel} · ${video.durationMinutes}分钟</small>
    </button>
  `).join("");

  document.querySelectorAll("[data-tips-video]").forEach((button) => {
    button.addEventListener("click", () => {
      activeTipsVideoId = button.dataset.tipsVideo;
      activeExpressionFilter = "all";
      renderTipsPage();
    });
  });
}

function renderTipsHeader() {
  const title = document.querySelector("#tips-video-title");
  const summary = document.querySelector("#tips-video-summary");
  const link = document.querySelector("#tips-learn-link");
  if (!title || !summary || !link) return;

  const video = getVideoById(activeTipsVideoId);
  const library = expressionLibrary[activeTipsVideoId] || expressionLibrary["notion-test-001"];
  title.textContent = video.title;
  summary.textContent = library.summary;
  link.href = `learn.html?video=${video.id}`;
}

function renderExpressionTabs() {
  document.querySelectorAll("[data-expression-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.expressionTab === activeExpressionTab);
    button.addEventListener("click", () => {
      activeExpressionTab = button.dataset.expressionTab;
      activeExpressionFilter = "all";
      renderExpressionTabs();
      renderExpressionFilters();
      renderExpressionGrid();
    });
  });
}

function renderExpressionFilters() {
  const container = document.querySelector("#expression-filters");
  if (!container) return;

  const items = getExpressionItems(activeTipsVideoId, activeExpressionTab);
  container.innerHTML = getExpressionStatuses(items).map((status) => `
    <button class="${status.value === activeExpressionFilter ? "active" : ""}" type="button" data-expression-filter="${status.value}">
      ${status.label}
    </button>
  `).join("");

  document.querySelectorAll("[data-expression-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeExpressionFilter = button.dataset.expressionFilter;
      renderExpressionFilters();
      renderExpressionGrid();
    });
  });

  const toggle = document.querySelector("#toggle-chinese");
  if (toggle) {
    toggle.textContent = tipsChineseVisible ? "隐藏中文" : "显示中文";
    toggle.onclick = () => {
      tipsChineseVisible = !tipsChineseVisible;
      renderExpressionFilters();
      renderExpressionGrid();
    };
  }
}

function renderExpressionGrid() {
  const grid = document.querySelector("#expression-grid");
  if (!grid) return;

  const items = getExpressionItems(activeTipsVideoId, activeExpressionTab)
    .filter((item) => activeExpressionFilter === "all" || (item.status || "unmarked") === activeExpressionFilter);

  grid.innerHTML = items.length
    ? items.map((item) => `
      <article class="expression-card">
        <div class="expression-card-head">
          <h2>${item.term}</h2>
          <button type="button" aria-label="播放 ${item.term}">▶</button>
        </div>
        ${item.phonetic ? `<p class="phonetic">${item.phonetic}</p>` : ""}
        <strong>${tipsChineseVisible ? item.cn : "中文已隐藏"}</strong>
        <p>${item.en}</p>
        <blockquote>
          <span>${item.example}</span>
          ${tipsChineseVisible ? `<small>${item.exampleCn}</small>` : ""}
        </blockquote>
        <div class="expression-actions"><span>复习</span><span>收藏</span></div>
      </article>
    `).join("")
    : `<article class="expression-card empty-state"><h2>这里暂时没有内容</h2><p>换一个标签或筛选条件继续查看。</p></article>`;
}

function bindTipsSearch() {
  const input = document.querySelector("#tips-search");
  if (!input) return;
  input.oninput = () => renderTipsVideoList(input.value);
}

function renderCurrentPage() {
  const page = document.body.dataset.page;
  if (page === "home") renderHomePage();
  if (page === "library") renderLibrary();
  if (page === "favorites") renderFavorites();
  if (page === "learn") renderLearnPage();
  if (page === "profile") renderProfile();
  if (page === "ai") renderAiPage();
  if (page === "tips") renderTipsPage();
}

renderCurrentPage();
