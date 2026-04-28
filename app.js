const FAVORITES_KEY = "speakflow_favorite_videos";
const PROGRESS_KEY = "speakflow_learning_progress";
const AI_SESSION_KEY = "speakflow_ai_session";

const videos = [
  {
    id: "meeting-follow-up",
    title: "会议里如何自然接话",
    description: "真实职场会议片段，训练确认信息、表达赞同、补充观点和礼貌提出不同意见。",
    source: "Workplace English",
    sourceType: "workplace",
    topic: "workplace",
    topicLabel: "职场表达",
    difficulty: "intermediate",
    difficultyLabel: "中级",
    durationMinutes: 6,
    date: "2026/4/24",
    thumb: "meeting",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    videoType: "video/mp4",
    demoNote: "Demo 视频：用于测试播放器和学习页流程，后续替换为真实英语片段。",
    featured: true,
    sentences: [
      { english: "I just want to make sure I understand the timeline.", chinese: "我只是想确认一下我理解的时间线是对的。", note: "make sure I understand... 是职场中确认信息的高频表达。" },
      { english: "That makes sense, but I have one concern.", chinese: "这说得通，不过我有一个顾虑。", note: "That makes sense, but... 可以礼貌地转入不同意见。" },
      { english: "Could we revisit this after we check the numbers?", chinese: "我们核对数据之后，能不能再回来看这个问题？", note: "revisit this 适合表达稍后重新讨论。" }
    ]
  },
  { id: "kitchen-vlog", title: "一眼心动的厨房", description: "生活 Vlog 片段，适合训练自然语速下的日常描述和空间表达。", source: "Maddie Borge", sourceType: "vlog", topic: "daily", topicLabel: "日常", difficulty: "intermediate", difficultyLabel: "中级", durationMinutes: 2, date: "2026/4/23", thumb: "kitchen" },
  { id: "dinner-ootd", title: "晚宴 OOTD", description: "短 Vlog 穿搭分享，适合练语速、连读和轻松自我描述。", source: "Michelle Choi", sourceType: "vlog", topic: "daily", topicLabel: "Vlog", difficulty: "beginner", difficultyLabel: "初级", durationMinutes: 1, date: "2026/4/22", thumb: "ootd" },
  { id: "interview-opinion", title: "采访中如何表达观点", description: "访谈片段，学习解释想法、补充原因和自然转折。", source: "Mel Robbins", sourceType: "interview", topic: "interview", topicLabel: "采访", difficulty: "intermediate", difficultyLabel: "中级", durationMinutes: 7, date: "2026/4/21", thumb: "interview" },
  { id: "coffee-before-work", title: "上班前的咖啡时间", description: "从买咖啡到进入工作状态，练习高频生活动词和寒暄表达。", source: "Alex Daily", sourceType: "vlog", topic: "workplace", topicLabel: "职场日常", difficulty: "beginner", difficultyLabel: "初级", durationMinutes: 4, date: "2026/4/19", thumb: "street" },
  { id: "hotel-checkin", title: "酒店入住真实对话", description: "覆盖入住、确认房型、询问早餐和请求帮助。", source: "Travel Now", sourceType: "ai-dialogue", topic: "travel", topicLabel: "旅行", difficulty: "beginner", difficultyLabel: "初级", durationMinutes: 3, date: "2026/4/17", thumb: "travel" }
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
let activeTipsVideoId = "meeting-follow-up";
let activeExpressionTab = "words";
let activeExpressionFilter = "all";
let tipsChineseVisible = true;

const expressionLibrary = {
  "meeting-follow-up": {
    summary: "职场会议片段，重点练习确认信息、表达顾虑和推动下一步。",
    words: [
      { term: "timeline", phonetic: "/ˈtaɪmlaɪn/", cn: "时间线；进度安排", en: "schedule, sequence", example: "I just want to make sure I understand the timeline.", exampleCn: "我只是想确认一下我理解的时间线是对的。", status: "unmarked" },
      { term: "concern", phonetic: "/kənˈsɜːrn/", cn: "顾虑；担心", en: "worry, issue", example: "That makes sense, but I have one concern.", exampleCn: "这说得通，不过我有一个顾虑。", status: "known" },
      { term: "revisit", phonetic: "/ˌriːˈvɪzɪt/", cn: "重新讨论；再次查看", en: "return to, discuss again", example: "Could we revisit this after we check the numbers?", exampleCn: "我们核对数据之后，能不能再回来看这个问题？", status: "unknown" }
    ],
    phrases: [
      { term: "make sure I understand", phonetic: "", cn: "确认我理解正确", en: "confirm my understanding", example: "I just want to make sure I understand the timeline.", exampleCn: "我只是想确认一下时间线。" },
      { term: "That makes sense, but...", phonetic: "", cn: "这说得通，不过……", en: "polite disagreement starter", example: "That makes sense, but I have one concern.", exampleCn: "这说得通，不过我有一个顾虑。" },
      { term: "after we check the numbers", phonetic: "", cn: "在我们核对数据之后", en: "after verifying the data", example: "Could we revisit this after we check the numbers?", exampleCn: "我们核对数据之后再看这个问题好吗？" }
    ],
    native: [
      { term: "I have one concern.", phonetic: "", cn: "我有一个顾虑。", en: "soft way to raise a disagreement", example: "That makes sense, but I have one concern.", exampleCn: "这说得通，不过我有一个顾虑。" },
      { term: "Could we revisit this...?", phonetic: "", cn: "我们能不能稍后再讨论这个？", en: "meeting-friendly way to defer a decision", example: "Could we revisit this after we check the numbers?", exampleCn: "我们核对数据之后，能不能再回来看这个问题？" }
    ]
  },
  "hotel-checkin": {
    summary: "旅行入住场景，重点练习预订、房型、早餐和礼貌请求。",
    words: [
      { term: "reservation", phonetic: "/ˌrezərˈveɪʃn/", cn: "预订", en: "booking", example: "I have a reservation under Li.", exampleCn: "我用 Li 的名字预订了。", status: "unmarked" },
      { term: "available", phonetic: "/əˈveɪləbl/", cn: "可用的；有空的", en: "free, ready", example: "Is a higher floor available?", exampleCn: "有高楼层房间吗？", status: "unknown" }
    ],
    phrases: [
      { term: "under the name...", phonetic: "", cn: "以……的名字", en: "booking name expression", example: "The reservation is under the name Li.", exampleCn: "预订人姓名是 Li。" },
      { term: "Would it be possible to...?", phonetic: "", cn: "是否可以……？", en: "polite request", example: "Would it be possible to check out late?", exampleCn: "是否可以晚一点退房？" }
    ],
    native: [
      { term: "I have a reservation under...", phonetic: "", cn: "我用……的名字订了房。", en: "natural hotel check-in opener", example: "Hi, I have a reservation under Li.", exampleCn: "你好，我用 Li 的名字订了房。" }
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

function createVideoCard(video, options = {}) {
  const favorite = isFavorite(video.id);
  const status = favorite ? "已收藏" : "收藏";
  const favoriteClass = favorite ? "favorite-button active" : "favorite-button";

  return `
    <article class="video-card" data-video-id="${video.id}">
      <div class="thumb ${video.thumb}"><span>${video.durationMinutes}分钟</span></div>
      <div class="card-body">
        <div class="card-title-row">
          <h2>${video.title}</h2>
          <button class="${favoriteClass}" type="button" data-favorite="${video.id}" aria-label="${status}${video.title}">${status}</button>
        </div>
        <p>${options.context || video.description}</p>
        <div class="tag-row"><span>${video.source}</span><span>${video.topicLabel}</span></div>
        <div class="card-foot"><strong>${video.difficultyLabel}</strong><a href="learn.html?video=${video.id}">继续学习</a></div>
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
    <div class="today-cover thumb ${pick.thumb}"><span>${pick.durationMinutes}分钟</span></div>
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

  const filteredVideos = videos.filter((video) => matchesFilters(video, getFilters()));
  grid.innerHTML = filteredVideos.length
    ? filteredVideos.map((video) => createVideoCard(video)).join("")
    : `<article class="video-card empty-state"><div class="card-body"><h2>没有符合条件的视频</h2><p>换一个筛选条件，继续找今天适合训练的片段。</p></div></article>`;

  document.querySelectorAll("[data-filter]").forEach((select) => {
    select.addEventListener("change", renderLibrary);
  });
  bindFavoriteButtons();
}

function renderFavorites() {
  const grid = document.querySelector("#favorites-grid");
  if (!grid) return;

  const favoriteVideos = videos.filter((video) => getFavorites().includes(video.id));
  grid.innerHTML = favoriteVideos.length
    ? favoriteVideos.map((video) => createVideoCard(video, { context: `已收藏 · ${video.topicLabel} · 适合反复训练` })).join("")
    : `<article class="video-card empty-state"><div class="card-body"><h2>还没有收藏视频</h2><p>回到视频库，点击视频卡片上的“收藏”，这里会自动显示你的复习清单。</p><a class="button secondary" href="index.html">浏览视频</a></div></article>`;
  bindFavoriteButtons();
}

function renderLearnPage() {
  const video = getCurrentVideo();
  const sentences = video.sentences || videos[0].sentences;
  const videoPanel = document.querySelector("#learn-video");
  const sentencePanel = document.querySelector("#learn-sentences");
  const feedbackPanel = document.querySelector("#learn-feedback");
  if (!videoPanel || !sentencePanel || !feedbackPanel) return;

  videoPanel.innerHTML = `
    ${video.videoUrl ? `
      <video class="player media-player ${video.thumb}" controls preload="metadata" poster="">
        <source src="${video.videoUrl}" type="${video.videoType || "video/mp4"}">
        当前浏览器无法播放该 demo 视频。
      </video>
    ` : `<div class="player ${video.thumb}"></div>`}
    <h1>${video.title}</h1>
    <p>${video.description}</p>
    ${video.demoNote ? `<p class="demo-note">${video.demoNote}</p>` : ""}
    <div class="tag-row"><span>${video.topicLabel}</span><span>${video.difficultyLabel}</span><span>${video.durationMinutes}分钟</span></div>
  `;

  sentencePanel.innerHTML = `
    <p class="eyebrow">Sentence Practice</p>
    <h1>逐句精听</h1>
    <div class="sentence-list">
      ${sentences.map((sentence, index) => `
        <button class="sentence ${index === 0 ? "active" : ""}" type="button" data-sentence="${index}">
          <strong>${sentence.english}</strong>
          <span>${sentence.chinese}</span>
          <em class="sentence-tools"><i>播放</i><i>循环</i><i>收藏视频</i></em>
        </button>
      `).join("")}
    </div>
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

  document.querySelectorAll(".sentence").forEach((sentenceButton) => {
    sentenceButton.addEventListener("click", () => {
      const index = Number(sentenceButton.dataset.sentence);
      document.querySelectorAll(".sentence").forEach((item) => item.classList.remove("active"));
      sentenceButton.classList.add("active");
      document.querySelector("#current-sentence").textContent = `当前句：${sentences[index].english}`;
      document.querySelector("#sentence-note").textContent = sentences[index].note;
      recordSentencePractice(video.id, index);
      updateLearnProgressView(video.id);
    });
  });

  bindFavoriteButtons();
  bindLearningActions(video);
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
    : "当前使用本地模拟；部署后配置 OPENAI_API_KEY 可启用真实 AI";

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
  const library = expressionLibrary[videoId] || expressionLibrary["meeting-follow-up"];
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
  const library = expressionLibrary[activeTipsVideoId] || expressionLibrary["meeting-follow-up"];
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
  if (page === "library") renderLibrary();
  if (page === "favorites") renderFavorites();
  if (page === "learn") renderLearnPage();
  if (page === "profile") renderProfile();
  if (page === "ai") renderAiPage();
  if (page === "tips") renderTipsPage();
}

renderCurrentPage();
