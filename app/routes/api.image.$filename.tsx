import type { LoaderFunctionArgs } from "react-router";

export async function loader({ params, context }: LoaderFunctionArgs) {
  const env = context.cloudflare.env;
  const filename = params.filename;
  
  if (!filename) {
    return new Response('File not found', { status: 404 });
  }

  try {
    if (!env.IMAGES) {
      return new Response('Image storage not available', { status: 500 });
    }

    const object = await env.IMAGES.get(filename);
    
    if (!object) {
      return new Response('Image not found', { status: 404 });
    }

    // Get the image data
    const imageData = await object.arrayBuffer();
    
    // Get content type from metadata or guess from filename
    const contentType = object.httpMetadata?.contentType || 
      (filename.endsWith('.png') ? 'image/png' : 
       filename.endsWith('.gif') ? 'image/gif' : 'image/jpeg');

    // Return the image with appropriate headers
    return new Response(imageData, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
        'ETag': object.etag || filename,
      },
    });

  } catch (error) {
    console.error('Error serving image:', error);
    return new Response('Error loading image', { status: 500 });
  }
}