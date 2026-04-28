import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const rootDir = process.cwd();
const port = Number(process.env.PORT || 3000);
const model = process.env.OPENAI_MODEL || "gpt-5-mini";

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
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
      model,
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
  logAiEvent("openai ok", { model, hasOutput: Boolean(output) });

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

async function handleAiChat(request, response) {
  try {
    const payload = await readRequestJson(request);
    logAiEvent("chat request", {
      scenario: payload.scenario,
      messageCount: Array.isArray(payload.messages) ? payload.messages.length : 0,
      aiConfigured: Boolean(process.env.OPENAI_API_KEY),
      model
    });
    const result = await callOpenAI(payload);
    logAiEvent("chat response", { fallback: Boolean(result.fallback), score: result.score });
    sendJson(response, 200, result);
  } catch (error) {
    logAiEvent("server error", { error: error.message });
    sendJson(response, 500, { fallback: true, error: error.message });
  }
}

function handleHealth(response) {
  sendJson(response, 200, {
    ok: true,
    aiConfigured: Boolean(process.env.OPENAI_API_KEY),
    model,
    service: "speakflow"
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
  if (request.method === "GET" && request.url === "/api/health") {
    handleHealth(response);
    return;
  }

  if (request.method === "POST" && request.url === "/api/ai/chat") {
    await handleAiChat(request, response);
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
