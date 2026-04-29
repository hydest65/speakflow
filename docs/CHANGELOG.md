# SpeakFlow Changelog

## Unreleased

## 0.1.5 - 2026-04-29

### Added

- Added a Subtitle AI Lab page for video-link subtitle parsing, cue editing, learning notes, and Markdown/Word/SRT/VTT/JSON export.
- Added a real direct-video-link processing path that can download video, extract audio with FFmpeg, transcribe with OpenAI audio transcription, and generate cue-level learning annotations.
- Added `/api/subtitle/jobs`, `/api/subtitle/jobs/:jobId`, cue update, export, and diagnostics endpoints.
- Added `.env.example` settings for OpenAI transcription, FFmpeg, video size limits, and max annotated cues.
- Added `.gitignore` rules for secrets, generated job data, uploads, and processing artifacts.
- Added a full video-subtitle-AI system design document covering architecture, database design, API design, MVP behavior, and next steps.
- Added a subtitle data specification covering normalized cue fields, VTT mapping, and next data-source decisions.

### Changed

- The subtitle lab now distinguishes real direct-link processing from manual transcript mode and surfaces environment readiness in the UI.
- Normalized inline sentence data and parsed VTT subtitles through a shared cue model before rendering the learning page.
- Reused one subtitle click binding path for initial inline data and asynchronously loaded VTT data.

## 0.1.4 - 2026-04-28

### Changed

- Polished the video library with search, result summary, learning-state badges, and clearer video-card training metadata.
- Added an external embed material mode with a TED example, official-source attribution, and learning-page iframe rendering.
- Switched the homepage video library to 8 TED language-learning materials with official embed links and TED/source filters.
- Updated homepage video previews to use static TED cover posters without play controls.
- Made TED cover posters distinct with per-video speakers, focus phrases, colors, and visual marks.
- Promoted TED speakers into a visible speaker label on each homepage cover poster.
- Removed the TED wordmark from homepage cover posters and placed the speaker name in the top-left cover position.
- Added portrait-style speaker avatars to TED homepage cover posters, ready to swap for licensed speaker photos later.
- Reworked speaker avatars into distinct cartoon-style portraits to avoid relying on copyrighted speaker photos.
- Added a first-pass word precision module on the learning page with sentence parsing, word chips, and per-word usage details.
- Reworked the learning page into a scrollable sentence stream with a fixed word precision panel and narrower video column.
- Rebuilt the learning page layout as a fixed-height three-column workbench to stabilize video, sentence stream, shadowing, and word precision areas.
- Removed the word precision panel from the learning page and tightened sentence-stream typography for a cleaner shadowing layout.
- Rebuilt the learning page again to match the reference layout: two-column video/subtitle workspace, hidden global nav, video intro card, subtitle toolbar, and floating auto-scroll control.
- Added a local WebVTT subtitle pipeline for the learning page, with VTT parsing, subtitleUrl support, and fallback to built-in sentence data.
- Added `text/vtt` static serving support for local subtitle files.

## 0.1.3 - 2026-04-28

### Added

- Added local learning progress for sentence practice, shadowing, AI score state, daily check-in, and member learning records.
- Added interactive AI speaking scenarios with local simulated replies, scoring, and feedback.
- Connected AI speaking practice scores and practice rounds to the member learning record.
- Added a temporary CC0 demo video on the learning page to test the media player flow.
- Reworked Tips into a video-based expression lab with tabs for words, phrases, and native expressions.
- Added a Node.js backend proxy for `/api/ai/chat`, with OpenAI Responses API support and local fallback in the frontend.
- Added `.env.example`, `/api/health`, and clearer AI mode messaging for deployment checks.
- Added `/api/ai/debug` for browser-based backend AI diagnostics.
- Added MiniMax provider support through `AI_PROVIDER=minimax` and `MINIMAX_API_KEY`.

### Notes

- The Render service can now read provider configuration and route AI requests through the backend proxy. Live MiniMax testing still depends on a valid MiniMax API key; an `invalid api key (2049)` response means the key must be regenerated or replaced in Render.

## 0.1.2 - 2026-04-28

### Added

- Added local JavaScript video data as the shared source for the video library, favorites page, and learning page.
- Added interactive video filtering by topic, difficulty, duration, and source.
- Added video favorite toggles with `localStorage` persistence.
- Added a dynamic favorites page that reflects the user's saved videos.
- Added dynamic learning-page content based on the selected video.

## 0.1.1 - 2026-04-28

### Fixed

- Restored corrupted Chinese text across the static pages.
- Fixed malformed HTML tags in the navigation, AI practice, pricing, and learning pages.
- Removed decorative page background orbs and kept the interface closer to a restrained learning workbench.
- Restored core project documentation to readable UTF-8 Chinese.
- Added lightweight project references for future skill-based continuation.

## 0.1.0 - 2026-04-28

### Added

- First deployable static prototype.
- Video library as the default entry page.
- Favorites page for saved videos.
- Tips page for real-video learning methods.
- AI speaking practice page with scenario list, dialogue area, and feedback panel.
- Membership page combining yearly membership value and learning records.
- Follow-along learning page with video, sentence practice, and AI score columns.
- Render static site configuration in `render.yaml`.
- Render deployment notes in `docs/RENDER_DEPLOY.md`.

### Notes

- This version is still a static prototype. Real video playback, login, persistent favorites, recording upload, AI scoring APIs, and yearly membership payment are not connected yet.
