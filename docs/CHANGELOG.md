# SpeakFlow Changelog

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
