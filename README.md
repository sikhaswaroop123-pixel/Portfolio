# Sikha Swaroop — Portfolio

Custom Next.js portfolio built from the master plan. Editorial charcoal/cream/terracotta brand with hybrid motion.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Add your assets

Drop real files into `public/assets/` and wire paths when ready:

- Hero editorial photo
- City tiles for Journey
- Life action photos

Replace `public/Sikha_Swaroop_CV.pdf` with your final CV export.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Next.js** (auto-detected).
4. Deploy — add `ANTHROPIC_API_KEY` in Vercel env vars for live AI on `/demos/p2p` (fallback copy works without it).

Optional: add a custom domain in Vercel project settings.

## Demos

- `/demos/p2p` — interactive P2P procurement health check with Claude-powered analysis
- `/demos/spend-tracker` — coming soon
- Intro video: replace the placeholder block in `components/sections/Hero.tsx`.
