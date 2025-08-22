# AI Link-in-Bio Editor

An elegant, AI-powered Link-in-Bio editor built with React Router v7 and deployed on Cloudflare Workers. Create beautiful, personalized link pages with live theme customization and cloud storage.

## ✨ Features

- 🎨 **Complete Theme System** - 24 color palettes with primary, secondary, accent variants
- 📱 **Mobile-First Design** - Responsive design optimized for all devices
- 🤖 **AI Integration** - Powered by Google Gemini for smart content suggestions
- ☁️ **Cloud Storage** - Persistent data with Cloudflare D1 (SQLite) database
- 📸 **Smart Image Upload** - Automatic compression and R2 bucket storage
- 🎭 **Template Library** - 120+ pre-designed templates across 8 categories
- ⚡ **SSR Performance** - React Router v7 with server-side rendering
- 🚀 **Edge Deployment** - Global performance via Cloudflare Workers

## 🚀 Quick Deploy

Deploy your own instance to Cloudflare Workers with one click:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/linyiru/ai-link-in-bio-editor)

> **Note**: The deployment will:
>
> - Automatically provision a D1 database for storing user data  
> - Set up R2 bucket for image storage
> - Set up the Worker with proper routing and API endpoints
> - Configure environment variables for the Gemini API (optional)

### ⚡ Optional Setup - Better Image Performance

For optimal image loading performance, follow the [deployment guide](./DEPLOY.md) to configure R2 direct access.

### What gets deployed?

- **D1 Database**: SQLite database for user profiles, links, and theme settings
- **R2 Bucket**: Object storage for uploaded profile images with automatic compression
- **Worker Functions**: API endpoints with server-side rendering capabilities
- **Static Assets**: Optimized React Router v7 app served from Cloudflare's global CDN
- **Custom Domain**: Your app available at `your-worker.your-subdomain.workers.dev`

## 💻 Local Development

Prerequisites: Node.js 20+ (required for Wrangler and optimal compatibility)

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

4. **Start development server:**

   ```bash
   npm run dev
   ```

   - Runs React Router v7 with SSR in development mode
   - Uses local D1 database for fast development
   - Image uploads work with automatic compression
   - Live reload and HMR enabled

## 📋 Scripts

- `npm run dev` – Start React Router v7 dev server with local Wrangler
- `npm run build` – Build React Router v7 app for production (SSR + client bundles)
- `npm run deploy` – Deploy to Cloudflare Workers (includes database setup)
- `npm run db:migrations:apply` – Apply database migrations to remote D1
- `npm run db:migrations:apply:local` – Apply migrations to local D1 for development
- `npm run typecheck` – Run TypeScript type checking

## 🗄️ Database Schema

The app uses Cloudflare D1 (SQLite) with the following structure:

- **users** - Stores profile information and theme settings
- **links** - Stores user links with ordering and active status

Database is automatically provisioned during Deploy to Cloudflare process.

## 🎯 API Endpoints

- `GET /api/data` - Load user profile and links data from D1 database
- `POST /api/save` - Save/update user profile and links to D1 database  
- `POST /api/upload-image` - Upload and compress profile images to R2 bucket
- `GET /api/image/:filename` - Serve images from R2 bucket with proper caching

## 🔧 Environment Variables

Required for full functionality:

- `GEMINI_API_KEY` - Google Gemini API key for AI features ([Get yours here](https://aistudio.google.com/app/apikey))

## 📸 Image Upload Performance

Images are served through optimized Worker API endpoints by default. For maximum performance in production:

### Production Setup (Optional)

1. **Set up a Custom Domain** for your R2 bucket in Cloudflare Dashboard
2. **Add environment variable**: `R2_PUBLIC_URL=https://images.yourdomain.com`
3. **Benefits**: Direct CDN delivery, faster loading, better caching

### Default Behavior

- Images use Worker API endpoints (`/api/image/filename`)
- Includes proper caching headers and CORS support
- Works immediately without any configuration
- Good performance for most use cases

### Why Not r2.dev URLs?

- r2.dev URLs are shared globally and can conflict between users
- Each Deploy to Cloudflare user gets their own bucket instance
- Worker API provides better security and consistent behavior

## 📝 TODO

- [ ] Add authentication system for admin access
- [ ] Implement route protection for `/api` and `/admin` endpoints
- [ ] Add user session management
- [ ] Secure API endpoints with proper authorization

## ♿ Accessibility

This app follows accessibility best practices with proper ARIA labels, semantic HTML, and keyboard navigation support.

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router v7 with SSR
- **Styling**: Tailwind CSS v4 with custom theme system
- **Backend**: Cloudflare Workers with D1 database
- **Storage**: Cloudflare R2 for images with automatic compression
- **AI**: Google Gemini API for content suggestions
- **Build**: Vite 6 with TypeScript support
- **Deployment**: One-click to Cloudflare's global edge network

## 📄 Credits

- Author: [@linyiru](https://github.com/linyiru)
- Repository: [ai-link-in-bio-editor](https://github.com/linyiru/ai-link-in-bio-editor)
- Design inspiration: [v0 community](https://v0.app/community/v0-me-Zz6mBLdU9bC)
- Drag-and-drop: [dnd-kit](https://github.com/clauderic/dnd-kit)
- Infrastructure: [Cloudflare Workers](https://workers.cloudflare.com/)
- Icons: [Lucide](https://lucide.dev/)
