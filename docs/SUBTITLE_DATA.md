# SpeakFlow Subtitle Data Specification

This document defines the lightweight subtitle model used by the current prototype.
It is intentionally small so the project can support manual entry, local VTT files,
and future backend parsing without changing the learning page UI.

## Cue Model

Each subtitle cue should normalize to this shape before rendering:

```ts
type SubtitleCue = {
  id: string;
  videoId: string;
  index: number;
  startSeconds: number;
  endSeconds: number;
  start: string;
  end: string;
  english: string;
  chinese: string;
  note: string;
  keywords: string[];
  source: "inline" | "vtt" | "srt" | "api";
};
```

## Field Rules

- `id`: stable cue identifier, preferably `${videoId}-cue-001`.
- `videoId`: the owning video id from the video library.
- `index`: zero-based cue order for rendering and progress tracking.
- `startSeconds` and `endSeconds`: numeric timing used for later player sync.
- `start` and `end`: display-friendly timing such as `0:07`.
- `english`: required English subtitle text.
- `chinese`: optional Chinese translation for learner support.
- `note`: expression or usage note shown in the learning panel.
- `keywords`: optional word or phrase ids for future vocabulary review.
- `source`: where the cue came from.

## VTT Mapping

Local `.vtt` files should use this simple bilingual cue body:

```vtt
WEBVTT

00:00:01.000 --> 00:00:05.000
EN: English is fast becoming the world's universal language.
ZH: 英语正在快速成为世界通用语言。
```

The frontend parser maps each cue to `SubtitleCue`, preserving numeric timing and
display timing. If a VTT file cannot load, the learning page falls back to the
video's inline `sentences`.

## Current Implementation

- `app.js` normalizes inline `sentences` and parsed VTT cues through
  `normalizeSubtitleCues()`.
- The learning page renders only normalized cue data.
- Progress currently records `${videoId}:${index}`. This keeps existing local
  progress compatible while leaving `id` ready for a future backend.

## Next Decisions

- Decide whether production subtitles are authored as VTT, JSON, or imported SRT.
- Add a small validation script before importing larger subtitle batches.
- Reconnect word precision and vocabulary review after the cue model is stable.
