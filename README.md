# Urvashi Vishwakarma - Portfolio

A personal portfolio for an Electronics & Communication Engineering student at UIT RGPV, built with Next.js and exported as a static site for GitHub Pages.

The site content lives in [`src/data/resume.ts`](./src/data/resume.ts). Replace the visible `[ADD ...]` placeholders with confirmed details before publishing.

## Run locally

```bash
pnpm install
pnpm dev
```

Create the static site with:

```bash
pnpm build
```

The exported site is written to `out/`.

## GitHub Pages and custom domain

The workflow in `.github/workflows/deploy.yml` deploys the `main` branch to GitHub Pages. In the repository settings, enable Pages with **GitHub Actions** as the build and deployment source. The `public/CNAME` file configures `urvashivishi.me`.

At the domain registrar, point the apex domain to GitHub Pages with A records for `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`. Add an AAAA record for each of `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, and `2606:50c0:8003::153` if IPv6 is supported. Optionally point `www` to the GitHub Pages hostname with a CNAME, then enable HTTPS in repository Pages settings after DNS propagates.

## Credits and license

Template by Magic UI. This site is based on the [Magic UI portfolio template](https://github.com/magicuidesign/portfolio), distributed under the MIT license; see [`LICENSE`](./LICENSE).
