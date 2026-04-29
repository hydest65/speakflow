const form = document.querySelector("#subtitle-job-form");
const fileInput = document.querySelector("#video-file");
const urlInput = document.querySelector("#video-url");
const transcriptInput = document.querySelector("#transcript-text");
const useAiNotesInput = document.querySelector("#use-ai-notes");
const video = document.querySelector("#subtitle-video");
const emptyVideo = document.querySelector("#empty-video");
const cueList = document.querySelector("#subtitle-cue-list");
const statusLabel = document.querySelector("#subtitle-job-status");
const diagnosticsPanel = document.querySelector("#subtitle-diagnostics");

let activeJob = null;

function renderDiagnostics(data) {
  if (!diagnosticsPanel) return;
  const items = [
    data.ffmpeg?.ok ? `FFmpeg 已就绪：${data.ffmpeg.path}` : `FFmpeg 未就绪：${data.ffmpeg?.detail || "请安装 FFmpeg 或配置 FFMPEG_PATH"}`,
    data.openai?.ok ? `OpenAI 已配置：${data.openai.transcriptionModel}` : "OpenAI API Key 未配置：请在 .env 中填写 OPENAI_API_KEY",
    data.aiNotes?.ok ? `AI 备注可用：${data.aiNotes.provider}` : `AI 备注未启用：${data.aiNotes?.detail || "可先使用人工备注模板"}`,
    `视频大小限制：${data.limits?.maxVideoMb || 120}MB`
  ];

  diagnosticsPanel.classList.toggle("ready", Boolean(data.realUrlReady));
  diagnosticsPanel.innerHTML = `
    <strong>${data.realUrlReady ? "真实直链解析可用" : "真实直链解析待配置"}</strong>
    <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
  `;
}

async function loadDiagnostics() {
  if (!diagnosticsPanel) return;
  try {
    const response = await fetch("/api/subtitle/diagnostics");
    renderDiagnostics(await response.json());
  } catch {
    diagnosticsPanel.textContent = "暂时无法检查真实解析配置。";
  }
}

function formatClock(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function renderVocabulary(items) {
  return (items || [])
    .map((item) => `<span>${item.word}<small>${item.meaning}</small></span>`)
    .join("");
}

function renderCue(cue) {
  return `
    <article class="subtitle-cue-card" data-cue-id="${cue.id}">
      <button class="cue-time" type="button" data-seek="${cue.startSeconds}">
        ${formatClock(cue.startSeconds)} - ${formatClock(cue.endSeconds)}
      </button>
      <label>
        <span>字幕文本</span>
        <textarea data-field="text" rows="2">${cue.text}</textarea>
      </label>
      <label>
        <span>中文翻译</span>
        <textarea data-field="translation" rows="2">${cue.note.translation}</textarea>
      </label>
      <div class="cue-note-grid">
        <div>
          <strong>重点词汇</strong>
          <div class="vocab-tags">${renderVocabulary(cue.note.vocabulary)}</div>
        </div>
        <label>
          <span>语法说明</span>
          <textarea data-field="grammar" rows="2">${cue.note.grammar}</textarea>
        </label>
        <label>
          <span>口语表达</span>
          <textarea data-field="speaking" rows="2">${cue.note.speaking}</textarea>
        </label>
        <label>
          <span>跟读建议</span>
          <textarea data-field="shadowing" rows="2">${cue.note.shadowing}</textarea>
        </label>
      </div>
      <button class="button secondary save-cue" type="button">保存本条</button>
    </article>
  `;
}

function renderJob(job) {
  activeJob = job;
  if (job.status === "failed") {
    statusLabel.textContent = "处理失败";
    cueList.innerHTML = `<p class="subtitle-empty-state">${job.error || "真实解析失败，请检查视频链接、FFmpeg 和 API Key 配置。"}</p>`;
    return;
  }
  statusLabel.textContent = `${job.status === "completed" ? "已完成" : "处理中"} · ${job.cues.length} 条`;
  cueList.innerHTML = job.cues.map(renderCue).join("");

  cueList.querySelectorAll("[data-seek]").forEach((button) => {
    button.addEventListener("click", () => {
      video.currentTime = Number(button.dataset.seek);
      video.play().catch(() => {});
    });
  });

  cueList.querySelectorAll(".save-cue").forEach((button) => {
    button.addEventListener("click", async () => {
      const card = button.closest(".subtitle-cue-card");
      const cueId = card.dataset.cueId;
      const cue = activeJob.cues.find((item) => item.id === cueId);
      const nextCue = {
        ...cue,
        text: card.querySelector('[data-field="text"]').value,
        note: {
          ...cue.note,
          translation: card.querySelector('[data-field="translation"]').value,
          grammar: card.querySelector('[data-field="grammar"]').value,
          speaking: card.querySelector('[data-field="speaking"]').value,
          shadowing: card.querySelector('[data-field="shadowing"]').value
        }
      };

      button.textContent = "保存中";
      const response = await fetch(`/api/subtitle/jobs/${activeJob.id}/cues/${cueId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nextCue)
      });
      const saved = await response.json();
      activeJob.cues = activeJob.cues.map((item) => item.id === cueId ? saved : item);
      button.textContent = "已保存";
      setTimeout(() => {
        button.textContent = "保存本条";
      }, 900);
    });
  });
}

function bindVideoPreview(file) {
  if (!file) return;
  video.src = URL.createObjectURL(file);
  video.style.display = "block";
  emptyVideo.style.display = "none";
}

function bindVideoUrlPreview(url) {
  const trimmed = (url || "").trim();
  if (!trimmed) return false;
  video.src = trimmed;
  video.style.display = "block";
  emptyVideo.style.display = "none";
  return true;
}

function getTitleFromUrl(url) {
  try {
    const parsed = new URL(url);
    const lastSegment = parsed.pathname.split("/").filter(Boolean).pop() || parsed.hostname;
    return decodeURIComponent(lastSegment).replace(/\.[^.]+$/, "") || parsed.hostname;
  } catch {
    return "Video Link";
  }
}

async function createJob(event) {
  event.preventDefault();
  const file = fileInput.files[0];
  const sourceUrl = urlInput.value.trim();
  const useAiNotes = Boolean(useAiNotesInput?.checked);
  if (!bindVideoUrlPreview(sourceUrl)) bindVideoPreview(file);
  statusLabel.textContent = "处理中";
  cueList.innerHTML = sourceUrl && !transcriptInput.value.trim()
    ? `<p class="subtitle-empty-state">正在下载视频、提取音频并进行真实语音识别${useAiNotes ? "，随后调用 MiniMax 生成学习备注" : "，备注将生成可手动填写的模板"}...</p>`
    : `<p class="subtitle-empty-state">正在切分字幕${useAiNotes ? "并调用 MiniMax 生成学习备注" : "并生成手动备注模板"}...</p>`;

  const response = await fetch("/api/subtitle/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sourceType: sourceUrl ? "url" : "file",
      sourceUrl,
      useAiNotes,
      fileName: sourceUrl || file?.name || "demo-video.mp4",
      title: sourceUrl ? getTitleFromUrl(sourceUrl) : file?.name ? file.name.replace(/\.[^.]+$/, "") : "SpeakFlow Demo",
      transcriptText: transcriptInput.value
    })
  });

  const job = await response.json();
  renderJob(job);
}

function bindExports() {
  document.querySelectorAll("[data-export]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!activeJob) {
        statusLabel.textContent = "请先生成字幕";
        return;
      }
      const format = button.dataset.export;
      window.location.href = `/api/subtitle/jobs/${activeJob.id}/export?format=${format}`;
    });
  });
}

fileInput?.addEventListener("change", () => bindVideoPreview(fileInput.files[0]));
urlInput?.addEventListener("change", () => bindVideoUrlPreview(urlInput.value));
form?.addEventListener("submit", createJob);
bindExports();
loadDiagnostics();
