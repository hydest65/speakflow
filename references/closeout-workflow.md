# SpeakFlow Closeout Workflow

When closing out a version:

1. Summarize user-visible changes.
2. Update `docs/CHANGELOG.md`.
3. Update affected sections of `docs/PRODUCT_REQUIREMENTS.md`, `docs/TECHNICAL_PLAN.md`, and `docs/STYLE_GUIDE.md`.
4. Update `docs/VERSION_CLOSEOUT.md` when release status, deployment steps, or sync instructions change.
5. Check that the static pages open and navigation links are valid.
6. Check Git state if available.
7. If a remote exists, compare local and remote before pushing.
8. If Git CLI is blocked, use GitHub Desktop as the fallback.
