# Job Application Tracker

A tracking system for job-application "bidders" who apply to jobs on behalf of client profiles. Includes:

- Email/password + Google sign-in
- Two roles: **Bidder** (logs their own applications) and **Manager** (sees everyone's)
- Dashboard with weekly stats (total, pending, approved, rejected)
- Applications list with search/status/date/profile filters, inline approve/reject
- Multiple client profiles per bidder (CV details, contact info, work experience, education, skills)
- A Chrome extension that lets a bidder log an application from any job posting tab

Stack: **Next.js 14 (App Router) + PostgreSQL + Prisma + NextAuth + Tailwind CSS**.

---

## 1. Local setup

```bash
git clone <your-repo-url>
cd usjobhunter
npm install
cp .env.example .env
```

Edit `.env`:

- `DATABASE_URL` — a Postgres connection string. Easiest free options: [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Vercel Postgres](https://vercel.com/storage/postgres).
- `NEXTAUTH_SECRET` — generate one with `openssl rand -base64 32`.
- `NEXTAUTH_URL` — `http://localhost:3000` for local dev.
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — only needed if you want "Continue with Google" to work. Create credentials at the [Google Cloud Console](https://console.cloud.google.com/apis/credentials); add `http://localhost:3000/api/auth/callback/google` (and your production URL's equivalent) as an authorized redirect URI. You can leave these blank and just use email/password.

Push the schema to your database:

```bash
npx prisma db push
```

(Optional) Seed a demo manager, bidder, and sample data:

```bash
npm run db:seed
```

This creates `manager@example.com` / `manager123` and `bidder@example.com` / `bidder123`.

Run the app:

```bash
npm run dev
```

Visit `http://localhost:3000` — the **first account you register** (via the signup form) automatically becomes a **Manager**; every account after that is a **Bidder**. A manager can be promoted/demoted later by editing the `role` column directly, or you can add an admin UI for it.

---

## 2. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

`.env` is already git-ignored, so your secrets won't be committed — only `.env.example` is.

---

## 3. Deploy (Vercel is the easiest path for Next.js)

1. Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repo.
2. Add the same environment variables from your `.env` file in the Vercel project settings (use your production `DATABASE_URL` and set `NEXTAUTH_URL` to your Vercel domain).
3. Deploy. Vercel runs `npm run build`, which runs `prisma generate` automatically (see `postinstall` in `package.json`).
4. Run `npx prisma db push` once against your production database (from your machine, with `DATABASE_URL` pointed at production) to create the tables there too.

Any other Node host (Railway, Render, Fly.io) works the same way — just make sure `DATABASE_URL`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL` are set.

---

## 4. The Chrome extension

The `extension/` folder is a separate, self-contained Chrome extension (Manifest V3). It's already zipped as `public/extension.zip`, so once deployed, your dashboard's **Chrome Extension** page download button works out of the box.

Bidders:
1. Load it unpacked via `chrome://extensions` (see `extension/README.md`).
2. Generate a token from **Dashboard → Chrome Extension**.
3. Paste their dashboard URL + token into the extension's settings.
4. Log applications straight from any job posting tab.

If you rename or move the app's domain, update `host_permissions` in `extension/manifest.json` before re-zipping (`cd extension && zip -r ../public/extension.zip .`).

---

## 5. Project structure

```
app/
  api/                  API routes (auth, applications, profiles, stats, extension)
  dashboard/            Bidder + manager pages (protected by middleware.ts)
  login/                Sign in / sign up
components/             Shared React components
lib/                    Prisma client, NextAuth config, role helpers
prisma/schema.prisma    Database schema
extension/              Chrome extension source (also zipped into public/)
```

## 6. Roles at a glance

| | Bidder | Manager |
|---|---|---|
| See own applications & profiles | ✅ | ✅ |
| See every bidder's applications | ❌ | ✅ |
| Team overview page | ❌ | ✅ |

## Notes / next steps you may want to add

- A manager UI to promote/demote bidder roles (currently a direct DB edit).
- File uploads for CVs (currently `resumeUrl` just stores a link — wire up something like Vercel Blob or S3 if you want in-app uploads).
- Automatic "match scoring" against a job posting (currently `matchReason` is a free-text field you or the bidder fills in).
