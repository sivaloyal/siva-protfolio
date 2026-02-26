import { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import { motion } from 'motion/react';

interface ImageGalleryProps {
  onSelectImage: (base64: string) => void;
  currentImage?: string;
}

export function ImageGallery({ onSelectImage, currentImage }: ImageGalleryProps) {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  // Load uploaded images from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('gallery_images');
    if (saved) {
      setUploadedImages(JSON.parse(saved));
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setUploadedImages([...uploadedImages, base64]);
        setPreview(base64);
        onSelectImage(base64);
        
        // Save to localStorage
        const updated = [...uploadedImages, base64];
        localStorage.setItem('gallery_images', JSON.stringify(updated));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    const updated = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(updated);
    localStorage.setItem('gallery_images', JSON.stringify(updated));
    if (preview === uploadedImages[index]) {
      setPreview(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-2 text-sm font-semibold" style={{ color: '#E6D3B3' }}>
          Upload Image
        </label>
        <label
          className="w-full flex items-center justify-center px-4 py-8 rounded-lg border-2 border-dashed cursor-pointer transition-all hover:border-opacity-80"
          style={{
            backgroundColor: '#0A192F',
            borderColor: '#64FFDA',
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="text-center">
            <Upload size={32} style={{ color: '#64FFDA', marginBottom: '8px' }} className="mx-auto" />
            <p style={{ color: '#8892B0' }} className="text-sm">
              Click to upload or drag and drop
            </p>
            <p style={{ color: '#8892B0' }} className="text-xs mt-1">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>
        </label>
      </div>

      {uploadedImages.length > 0 && (
        <div>
          <h4 className="mb-4 text-sm font-semibold" style={{ color: '#E6D3B3' }}>
            Your Gallery ({uploadedImages.length})
          </h4>
          <div className="grid grid-cols-3 gap-4">
            {uploadedImages.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative group rounded-lg overflow-hidden cursor-pointer"
                onClick={() => {
                  setPreview(image);
                  onSelectImage(image);
                }}
                style={{
                  border: preview === image ? '2px solid #64FFDA' : '1px solid #233554',
                  backgroundColor: '#0A192F',
                }}
              >
                <img
                  src={image}
                  alt={`Gallery ${index}`}
                  className="w-full h-32 object-cover"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="absolute top-2 right-2 p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: '#0A192F', border: '1px solid #64FFDA' }}
                >
                  <X size={16} style={{ color: '#64FFDA' }} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {preview && (
        <div>
          <p className="text-sm mb-2" style={{ color: '#8892B0' }}>
            Selected Preview:
          </p>
          <img
            src={preview}
            alt="Selected"
            className="w-full h-48 object-cover rounded-lg"
            style={{ border: '1px solid #233554' }}
          />
        </div>
      )}
    </div>
  );
}
