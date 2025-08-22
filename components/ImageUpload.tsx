import React, { useState, useRef } from 'react';
import * as LucideIcons from 'lucide-react';

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageUploaded: (imageUrl: string) => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  currentImageUrl, 
  onImageUploaded, 
  className = "" 
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success && result.imageUrl) {
        onImageUploaded(result.imageUrl);
      } else {
        setError(result.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div className={className}>
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`
          relative w-24 h-24 mx-auto rounded-full border-2 border-dashed border-gray-600 
          hover:border-gray-500 transition-colors cursor-pointer group overflow-hidden
          ${uploading ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        {currentImageUrl ? (
          <div className="relative w-full h-full">
            <img 
              src={currentImageUrl} 
              alt="Profile" 
              className="w-full h-full object-cover rounded-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <LucideIcons.Upload size={16} className="text-white" />
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 group-hover:text-gray-400 transition-colors">
            <LucideIcons.Upload size={20} className="mb-1" />
            <span className="text-xs">Upload</span>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <LucideIcons.Loader2 size={16} className="text-white animate-spin" />
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {error && (
        <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
      )}

      <p className="text-gray-500 text-xs mt-2 text-center">
        Click or drag image to upload
        <br />
        Max 5MB, JPG/PNG
      </p>
    </div>
  );
};

export default ImageUpload;