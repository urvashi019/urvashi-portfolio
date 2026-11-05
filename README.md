# Urvashi Vishwakarma — Portfolio

A Next.js portfolio for an Electronics & Communication Engineering student and hardware builder.

## Run locally

```bash
pnpm install
pnpm dev
```

Check the production build locally with:

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

## Update content and assets

- Edit the portfolio content, dates, links, skills, and visible `[ADD ...]` placeholders in [`src/data/resume.ts`](./src/data/resume.ts).
- Add organization logos under `public/logos/` and update their paths in the data file. If an image is unavailable, the page displays a monogram badge.
- Replace `public/resume.pdf` with the current resume PDF.
- Set `NEXT_PUBLIC_SITE_URL` when changing the canonical site URL. It defaults to `https://urvashi-portfolio-five.vercel.app`.

## Vercel and custom domain

Connect the repository to Vercel and use `main` for production deployments; pull requests receive Vercel preview deployments. To add `urvashivishi.me`, open **Project Settings → Domains**, add the domain, then configure the DNS records Vercel displays at the domain provider. Set `NEXT_PUBLIC_SITE_URL` to `https://urvashivishi.me` in Vercel after connecting the domain.

## Credits and license

Template by Magic UI. This site is based on the [Magic UI portfolio template](https://github.com/magicuidesign/portfolio); see [`LICENSE`](./LICENSE).
