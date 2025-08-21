# Link-in-Bio Editor

An elegant Link-in-Bio editor built with React + Vite. It supports drag-and-drop link sorting powered by dnd-kit (vertical sortable with handles), live theme customization, and a mobile preview frame.

Design inspired by the v0 community work: [v0.me/Zz6mBLdU9bC](https://v0.app/community/v0-me-Zz6mBLdU9bC). Big thanks to the original author for the concept and layout inspiration.

## Deploy to Cloudflare (Workers Builds)

Use the Deploy to Cloudflare button to quickly clone this repo into your GitHub/GitLab and deploy it to your own Cloudflare account.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=<YOUR_REPO_URL>)

Replace `<YOUR_REPO_URL>` with the HTTPS URL of your public GitHub/GitLab repository (for example: `https://github.com/your-user/ai-link-in-bio-editor`). If you have a monorepo, you can also append a subdirectory to the URL.

Notes and best practices from the official docs:
- If you already deployed with Workers Builds, you can generate this button from the Cloudflare dashboard (Share button on your Worker).
- If no custom `deploy` script is found, Cloudflare defaults to `npx wrangler deploy`. If no `build` script is found, it is left blank.
- To provision resources automatically (KV, D1, R2, DO, Queues, Vectorize, Workers AI, etc.), include a Wrangler configuration and sensible default binding names in your repo.

## Local Development

Prerequisites: Node.js 18+

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure API key (optional, for AI features):
   - Create `.env.local` and set `GEMINI_API_KEY=your-key`
3. Run the app:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` – Start Vite dev server
- `npm run build` – Production build
- `npm run preview` – Preview production build locally

## Accessibility

We add `aria-label`, `title`, and proper `label` elements for form controls and icon buttons. If you notice any accessibility issue, please open an issue or PR.

## Credits

- Design inspiration: [v0.me/Zz6mBLdU9bC](https://v0.app/community/v0-me-Zz6mBLdU9bC)
- Drag-and-drop: [dnd-kit](https://github.com/clauderic/dnd-kit)
