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
        
        // Handle admin path - serve the regular SPA but React will detect the path
        if (url.pathname === '/admin') {
          // Serve the main SPA index.html - the React app will handle routing
          url.pathname = '/';
        }
        
        // For SPA routes, serve index.html 
        if (!url.pathname.includes('.') && !url.pathname.startsWith('/api/')) {
          // Redirect all SPA routes to serve index.html from dist
          const request = new Request(`${url.origin}/index.html`);
          return fetch(request);
        }
        
        return new Response('Not found', { status: 404 });
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