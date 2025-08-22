# AI Link-in-Bio Editor

An elegant, AI-powered Link-in-Bio editor built with React and deployed on Cloudflare Workers. Create beautiful, personalized link pages that can be shared and stored in the cloud.

## ✨ Features

- 🎨 **Live Theme Customization** - Multiple color palettes, fonts, and styles
- 📱 **Mobile-First Design** - Responsive preview and optimized for all devices  
- 🤖 **AI Integration** - Powered by Google Gemini for smart content suggestions
- ☁️ **Cloud Storage** - Save and share your pages with persistent Cloudflare D1 database
- 📸 **Image Upload** - Upload profile pictures directly to Cloudflare R2 storage
- 🔗 **Shareable Links** - Each page gets a unique URL for easy sharing
- 🚀 **Fast Deployment** - One-click deployment to Cloudflare Workers

## 🚀 Quick Deploy

Deploy your own instance to Cloudflare Workers with one click:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/YOUR_USERNAME/YOUR_REPO_NAME)

> **Note**: Replace the URL with your actual repository URL. The deployment will:
> - Automatically provision a D1 database for storing user data  
> - Set up the Worker with proper routing and API endpoints
> - Configure environment variables for the Gemini API (optional)

### What gets deployed?

- **D1 Database**: Stores user profiles, links, and theme settings
- **R2 Bucket**: Stores uploaded profile images and media files
- **Worker Functions**: API endpoints for saving/loading user data and image upload
- **Static Assets**: React SPA served from Cloudflare's edge network
- **Custom Domain**: Your app available at `your-worker.your-subdomain.workers.dev`

## 💻 Local Development

Prerequisites: Node.js 18+

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # Copy example file
   cp .dev.vars.example .dev.vars
   
   # Edit .dev.vars with your API keys
   GEMINI_API_KEY=your-gemini-api-key-here
   ```

3. **Set up local database:**
   ```bash
   # Apply migrations locally
   npm run db:migrations:apply:local
   ```

4. **Choose your development mode:**

   ### Option A: Full Local Development (Recommended for UI work)
   ```bash
   npm run dev
   ```
   - Uses local D1 database
   - Image uploads use base64 fallback (no R2 required)
   - Fastest for frontend development

   ### Option B: Remote Development (For testing R2 image uploads)
   ```bash
   npm run dev:remote
   ```
   - Uses remote D1 database and R2 bucket
   - Requires Cloudflare account and deployed resources
   - Best for testing full upload functionality

   ### Option C: Hybrid Local Development
   ```bash
   npm run dev:local
   ```
   - Uses local D1 database
   - Uses local R2 simulation (if configured)
   - Good balance between local and cloud features

## 📋 Scripts

- `npm run dev` – Start Vite dev server with local Wrangler (base64 image fallback)
- `npm run dev:remote` – Build and start with remote D1/R2 (full cloud features)  
- `npm run dev:local` – Build and start with local D1/R2 simulation
- `npm run build` – Build React app for production
- `npm run deploy` – Deploy to Cloudflare (runs migrations + wrangler deploy)
- `npm run db:migrations:apply` – Apply database migrations to remote D1
- `npm run db:migrations:apply:local` – Apply migrations to local D1

## 🗄️ Database Schema

The app uses Cloudflare D1 (SQLite) with the following structure:

- **users** - Stores profile information and theme settings
- **links** - Stores user links with ordering and active status

Database is automatically provisioned during Deploy to Cloudflare process.

## 🎯 API Endpoints

- `GET /api/page/:slug` - Retrieve public page data
- `POST /api/save` - Save/update user data (returns shareable URL)
- `POST /api/upload-image` - Upload profile image to R2 (or base64 fallback in local dev)

## 🔧 Environment Variables

Required for full functionality:

- `GEMINI_API_KEY` - Google Gemini API key for AI features ([Get yours here](https://aistudio.google.com/app/apikey))

## ♿ Accessibility

This app follows accessibility best practices with proper ARIA labels, semantic HTML, and keyboard navigation support.

## 📄 Credits

- Design inspiration: [v0 community](https://v0.app/community/v0-me-Zz6mBLdU9bC)
- Drag-and-drop: [dnd-kit](https://github.com/clauderic/dnd-kit)
- Deployment: [Cloudflare Workers](https://workers.cloudflare.com/)
