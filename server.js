import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

function loadLocalEnv() {
  const envPath = join(process.cwd(), ".env");
  if (!existsSync(envPath)) return;
  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [key, ...valueParts] = trimmed.split("=");
    if (!process.env[key]) process.env[key] = valueParts.join("=").replace(/^["']|["']$/g, "");
  }
}

loadLocalEnv();

const rootDir = process.cwd();
const port = Number(process.env.PORT || 3000);
const aiProvider = (process.env.AI_PROVIDER || "minimax").toLowerCase();
const openaiModel = process.env.OPENAI_MODEL || "gpt-5-mini";
const minimaxModel = process.env.MINIMAX_MODEL || "MiniMax-M2.7";
const openaiTranscribeModel = process.env.OPENAI_TRANSCRIBE_MODEL || "whisper-1";
const ffmpegPath = process.env.FFMPEG_PATH || "ffmpeg";
const maxVideoBytes = Number(process.env.VIDEO_MAX_BYTES || 120 * 1024 * 1024);
const dataDir = join(rootDir, "data");
const subtitleJobsPath = join(dataDir, "subtitle-jobs.json");
const appDataPath = join(dataDir, "app-data.json");
const processingDir = join(rootDir, "processing");

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".vtt": "text/vtt; charset=utf-8",
  ".srt": "application/x-subrip; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".doc": "application/msword; charset=utf-8"
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}

function logAiEvent(message, detail = {}) {
  console.log(`[ai] ${message}`, JSON.stringify(detail));
}

async function readRequestJson(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

async function loadSubtitleJobs() {
  try {
    const raw = await readFile(subtitleJobsPath, "utf8");
    return JSON.parse(raw);
  } catch {
    return { jobs: [] };
  }
}

async function saveSubtitleJobs(store) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(subtitleJobsPath, JSON.stringify(store, null, 2), "utf8");
}

function createSeedAppData() {
  const now = new Date().toISOString();
  const videoId = "demo-money-phrases";
  const subtitles = [
    {
      id: "sub-1",
      video_id: videoId,
      start_time: 0,
      end_time: 3.2,
      english_text: "In England, we don't always say pounds.",
      chinese_text: "在英国，人们不总是说 pounds。"
    },
    {
      id: "sub-2",
      video_id: videoId,
      start_time: 3.2,
      end_time: 6.8,
      english_text: "You might hear quid, fiver, or tenner in daily conversation.",
      chinese_text: "日常对话里你可能会听到 quid、fiver 或 tenner。"
    },
    {
      id: "sub-3",
      video_id: videoId,
      start_time: 6.8,
      end_time: 10.4,
      english_text: "These words sound more natural when people talk about money.",
      chinese_text: "人们聊钱时，这些词听起来更自然。"
    }
  ];

  return {
    videos: [
      {
        id: videoId,
        title: "Money words in real English",
        description: "A short demo video record shaped like the future SpeakFlow production data model.",
        thumbnail_url: "",
        thumbnail_url_cn: "",
        cloudflare_stream_id: null,
        tencent_cloud_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        source_url: "",
        status: "published",
        difficulty: "beginner",
        duration: 10,
        display_order: 100,
        created_at: now
      }
    ],
    subtitles,
    subtitle_highlights: [
      {
        id: "hl-1",
        subtitle_id: "sub-2",
        highlighted_html: "You might hear <span class=\"word-highlight\">quid</span>, <span class=\"word-highlight\">fiver</span>, or <span class=\"word-highlight\">tenner</span> in daily conversation.",
        word_matches: [
          { word_card_id: "word-quid", lemma: "quid", matched_text: "quid", start_pos: 15, end_pos: 19 },
          { word_card_id: "word-fiver", lemma: "fiver", matched_text: "fiver", start_pos: 21, end_pos: 26 },
          { word_card_id: "word-tenner", lemma: "tenner", matched_text: "tenner", start_pos: 31, end_pos: 37 }
        ],
        phrase_matches: [],
        created_at: now,
        updated_at: now
      }
    ],
    word_cards: [
      {
        id: "word-quid",
        video_id: videoId,
        word: "quid",
        phonetic: "/kwid/",
        part_of_speech: "noun",
        chinese_definition: "英镑，英国口语表达",
        english_definition: "An informal British word for one pound.",
        example_from_video: "You might hear quid in daily conversation.",
        example_translation: "日常对话里你可能会听到 quid。",
        subtitle_id: "sub-2",
        first_appearance_time: 3.2,
        difficulty_level: "beginner",
        frequency_rank: 1
      }
    ],
    phrase_cards: [
      {
        id: "phrase-daily-conversation",
        video_id: videoId,
        phrase: "daily conversation",
        phonetic: "",
        chinese_definition: "日常对话",
        synonyms: ["everyday talk"],
        context: "You might hear quid, fiver, or tenner in daily conversation.",
        context_translation: "日常对话里你可能会听到 quid、fiver 或 tenner。",
        subtitle_id: "sub-2",
        first_appearance_time: 3.2,
        difficulty_level: "beginner"
      }
    ],
    expression_cards: [
      {
        id: "expr-sound-natural",
        video_id: videoId,
        expression: "sound more natural",
        chinese_definition: "听起来更自然",
        expression_explanation: "Used when describing a phrase that native speakers would normally use.",
        context: "These words sound more natural when people talk about money.",
        context_translation: "人们聊钱时，这些词听起来更自然。",
        subtitle_id: "sub-3",
        first_appearance_time: 6.8,
        formality_level: "neutral"
      }
    ],
    user_video_progress: [],
    user_learning_progress: [],
    user_learning_calendar: []
  };
}

async function loadAppData() {
  try {
    const raw = await readFile(appDataPath, "utf8");
    return JSON.parse(raw);
  } catch {
    return createSeedAppData();
  }
}

async function saveAppData(store) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(appDataPath, JSON.stringify(store, null, 2), "utf8");
}

function getDemoUserId(request) {
  return request.headers["x-speakflow-user-id"] || "demo-user";
}

function secondsToSrtTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const millis = Math.round((totalSeconds - Math.floor(totalSeconds)) * 1000);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")},${String(millis).padStart(3, "0")}`;
}

function secondsToVttTime(totalSeconds) {
  return secondsToSrtTime(totalSeconds).replace(",", ".");
}

function splitTranscript(text) {
  const fallback = [
    "I used to think that learning English was mostly about memorizing words.",
    "But real conversations are faster, messier, and much more alive.",
    "So I started practicing with short videos every day.",
    "I listen sentence by sentence, repeat the rhythm, and write down useful expressions."
  ];
  const source = (text || "").trim()
    ? text.split(/(?<=[.!?。！？])\s+|\n+/)
    : fallback;

  return source
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 12)
    .map((line, index) => {
      const startSeconds = index * 6;
      const endSeconds = startSeconds + Math.max(3.5, Math.min(7, line.split(/\s+/).length * 0.55));
      return {
        id: `cue-${index + 1}`,
        index: index + 1,
        startSeconds,
        endSeconds,
        text: line,
        note: buildManualSubtitleNote()
      };
    });
}

function buildManualSubtitleNote() {
  return {
    translation: "",
    vocabulary: [],
    grammar: "",
    speaking: "",
    shadowing: ""
  };
}

function buildSubtitleNote(text) {
  const words = text
    .replace(/[^a-zA-Z\s'-]/g, "")
    .split(/\s+/)
    .filter((word) => word.length >= 5)
    .slice(0, 4);
  const focusWords = words.length ? words : ["practice", "natural", "sentence"];

  return {
    translation: `中文理解：${text}`,
    vocabulary: focusWords.map((word) => ({
      word,
      meaning: "重点词，请结合上下文记忆",
      example: `Try using "${word}" in your own sentence.`
    })),
    grammar: "观察主语、动词和补充信息的顺序，先抓住句子主干再补细节。",
    speaking: "这句话适合练习自然停顿和重音，不要逐词翻译。",
    shadowing: "先听一遍，再跟读两遍，第三遍尝试不看字幕复述。"
  };
}

function assertDirectVideoUrl(sourceUrl) {
  let parsed;
  try {
    parsed = new URL(sourceUrl);
  } catch {
    throw new Error("请输入有效的视频链接。");
  }
  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("视频链接只支持 http 或 https。");
  }
  return parsed.toString();
}

async function downloadVideoFile(sourceUrl, jobId) {
  const safeUrl = assertDirectVideoUrl(sourceUrl);
  const response = await fetch(safeUrl, { redirect: "follow" });
  if (!response.ok) {
    throw new Error(`视频下载失败：HTTP ${response.status}`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("text/html")) {
    throw new Error("当前链接像是网页链接，不是视频直链。请先使用 .mp4/.webm/.mov 等可直接播放的视频地址。");
  }

  const contentLength = Number(response.headers.get("content-length") || 0);
  if (contentLength > maxVideoBytes) {
    throw new Error(`视频文件过大，当前限制约 ${Math.round(maxVideoBytes / 1024 / 1024)}MB。`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.byteLength > maxVideoBytes) {
    throw new Error(`视频文件过大，当前限制约 ${Math.round(maxVideoBytes / 1024 / 1024)}MB。`);
  }

  const jobDir = join(processingDir, jobId);
  await mkdir(jobDir, { recursive: true });
  const videoPath = join(jobDir, `source${extname(new URL(safeUrl).pathname) || ".mp4"}`);
  await writeFile(videoPath, buffer);
  return { videoPath, jobDir };
}

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { ...options, windowsHide: true });
    let stderr = "";
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", (error) => {
      reject(new Error(`${command} 启动失败：${error.message}`));
    });
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} 执行失败：${stderr.slice(-800) || `退出码 ${code}`}`));
    });
  });
}

function checkCommand(command, args = ["-version"]) {
  return new Promise((resolve) => {
    let child;
    let output = "";
    let settled = false;
    const finish = (payload) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(payload);
    };
    const timer = setTimeout(() => {
      try {
        child.kill();
      } catch {
        // The process may not exist if spawning failed; diagnostics should still return.
      }
      finish({ ok: false, error: `${command} 检查超时` });
    }, 2500);
    try {
      child = spawn(command, args, { windowsHide: true });
    } catch (error) {
      finish({ ok: false, error: error.message });
      return;
    }
    child.stdout.on("data", (chunk) => {
      output += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      output += chunk.toString();
    });
    child.on("error", (error) => {
      finish({ ok: false, error: error.message });
    });
    child.on("close", (code) => {
      finish({
        ok: code === 0,
        detail: output.split(/\r?\n/).find(Boolean) || `exit ${code}`
      });
    });
  });
}

async function extractAudio(videoPath, jobDir) {
  const audioPath = join(jobDir, "audio.mp3");
  await runCommand(ffmpegPath, [
    "-y",
    "-i", videoPath,
    "-vn",
    "-ac", "1",
    "-ar", "16000",
    "-b:a", "64k",
    audioPath
  ]);
  return audioPath;
}

async function transcribeAudio(audioPath) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("缺少 OPENAI_API_KEY，无法进行真实语音识别。请在 .env 中配置。");
  }

  const audioBuffer = await readFile(audioPath);
  const form = new FormData();
  form.append("file", new Blob([audioBuffer], { type: "audio/mpeg" }), "audio.mp3");
  form.append("model", openaiTranscribeModel);
  form.append("response_format", "verbose_json");
  form.append("temperature", "0");
  if (process.env.TRANSCRIPTION_LANGUAGE) {
    form.append("language", process.env.TRANSCRIPTION_LANGUAGE);
  }

  const apiResponse = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` },
    body: form
  });

  if (!apiResponse.ok) {
    const detail = await apiResponse.text();
    throw new Error(`语音识别失败：${detail.slice(0, 600)}`);
  }

  return apiResponse.json();
}

function normalizeTranscriptionCues(transcription) {
  const segments = Array.isArray(transcription.segments) ? transcription.segments : [];
  const source = segments.length
    ? segments.map((segment) => ({
        startSeconds: Number(segment.start || 0),
        endSeconds: Number(segment.end || Number(segment.start || 0) + 4),
        text: String(segment.text || "").trim()
      }))
    : splitTranscript(transcription.text || "").map((cue) => ({
        startSeconds: cue.startSeconds,
        endSeconds: cue.endSeconds,
        text: cue.text
      }));

  return source
    .filter((cue) => cue.text)
    .map((cue, index) => ({
      id: `cue-${index + 1}`,
      index: index + 1,
      startSeconds: cue.startSeconds,
      endSeconds: cue.endSeconds,
      text: cue.text,
      note: null
    }));
}

function parseJsonObject(raw) {
  const text = String(raw || "").trim();
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error("AI 返回内容不是有效 JSON。");
  }
}

function buildAnnotationFallback(text) {
  return {
    ...buildManualSubtitleNote(),
    translation: "AI 备注生成失败，请手动补充。"
  };
}

function normalizeAnnotation(raw, text) {
  const fallback = buildSubtitleNote(text);
  return {
    translation: raw.translation || fallback.translation || "",
    vocabulary: Array.isArray(raw.vocabulary) ? raw.vocabulary : fallback.vocabulary,
    grammar: raw.grammar || fallback.grammar || "",
    speaking: raw.speaking || fallback.speaking || "",
    shadowing: raw.shadowing || fallback.shadowing || ""
  };
}

async function callOpenAIAnnotation(text) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("缺少 OPENAI_API_KEY，无法生成真实 AI 批注。");
  }

  const prompt = [
    "You are an English learning annotation assistant for adult Chinese learners.",
    "Analyze this subtitle and return strict JSON only.",
    "Keys: translation, vocabulary, grammar, speaking, shadowing.",
    "vocabulary must be an array of objects with word, meaning, example.",
    "translation, grammar, speaking, shadowing must be Chinese.",
    `Subtitle: ${text}`
  ].join("\n");

  const apiResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: openaiModel,
      input: prompt
    })
  });

  if (!apiResponse.ok) {
    const detail = await apiResponse.text();
    throw new Error(`AI 批注失败：${detail.slice(0, 600)}`);
  }

  const data = await apiResponse.json();
  return normalizeAnnotation(parseJsonObject(data.output_text || ""), text);
}

async function callMiniMaxAnnotation(text) {
  if (!process.env.MINIMAX_API_KEY) {
    throw new Error("缺少 MINIMAX_API_KEY，无法生成 MiniMax 学习备注。");
  }

  const prompt = [
    "你是面向中国成人学习者的英语视频字幕学习助手。",
    "请只返回严格 JSON，不要 Markdown。",
    "JSON keys: translation, vocabulary, grammar, speaking, shadowing.",
    "vocabulary 是数组，每项包含 word, meaning, example。",
    "translation/grammar/speaking/shadowing 使用中文，务必简洁实用。",
    `字幕：${text}`
  ].join("\n");

  const apiResponse = await fetch("https://api.minimax.io/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.MINIMAX_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: minimaxModel,
      messages: [
        { role: "system", content: "Return only valid JSON." },
        { role: "user", content: prompt }
      ],
      temperature: 0.2,
      max_tokens: 600,
      stream: false
    })
  });

  if (!apiResponse.ok) {
    const detail = await apiResponse.text();
    throw new Error(`MiniMax 备注失败：${detail.slice(0, 600)}`);
  }

  const data = await apiResponse.json();
  const output = data.choices?.[0]?.message?.content || "";
  return normalizeAnnotation(parseJsonObject(output), text);
}

async function callAnnotationProvider(text) {
  if (aiProvider === "openai") return callOpenAIAnnotation(text);
  return callMiniMaxAnnotation(text);
}

function attachManualNotes(cues) {
  return cues.map((cue) => ({ ...cue, note: cue.note || buildManualSubtitleNote() }));
}

async function annotateCues(cues) {
  const annotated = [];
  for (const cue of cues.slice(0, Number(process.env.SUBTITLE_MAX_CUES || 40))) {
    try {
      annotated.push({ ...cue, note: await callAnnotationProvider(cue.text) });
    } catch (error) {
      console.log("[subtitle-ai] annotation fallback", error.message);
      annotated.push({ ...cue, note: buildAnnotationFallback(cue.text) });
    }
  }
  return annotated;
}

async function processRealVideoUrl(payload, jobId, useAiNotes = false) {
  const { videoPath, jobDir } = await downloadVideoFile(payload.sourceUrl, jobId);
  const audioPath = await extractAudio(videoPath, jobDir);
  const transcription = await transcribeAudio(audioPath);
  const cues = normalizeTranscriptionCues(transcription);
  return useAiNotes ? annotateCues(cues) : attachManualNotes(cues);
}

function serializeSubtitleJob(job, format) {
  if (format === "json") return JSON.stringify(job, null, 2);

  if (format === "srt") {
    return job.cues.map((cue, index) => [
      String(index + 1),
      `${secondsToSrtTime(cue.startSeconds)} --> ${secondsToSrtTime(cue.endSeconds)}`,
      cue.text,
      ""
    ].join("\n")).join("\n");
  }

  if (format === "vtt") {
    return `WEBVTT\n\n${job.cues.map((cue) => [
      `${secondsToVttTime(cue.startSeconds)} --> ${secondsToVttTime(cue.endSeconds)}`,
      cue.text,
      ""
    ].join("\n")).join("\n")}`;
  }

  if (format === "doc") {
    return `<!doctype html><html><head><meta charset="utf-8"><title>${job.title}</title></head><body>${serializeSubtitleJob(job, "markdown")
      .replace(/^# (.*)$/m, "<h1>$1</h1>")
      .replace(/^## (.*)$/gm, "<h2>$1</h2>")
      .replace(/\n/g, "<br>")}</body></html>`;
  }

  return [
    `# ${job.title}`,
    "",
    `- 文件：${job.fileName}`,
    job.sourceUrl ? `- 视频链接：${job.sourceUrl}` : "",
    `- 状态：${job.status}`,
    "",
    ...job.cues.flatMap((cue) => [
      `## ${cue.index}. ${secondsToVttTime(cue.startSeconds)} - ${secondsToVttTime(cue.endSeconds)}`,
      "",
      cue.text,
      "",
      `**中文翻译**：${cue.note.translation}`,
      "",
      `**重点词汇**：${cue.note.vocabulary.map((item) => `${item.word}（${item.meaning}）`).join("；")}`,
      "",
      `**语法说明**：${cue.note.grammar}`,
      "",
      `**口语表达**：${cue.note.speaking}`,
      "",
      `**跟读建议**：${cue.note.shadowing}`,
      ""
    ])
  ].join("\n");
}

function exportContentType(format) {
  if (format === "json") return "application/json; charset=utf-8";
  if (format === "srt") return "application/x-subrip; charset=utf-8";
  if (format === "vtt") return "text/vtt; charset=utf-8";
  if (format === "doc") return "application/msword; charset=utf-8";
  return "text/markdown; charset=utf-8";
}

async function handleVideosIndex(response) {
  const store = await loadAppData();
  const items = [...(store.videos || [])]
    .filter((video) => video.status === "published")
    .sort((a, b) => Number(b.display_order || 0) - Number(a.display_order || 0));
  sendJson(response, 200, { items, total: items.length });
}

async function handleVideoDetail(response, videoId) {
  const store = await loadAppData();
  const video = (store.videos || []).find((item) => item.id === videoId && item.status === "published");
  if (!video) {
    sendJson(response, 404, { error: "Video not found" });
    return;
  }
  const subtitles = (store.subtitles || [])
    .filter((item) => item.video_id === videoId)
    .sort((a, b) => Number(a.start_time) - Number(b.start_time));
  sendJson(response, 200, { video, subtitles });
}

async function handleVideoSubtitles(response, videoId) {
  const store = await loadAppData();
  const subtitles = (store.subtitles || [])
    .filter((item) => item.video_id === videoId)
    .sort((a, b) => Number(a.start_time) - Number(b.start_time));
  sendJson(response, 200, subtitles);
}

async function handleVideoSubtitleHighlights(response, videoId) {
  const store = await loadAppData();
  const subtitleIds = new Set((store.subtitles || [])
    .filter((item) => item.video_id === videoId)
    .map((item) => item.id));
  const highlights = (store.subtitle_highlights || [])
    .filter((item) => subtitleIds.has(item.subtitle_id));
  sendJson(response, 200, highlights);
}

async function handleCloseReading(response, videoId) {
  const store = await loadAppData();
  sendJson(response, 200, {
    word_cards: (store.word_cards || []).filter((item) => item.video_id === videoId),
    phrase_cards: (store.phrase_cards || []).filter((item) => item.video_id === videoId),
    expression_cards: (store.expression_cards || []).filter((item) => item.video_id === videoId)
  });
}

async function handleGetVideoProgress(request, response, videoId) {
  const store = await loadAppData();
  const userId = getDemoUserId(request);
  const progress = (store.user_video_progress || [])
    .find((item) => item.user_id === userId && item.video_id === videoId);
  sendJson(response, 200, progress || {
    user_id: userId,
    video_id: videoId,
    last_position: 0,
    max_progress: 0,
    watch_duration: 0,
    is_completed: false,
    updated_at: null
  });
}

async function handleUpsertVideoProgress(request, response) {
  const payload = await readRequestJson(request);
  const store = await loadAppData();
  const userId = payload.user_id || getDemoUserId(request);
  const videoId = payload.video_id;
  if (!videoId) {
    sendJson(response, 400, { error: "video_id is required" });
    return;
  }

  const next = {
    user_id: userId,
    video_id: videoId,
    last_position: Number(payload.last_position || 0),
    max_progress: Number(payload.max_progress || payload.last_position || 0),
    watch_duration: Number(payload.watch_duration || 0),
    is_completed: Boolean(payload.is_completed),
    updated_at: new Date().toISOString()
  };

  const list = store.user_video_progress || [];
  const index = list.findIndex((item) => item.user_id === userId && item.video_id === videoId);
  if (index >= 0) list[index] = { ...list[index], ...next };
  else list.push(next);
  store.user_video_progress = list;

  await saveAppData(store);
  sendJson(response, 200, { success: true, progress: next });
}

async function handleCreateSubtitleJob(request, response) {
  try {
    const payload = await readRequestJson(request);
    const store = await loadSubtitleJobs();
    const now = new Date().toISOString();
    const jobId = `job-${Date.now()}`;
    const shouldProcessRealUrl = payload.sourceType === "url" && payload.sourceUrl && !(payload.transcriptText || "").trim();
    const useAiNotes = Boolean(payload.useAiNotes);
    const job = {
      id: jobId,
      title: payload.title || "SpeakFlow 字幕批注任务",
      fileName: payload.fileName || "demo-video.mp4",
      sourceType: payload.sourceType || "file",
      sourceUrl: payload.sourceUrl || "",
      status: "processing",
      mode: shouldProcessRealUrl ? "real-url" : "manual-transcript",
      annotationMode: useAiNotes ? aiProvider : "manual",
      pipeline: shouldProcessRealUrl
        ? ["download_video", "extract_audio", "transcribe", "segment", useAiNotes ? "ai_annotate" : "manual_notes"]
        : ["manual_transcript", "segment", useAiNotes ? "ai_annotate" : "manual_notes"],
      createdAt: now,
      updatedAt: now,
      cues: []
    };

    try {
      if (shouldProcessRealUrl) {
        job.cues = await processRealVideoUrl(payload, jobId, useAiNotes);
      } else {
        const cues = splitTranscript(payload.transcriptText);
        job.cues = useAiNotes ? await annotateCues(cues) : cues;
      }
      job.status = "completed";
    } catch (error) {
      job.status = "failed";
      job.error = error.message;
    }

    job.updatedAt = new Date().toISOString();
    store.jobs.unshift(job);
    await saveSubtitleJobs(store);
    sendJson(response, job.status === "failed" ? 422 : 201, job);
  } catch (error) {
    sendJson(response, 500, { error: error.message });
  }
}

async function handleGetSubtitleJob(response, jobId) {
  const store = await loadSubtitleJobs();
  const job = store.jobs.find((item) => item.id === jobId);
  if (!job) {
    sendJson(response, 404, { error: "Job not found" });
    return;
  }
  sendJson(response, 200, job);
}

async function handleUpdateSubtitleCue(request, response, jobId, cueId) {
  try {
    const payload = await readRequestJson(request);
    const store = await loadSubtitleJobs();
    const job = store.jobs.find((item) => item.id === jobId);
    const cue = job?.cues.find((item) => item.id === cueId);
    if (!job || !cue) {
      sendJson(response, 404, { error: "Cue not found" });
      return;
    }
    cue.text = payload.text ?? cue.text;
    cue.note = payload.note ?? cue.note;
    job.updatedAt = new Date().toISOString();
    await saveSubtitleJobs(store);
    sendJson(response, 200, cue);
  } catch (error) {
    sendJson(response, 500, { error: error.message });
  }
}

async function handleExportSubtitleJob(response, jobId, format) {
  const store = await loadSubtitleJobs();
  const job = store.jobs.find((item) => item.id === jobId);
  if (!job) {
    sendJson(response, 404, { error: "Job not found" });
    return;
  }
  const safeFormat = ["markdown", "doc", "srt", "vtt", "json"].includes(format) ? format : "markdown";
  response.writeHead(200, {
    "Content-Type": exportContentType(safeFormat),
    "Content-Disposition": `attachment; filename="speakflow-subtitles.${safeFormat === "markdown" ? "md" : safeFormat}"`
  });
  response.end(serializeSubtitleJob(job, safeFormat));
}

function buildPrompt(payload) {
  const messages = Array.isArray(payload.messages) ? payload.messages : [];
  const lastUser = [...messages].reverse().find((message) => message.role === "user")?.content || "";

  return [
    `场景：${payload.scenarioTitle || payload.scenario || "英语口语练习"}`,
    `目标：${payload.goal || "帮助学习者完成自然英文对话"}`,
    `学习者刚才说：${lastUser}`,
    "",
    "请返回严格 JSON，不要 Markdown：",
    '{"reply":"一句自然的英文追问或回应","score":88,"feedback":"中文反馈","suggestion":"更自然的英文改写"}'
  ].join("\n");
}

async function callOpenAI(payload) {
  if (!process.env.OPENAI_API_KEY) {
    logAiEvent("fallback", { reason: "OPENAI_API_KEY missing" });
    return { fallback: true, error: "OPENAI_API_KEY is not configured." };
  }

  const apiResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: openaiModel,
      instructions: [
        "You are SpeakFlow's English speaking coach for adult Chinese learners.",
        "Keep replies short, practical, and scenario-specific.",
        "Return only valid JSON with keys reply, score, feedback, suggestion.",
        "feedback must be Chinese. reply and suggestion must be English."
      ].join(" "),
      input: buildPrompt(payload)
    })
  });

  if (!apiResponse.ok) {
    const detail = await apiResponse.text();
    logAiEvent("openai error", {
      status: apiResponse.status,
      statusText: apiResponse.statusText,
      detail: detail.slice(0, 600)
    });
    return { fallback: true, error: detail };
  }

  const data = await apiResponse.json();
  const output = data.output_text || "";
  logAiEvent("openai ok", { model: openaiModel, hasOutput: Boolean(output) });

  try {
    return JSON.parse(output);
  } catch {
    logAiEvent("json parse fallback", { output: output.slice(0, 300) });
    return {
      reply: output.trim() || "Could you say a little more about that?",
      score: 78,
      feedback: "模型返回了自然回复，但格式不是完整 JSON。当前已转为可显示内容。",
      suggestion: "Try giving one more specific detail."
    };
  }
}

async function callMiniMax(payload) {
  if (!process.env.MINIMAX_API_KEY) {
    logAiEvent("fallback", { reason: "MINIMAX_API_KEY missing" });
    return { fallback: true, error: "MINIMAX_API_KEY is not configured." };
  }

  const apiResponse = await fetch("https://api.minimax.io/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.MINIMAX_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: minimaxModel,
      messages: [
        {
          role: "system",
          content: [
            "You are SpeakFlow's English speaking coach for adult Chinese learners.",
            "Keep replies short, practical, and scenario-specific.",
            "Return only valid JSON with keys reply, score, feedback, suggestion.",
            "feedback must be Chinese. reply and suggestion must be English."
          ].join(" ")
        },
        { role: "user", content: buildPrompt(payload) }
      ],
      temperature: 0.6,
      max_tokens: 400,
      stream: false
    })
  });

  if (!apiResponse.ok) {
    const detail = await apiResponse.text();
    logAiEvent("minimax error", {
      status: apiResponse.status,
      statusText: apiResponse.statusText,
      detail: detail.slice(0, 600)
    });
    return { fallback: true, error: detail };
  }

  const data = await apiResponse.json();
  const output = data.choices?.[0]?.message?.content || "";
  logAiEvent("minimax ok", { model: minimaxModel, hasOutput: Boolean(output) });

  try {
    return JSON.parse(output);
  } catch {
    logAiEvent("json parse fallback", { provider: "minimax", output: output.slice(0, 300) });
    return {
      reply: output.trim() || "Could you say a little more about that?",
      score: 78,
      feedback: "模型返回了自然回复，但格式不是完整 JSON。当前已转为可显示内容。",
      suggestion: "Try giving one more specific detail."
    };
  }
}

function isAiConfigured() {
  if (aiProvider === "openai") return Boolean(process.env.OPENAI_API_KEY);
  return Boolean(process.env.MINIMAX_API_KEY);
}

function getActiveModel() {
  if (aiProvider === "openai") return openaiModel;
  return minimaxModel;
}

async function callAiProvider(payload) {
  if (aiProvider === "openai") return callOpenAI(payload);
  return callMiniMax(payload);
}

async function handleAiChat(request, response) {
  try {
    const payload = await readRequestJson(request);
    logAiEvent("chat request", {
      scenario: payload.scenario,
      messageCount: Array.isArray(payload.messages) ? payload.messages.length : 0,
      aiConfigured: isAiConfigured(),
      provider: aiProvider,
      model: getActiveModel()
    });
    const result = await callAiProvider(payload);
    logAiEvent("chat response", { fallback: Boolean(result.fallback), score: result.score });
    sendJson(response, 200, result);
  } catch (error) {
    logAiEvent("server error", { error: error.message });
    sendJson(response, 500, { fallback: true, error: error.message });
  }
}

async function handleAiDebug(response) {
  const payload = {
    scenario: "coffee",
    scenarioTitle: "咖啡店点单",
    goal: "完成一次自然点单",
    messages: [{ role: "user", content: "I'd like a medium iced latte, please." }]
  };
  logAiEvent("debug request", { aiConfigured: isAiConfigured(), provider: aiProvider, model: getActiveModel() });
  const result = await callAiProvider(payload);
  logAiEvent("debug response", { fallback: Boolean(result.fallback), score: result.score });
  sendJson(response, 200, result);
}

function handleHealth(response) {
  sendJson(response, 200, {
    ok: true,
    aiConfigured: isAiConfigured(),
    provider: aiProvider,
    model: getActiveModel(),
    service: "speakflow"
  });
}

async function handleSubtitleDiagnostics(response) {
  const ffmpeg = await checkCommand(ffmpegPath);
  const openaiReady = Boolean(process.env.OPENAI_API_KEY);
  const aiNotesReady = aiProvider === "openai"
    ? Boolean(process.env.OPENAI_API_KEY)
    : Boolean(process.env.MINIMAX_API_KEY);
  sendJson(response, 200, {
    ok: ffmpeg.ok && openaiReady,
    realUrlReady: ffmpeg.ok && openaiReady,
    ffmpeg: {
      ok: ffmpeg.ok,
      path: ffmpegPath,
      detail: ffmpeg.detail || ffmpeg.error || ""
    },
    openai: {
      ok: openaiReady,
      transcriptionModel: openaiTranscribeModel,
      annotationModel: openaiModel
    },
    aiNotes: {
      ok: aiNotesReady,
      provider: aiProvider,
      model: getActiveModel(),
      detail: aiNotesReady ? "" : aiProvider === "openai" ? "缺少 OPENAI_API_KEY" : "缺少 MINIMAX_API_KEY"
    },
    limits: {
      maxVideoMb: Math.round(maxVideoBytes / 1024 / 1024),
      maxCues: Number(process.env.SUBTITLE_MAX_CUES || 40)
    }
  });
}

function getStaticPath(url) {
  const pathname = decodeURIComponent(new URL(url, "http://localhost").pathname);
  const requested = pathname === "/" ? "/index.html" : pathname;
  const normalized = normalize(requested).replace(/^(\.\.[/\\])+/, "");
  return join(rootDir, normalized);
}

async function serveStatic(request, response) {
  try {
    const filePath = getStaticPath(request.url);
    const body = await readFile(filePath);
    const contentType = contentTypes[extname(filePath).toLowerCase()] || "application/octet-stream";
    response.writeHead(200, { "Content-Type": contentType });
    response.end(body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, "http://localhost");

  if (request.method === "GET" && request.url === "/api/health") {
    handleHealth(response);
    return;
  }

  if (request.method === "GET" && request.url === "/api/ai/debug") {
    await handleAiDebug(response);
    return;
  }

  if (request.method === "POST" && request.url === "/api/ai/chat") {
    await handleAiChat(request, response);
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/videos") {
    await handleVideosIndex(response);
    return;
  }

  const videoDetailMatch = url.pathname.match(/^\/api\/videos\/([^/]+)\/detail$/);
  if (request.method === "GET" && videoDetailMatch) {
    await handleVideoDetail(response, decodeURIComponent(videoDetailMatch[1]));
    return;
  }

  const videoSubtitlesMatch = url.pathname.match(/^\/api\/videos\/([^/]+)\/subtitles$/);
  if (request.method === "GET" && videoSubtitlesMatch) {
    await handleVideoSubtitles(response, decodeURIComponent(videoSubtitlesMatch[1]));
    return;
  }

  const videoHighlightsMatch = url.pathname.match(/^\/api\/videos\/([^/]+)\/subtitle-highlights$/);
  if (request.method === "GET" && videoHighlightsMatch) {
    await handleVideoSubtitleHighlights(response, decodeURIComponent(videoHighlightsMatch[1]));
    return;
  }

  const closeReadingMatch = url.pathname.match(/^\/api\/learning\/videos\/([^/]+)\/close-reading$/);
  if (request.method === "GET" && closeReadingMatch) {
    await handleCloseReading(response, decodeURIComponent(closeReadingMatch[1]));
    return;
  }

  const progressMatch = url.pathname.match(/^\/api\/user\/video-progress\/([^/]+)$/);
  if (request.method === "GET" && progressMatch) {
    await handleGetVideoProgress(request, response, decodeURIComponent(progressMatch[1]));
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/user/video-progress") {
    await handleUpsertVideoProgress(request, response);
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/subtitle/jobs") {
    await handleCreateSubtitleJob(request, response);
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/subtitle/diagnostics") {
    await handleSubtitleDiagnostics(response);
    return;
  }

  const jobMatch = url.pathname.match(/^\/api\/subtitle\/jobs\/([^/]+)$/);
  if (request.method === "GET" && jobMatch) {
    await handleGetSubtitleJob(response, jobMatch[1]);
    return;
  }

  const exportMatch = url.pathname.match(/^\/api\/subtitle\/jobs\/([^/]+)\/export$/);
  if (request.method === "GET" && exportMatch) {
    await handleExportSubtitleJob(response, exportMatch[1], url.searchParams.get("format") || "markdown");
    return;
  }

  const cueMatch = url.pathname.match(/^\/api\/subtitle\/jobs\/([^/]+)\/cues\/([^/]+)$/);
  if (request.method === "PUT" && cueMatch) {
    await handleUpdateSubtitleCue(request, response, cueMatch[1], cueMatch[2]);
    return;
  }

  if (request.method === "GET" || request.method === "HEAD") {
    await serveStatic(request, response);
    return;
  }

  sendJson(response, 405, { error: "Method not allowed" });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`SpeakFlow listening on http://0.0.0.0:${port}`);
});
