const params = new URLSearchParams(window.location.search);
const videoId = params.get("video") || "demo-money-phrases";

const titleEl = document.querySelector("#api-video-title");
const descriptionEl = document.querySelector("#api-video-description");
const progressChip = document.querySelector("#api-progress-chip");
const videoEl = document.querySelector("#api-video");
const subtitleList = document.querySelector("#api-subtitles");
const cardList = document.querySelector("#api-card-list");

let closeReading = { word_cards: [], phrase_cards: [], expression_cards: [] };
let activeTab = "word_cards";
let lastProgressSave = 0;

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatTime(seconds) {
  const safe = Number(seconds || 0);
  const minutes = Math.floor(safe / 60);
  const rest = Math.floor(safe % 60);
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function pickVideoSource(video) {
  if (video.cloudflare_stream_id) {
    return `https://customer-pqultjblfor3dl6u.cloudflarestream.com/${video.cloudflare_stream_id}/manifest/video.m3u8`;
  }
  return video.tencent_cloud_url || video.source_url || "";
}

function renderSubtitles(subtitles) {
  subtitleList.innerHTML = subtitles.map((cue) => `
    <button class="api-subtitle-cue" type="button" data-seek="${cue.start_time}">
      <span>${formatTime(cue.start_time)} - ${formatTime(cue.end_time)}</span>
      <strong>${escapeHtml(cue.english_text)}</strong>
      <small>${escapeHtml(cue.chinese_text)}</small>
    </button>
  `).join("");

  subtitleList.querySelectorAll("[data-seek]").forEach((button) => {
    button.addEventListener("click", () => {
      videoEl.currentTime = Number(button.dataset.seek || 0);
      videoEl.play().catch(() => {});
    });
  });
}

function cardTitle(card) {
  return card.word || card.phrase || card.expression || "学习卡片";
}

function cardDefinition(card) {
  return card.chinese_definition || card.expression_explanation || card.english_definition || "";
}

function renderCards() {
  const cards = closeReading[activeTab] || [];
  cardList.innerHTML = cards.length ? cards.map((card) => `
    <article class="api-learning-card">
      <span>${formatTime(card.first_appearance_time)}</span>
      <strong>${escapeHtml(cardTitle(card))}</strong>
      <p>${escapeHtml(cardDefinition(card))}</p>
      ${card.context || card.example_from_video ? `<small>${escapeHtml(card.context || card.example_from_video)}</small>` : ""}
    </article>
  `).join("") : '<p class="api-empty">暂无卡片</p>';
}

function bindTabs() {
  document.querySelectorAll("[data-card-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      activeTab = button.dataset.cardTab;
      document.querySelectorAll("[data-card-tab]").forEach((item) => {
        item.classList.toggle("active", item === button);
      });
      renderCards();
    });
  });
}

async function loadJson(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`${url} ${response.status}`);
  return response.json();
}

async function saveProgress(force = false) {
  if (!videoEl.duration || Number.isNaN(videoEl.duration)) return;
  const now = Date.now();
  if (!force && now - lastProgressSave < 4000) return;
  lastProgressSave = now;

  const current = Math.floor(videoEl.currentTime || 0);
  const completed = videoEl.duration > 0 && current / videoEl.duration >= 0.9;
  await fetch("/api/user/video-progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      video_id: videoId,
      last_position: current,
      max_progress: current,
      watch_duration: current,
      is_completed: completed
    })
  }).catch(() => {});

  progressChip.textContent = completed ? "已完成" : `进度 ${formatTime(current)}`;
}

async function boot() {
  try {
    const [detail, cards, progress] = await Promise.all([
      loadJson(`/api/videos/${encodeURIComponent(videoId)}/detail`),
      loadJson(`/api/learning/videos/${encodeURIComponent(videoId)}/close-reading`),
      loadJson(`/api/user/video-progress/${encodeURIComponent(videoId)}`)
    ]);

    titleEl.textContent = detail.video.title;
    descriptionEl.textContent = detail.video.description || "";
    videoEl.src = pickVideoSource(detail.video);
    closeReading = cards;
    renderSubtitles(detail.subtitles || []);
    renderCards();

    if (progress?.last_position) {
      videoEl.addEventListener("loadedmetadata", () => {
        videoEl.currentTime = Number(progress.last_position || 0);
      }, { once: true });
      progressChip.textContent = `上次 ${formatTime(progress.last_position)}`;
    } else {
      progressChip.textContent = "未开始";
    }
  } catch (error) {
    titleEl.textContent = "加载失败";
    descriptionEl.textContent = error.message;
    subtitleList.innerHTML = '<p class="api-empty">无法加载字幕。</p>';
  }
}

videoEl.addEventListener("timeupdate", () => saveProgress(false));
videoEl.addEventListener("pause", () => saveProgress(true));
videoEl.addEventListener("ended", () => saveProgress(true));
bindTabs();
boot();
