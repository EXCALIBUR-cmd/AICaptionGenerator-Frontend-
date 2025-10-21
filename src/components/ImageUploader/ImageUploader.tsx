import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  isLoading: boolean;
}

const ImageUploaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(20px);
`;

// Changed this to accept the isDragActive prop as a data attribute instead
const DropZone = styled.div<{ $isDragOver: boolean }>`
  width: 100%;
  height: 250px;
  border: 2px dashed ${props => props.$isDragOver ? '#4361ee' : '#aaa'};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.$isDragOver ? 'rgba(67, 97, 238, 0.1)' : 'transparent'};
  
  &:hover {
    border-color: #4361ee;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  color: #7b7b7b;
  margin-bottom: 1rem;
`;

const UploadText = styled.p`
  color: #7b7b7b;
  text-align: center;
  margin: 0;
`;

const ImagePreviewContainer = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
  opacity: 0;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, isLoading }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only animate if the ref is valid
    if (containerRef.current) {
      // Animate component entry
      gsap.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target?.result) {
          setSelectedImage(e.target.result as string);
          
          // Only animate if ref is valid
          if (previewRef.current) {
            // Animate preview entry
            gsap.to(previewRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out'
            });
          }
        }
      };
      
      reader.readAsDataURL(file);
      onImageSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target?.result) {
          setSelectedImage(e.target.result as string);
          
          // Only animate if ref is valid
          if (previewRef.current) {
            // Animate preview entry
            gsap.to(previewRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out'
            });
          }
        }
      };
      
      reader.readAsDataURL(file);
      onImageSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <ImageUploaderContainer ref={containerRef}>
      <DropZone 
        $isDragOver={isDragOver} // Changed to use $ prefix for transient prop
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={triggerFileInput}
      >
        <UploadIcon>📷</UploadIcon>
        <UploadText>
          {isLoading 
            ? 'Processing image...' 
            : 'Drag & drop an image or click to browse'}
        </UploadText>
        <FileInput 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          onChange={handleImageChange}
          disabled={isLoading}
        />
      </DropZone>
      
      {selectedImage && (
        <ImagePreviewContainer ref={previewRef}>
          <ImagePreview src={selectedImage} alt="Selected" />
        </ImagePreviewContainer>
      )}
    </ImageUploaderContainer>
  );
};

export default ImageUploader;
