import { handleApiRequest } from './api-handler.js';
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    console.log('Incoming request:', url.pathname);
    
    // Admin path will be protected by Cloudflare Access/Zero Trust
    const isAdminRoute = url.pathname === '/admin';
    const isAdminApi = url.pathname.startsWith('/api/save') || url.pathname.startsWith('/api/upload-image');
    
    // Admin paths are handled by the SPA routing
    
    // Handle API routes
    if (url.pathname.startsWith('/api/')) {
      console.log('Handling API request:', url.pathname);
      return handleApiRequest(request, env, ctx);
    }
    
    // For all other routes, serve static assets
    try {
      console.log('Serving asset for:', url.pathname);
      
      
      // Check if we have static content bindings
      if (!env.__STATIC_CONTENT) {
        console.log('No static content binding available');
        
        // For SPA routes, serve a minimal HTML page
        if (!url.pathname.includes('.') && !url.pathname.startsWith('/api/')) {
          console.log('Serving fallback HTML for:', url.pathname);
          return new Response(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI Link-in-Bio Editor</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body { font-family: system-ui, -apple-system, sans-serif; }
    </style>
  </head>
  <body class="bg-gray-950 text-white min-h-screen flex items-center justify-center">
    <div class="text-center max-w-2xl mx-auto p-8">
      <h1 class="text-4xl font-bold mb-4">⚠️ Static Assets Missing</h1>
      <p class="text-xl text-gray-400 mb-8">
        The static files for this application are not properly deployed.
      </p>
      <div class="bg-gray-800 p-6 rounded-lg text-left mb-8">
        <h2 class="text-lg font-semibold mb-3">To fix this issue:</h2>
        <ol class="list-decimal list-inside space-y-2 text-gray-300">
          <li>Make sure your build process runs: <code class="bg-gray-700 px-2 py-1 rounded">npm run build</code></li>
          <li>Ensure the <code class="bg-gray-700 px-2 py-1 rounded">dist/</code> directory contains your built assets</li>
          <li>Check that the <code class="bg-gray-700 px-2 py-1 rounded">[assets]</code> configuration in <code class="bg-gray-700 px-2 py-1 rounded">wrangler.toml</code> is correct</li>
          <li>Redeploy using: <code class="bg-gray-700 px-2 py-1 rounded">npm run deploy</code></li>
        </ol>
      </div>
      <div class="space-y-4">
        <p class="text-gray-400">Current path: <code class="bg-gray-800 px-2 py-1 rounded">${url.pathname}</code></p>
        <a href="/api/health" class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
          Check Database Status
        </a>
      </div>
    </div>
  </body>
</html>`, {
            headers: { 'Content-Type': 'text/html' }
          });
        }
        
        return new Response('Asset not found', { status: 404 });
      }
      
      return await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: env.__STATIC_CONTENT_MANIFEST,
          cacheControl: {
            browserTTL: 0,
          },
          mapRequestToAsset: (req) => {
            const url = new URL(req.url);
            console.log('Mapping request for:', url.pathname);
            // For SPA routing, serve index.html for non-asset paths
            if (!url.pathname.includes('.') && !url.pathname.startsWith('/api/')) {
              console.log('Serving index.html for SPA route:', url.pathname);
              return new Request(`${url.origin}/index.html`, req);
            }
            console.log('Serving direct asset:', url.pathname);
            return req;
          },
        }
      );
    } catch (e) {
      console.error('Asset serving error for', url.pathname, ':', e);
      // Fall back to serving index.html for SPA routes
      if (!url.pathname.includes('.') && !url.pathname.startsWith('/api/')) {
        console.log('Fallback: serving index.html for:', url.pathname);
        try {
          return await getAssetFromKV(
            {
              request: new Request(`${url.origin}/index.html`, request),
              waitUntil: ctx.waitUntil.bind(ctx),
            },
            {
              ASSET_NAMESPACE: env.__STATIC_CONTENT,
              ASSET_MANIFEST: env.__STATIC_CONTENT_MANIFEST,
              cacheControl: {
                browserTTL: 0,
              },
            }
          );
        } catch (fallbackError) {
          console.error('Fallback error:', fallbackError);
          return new Response('Not found', { status: 404 });
        }
      }
      return new Response('Not found', { status: 404 });
    }
  }
};