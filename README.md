This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/__index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Sync:

backlog item 1: fertige opensource sw finden

grobes Ziel:

Arbeiten aus Figma durch Konventionen in ein Intermediate UI-Format one-way extrahieren

- keine saas abhaengigkeit

- Elemente aus Figma sind:
  - benennbar: "#TeaserBox"
  - definiert: Eigenschaften css-nah
  - referenziert: gleiches Element taucht mehrfach auf
  - variantenfaehig: button + button active/disabled...

bsp:

- figma2react von figma selbst
- figma2code
- teleporthq
- unified
- https://luisa.cloud/help/responsive_figma_layouts.html

Feasability:

- figma daten per rest api auslesen:

  - nutzung tools: diezz, figma-js etc, teleporthq.io

- ausgelesenes ist atom:
  - varianten extrahieren
  - als "Baustein" speichern
- ausgelesenes ist molekuel / elemente / seiten:

  - nutzung bisheriger Bausteine
  - als "Baustein" speichern

- responsiveness via hiflsangaben (figma token oder mini plugin)
  - name: "#name"
  - description: "lg:col-3"
  - baukasten-override:

-- mini figma
