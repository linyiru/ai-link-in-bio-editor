import type { ActionFunctionArgs } from "react-router";

// Image compression utility function
async function compressImage(imageFile: File, maxWidth: number = 400, maxHeight: number = 400, quality: number = 0.8): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    try {
      const canvas = new OffscreenCanvas(maxWidth, maxHeight);
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Cannot get canvas context');
      }

      // Create image from file
      createImageBitmap(imageFile).then((imageBitmap) => {
        // Calculate new dimensions while maintaining aspect ratio
        const { width, height } = imageBitmap;
        let newWidth = width;
        let newHeight = height;

        if (width > height) {
          if (width > maxWidth) {
            newWidth = maxWidth;
            newHeight = (height * maxWidth) / width;
          }
        } else {
          if (height > maxHeight) {
            newHeight = maxHeight;
            newWidth = (width * maxHeight) / height;
          }
        }

        // Set canvas size to new dimensions
        canvas.width = newWidth;
        canvas.height = newHeight;

        // Draw the image on canvas with new dimensions
        ctx.drawImage(imageBitmap, 0, 0, newWidth, newHeight);

        // Convert canvas to blob
        canvas.convertToBlob({
          type: 'image/jpeg',
          quality: quality
        }).then((blob) => {
          blob.arrayBuffer().then(resolve).catch(reject);
        }).catch(reject);

        imageBitmap.close();
      }).catch(reject);
    } catch (error) {
      reject(error);
    }
  });
}

export async function action({ request, context }: ActionFunctionArgs) {
  const env = context.cloudflare.env;
  
  try {
    // Parse the form data
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;
    
    if (!imageFile) {
      return Response.json(
        { success: false, error: 'No image file provided' }, 
        { status: 400 }
      );
    }

    // Validate file type
    if (!imageFile.type.startsWith('image/')) {
      return Response.json(
        { success: false, error: 'File must be an image' }, 
        { status: 400 }
      );
    }

    // Validate file size (10MB limit, higher since we'll compress)
    if (imageFile.size > 10 * 1024 * 1024) {
      return Response.json(
        { success: false, error: 'File size must be less than 10MB' }, 
        { status: 400 }
      );
    }

    // Generate a unique filename
    const timestamp = Date.now();
    const fileName = `profile_${timestamp}.jpg`; // Always save as JPEG after compression

    // Compress the image before uploading
    let imageBuffer: ArrayBuffer;
    try {
      imageBuffer = await compressImage(imageFile, 400, 400, 0.8);
    } catch (compressionError) {
      console.error('Image compression failed:', compressionError);
      // Fallback to original image if compression fails
      imageBuffer = await imageFile.arrayBuffer();
    }
    
    if (!env.IMAGES) {
      return Response.json(
        { success: false, error: 'Image storage not configured' }, 
        { status: 500 }
      );
    }

    await env.IMAGES.put(fileName, imageBuffer, {
      httpMetadata: {
        contentType: 'image/jpeg', // Always JPEG after compression
      },
    });

    // Try to use R2 public URL if available, otherwise fallback to worker proxy
    let imageUrl: string;
    
    if (env.R2_PUBLIC_URL) {
      // Use configured R2 public URL
      imageUrl = `${env.R2_PUBLIC_URL}/${fileName}`;
    } else {
      // Fallback to worker proxy endpoint
      imageUrl = `/api/image/${fileName}`;
      console.log('R2_PUBLIC_URL not configured, using worker proxy for images. ' +
                  'For better performance, set R2_PUBLIC_URL environment variable to your R2 public domain.');
    }

    return Response.json({ 
      success: true, 
      imageUrl: imageUrl 
    });

  } catch (error) {
    console.error('Error uploading image:', error);
    return Response.json(
      { success: false, error: 'Failed to upload image' }, 
      { status: 500 }
    );
  }
}