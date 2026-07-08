# AGENTS.md

## Cursor Cloud specific instructions

`dorsa-site` is a single Next.js 16 (App Router) + React 19 + TypeScript marketing/landing site for a fitness coaching business. There is one runnable service; no database, cache, or other backing services are required. Package manager is npm (`package-lock.json`).

Standard commands live in `package.json` (`dev`, `build`, `start`, `lint`); run them from the repo root.

- Dev server: `npm run dev` → http://localhost:3000 (Turbopack). This is the only service to run for development/testing.
- Build: `npm run build` (also runs TypeScript type checking).
- Lint: `npm run lint`. Note: the repo currently has a pre-existing lint error in `app/components/layout/Navbar.tsx` (`react-hooks/set-state-in-effect`) and a font warning in `app/layout.tsx`; these are unrelated to environment setup — do not "fix" them unless that is the task.
- Tests: none exist (no test framework configured).

Non-obvious behavior for the core flow (coaching application form → `POST /api/coaching-application`):
- Email is only actually sent via Resend in `production`. In `development` the API validates the submission, logs the payload to the dev-server console, and returns `201` **without** sending email — so the full end-to-end form flow can be tested locally with no API keys.
- Optional env vars (only affect email sending, all optional for local dev): `RESEND_API_KEY`, `COACHING_APPLICATION_EMAIL`, `RESEND_FROM_EMAIL`, and `NEXT_PUBLIC_CONTACT_EMAIL`. There is no `.env.example`; env vars are read directly from `process.env`.
