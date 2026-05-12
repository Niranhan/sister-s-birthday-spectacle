````markdown
# Sister's Birthday Spectacle

A beautiful birthday-themed web experience built with **TanStack Start**, **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

This project was created with Lovable and is designed as a modern, responsive birthday website.

## Live Demo

```txt
https://sister-s-birthday-spectacle.vercel.app
````

## Tech Stack

* React 19
* TypeScript
* TanStack Start
* TanStack Router
* Vite
* Tailwind CSS
* Radix UI
* Lucide React
* Vercel

## Project Structure

```txt
.
├── .lovable/
├── src/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── components.json
├── bun.lock
├── wrangler.jsonc
└── README.md
```

## Getting Started

### Clone the repository

```bash
git clone https://github.com/Niranjhan/sister-s-birthday-spectacle.git
cd sister-s-birthday-spectacle
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Then open:

```txt
http://localhost:5173
```

## Available Scripts

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Run lint check

```bash
npm run lint
```

### Format code

```bash
npm run format
```

## Deployment

This project is deployed on **Vercel**.

Recommended Vercel settings:

```txt
Framework Preset: Vite
Build Command: npm run build
Install Command: npm install
Root Directory: ./
Output Directory: leave empty
```

Because this project uses **TanStack Start**, it should not be treated like a normal static Vite app with `index.html`.

## Important Notes

This project uses:

```txt
@lovable.dev/vite-tanstack-config
```

The Lovable TanStack config already includes important Vite plugins such as:

* TanStack Start
* React
* Tailwind CSS
* TypeScript path aliases
* Cloudflare build plugin
* Lovable component tagger

Do not manually add duplicate plugins in `vite.config.ts`, because it can break the app.

## Vercel 404 Fix Notes

If the project shows:

```txt
404: NOT_FOUND
```

Check these first:

1. Make sure the Vercel project root is correct.
2. Make sure `npm install` is used as the install command.
3. Make sure `npm run build` is used as the build command.
4. Do not force `dist` as the output directory for this TanStack Start setup.
5. Redeploy after changing project settings.
6. Clear build cache if old settings are still being used.

If Vercel shows:

```txt
Configuration Settings in the current Production deployment differ from your current Project Settings
```

Redeploy the project with build cache disabled.

## Author

Created by **Niranjhan**.

## License

This project is private and intended for personal use.

```
```
