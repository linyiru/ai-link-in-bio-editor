# AI Link-in-Bio Editor - Deployment Guide

This guide helps you deploy your own instance of the AI Link-in-Bio Editor to Cloudflare.

## Quick Deploy

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/linyiru/ai-link-in-bio-editor)

## Optional Setup - Better Image Performance

After deploying with the button above, follow these steps to enable direct R2 image access:

### 1. Enable R2 Public Access

```bash
# Enable public access for your R2 bucket
wrangler r2 bucket dev-url enable link-in-bio-images
```

This will output a public URL like: `https://pub-xxxxxxxxx.r2.dev`

### 2. Configure Environment Variable

Update your `wrangler.toml` file:

```toml
[vars]
# Uncomment and set to your R2 public URL from step 1
R2_PUBLIC_URL = "https://pub-xxxxxxxxx.r2.dev"
```

### 3. Redeploy

```bash
wrangler deploy
```

## What this does

- **Without R2_PUBLIC_URL**: Images are served through the Worker (still works, but uses more CPU)
- **With R2_PUBLIC_URL**: Images are served directly from Cloudflare's CDN (faster, more efficient)

## Custom Domain (Production)

For production use, set up a custom domain:

1. In Cloudflare Dashboard → R2 → Your Bucket → Settings
2. Add custom domain (e.g., `images.yoursite.com`)
3. Update `R2_PUBLIC_URL` to your custom domain

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `R2_PUBLIC_URL` | Optional | Direct R2 access URL for images |
| `GEMINI_API_KEY` | Optional | For AI bio generation feature |

## Troubleshooting

- **Images not loading**: Check if R2_PUBLIC_URL is correct and bucket is publicly accessible
- **Upload failures**: Verify R2 bucket binding in wrangler.toml
- **Build errors**: Ensure all dependencies are installed with `npm install`