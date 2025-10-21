import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';

interface CaptionDisplayProps {
  caption: string | null;
}

const CaptionContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(20px);
`;

const CaptionHeading = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  color: #f8f9fa;
  font-size: 1.2rem;
`;

const CaptionText = styled.p`
  color: #e9ecef;
  font-size: 1.1rem;
  line-height: 1.6;
  font-weight: 300;
  margin: 0;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
`;

const CaptionDisplay: React.FC<CaptionDisplayProps> = ({ caption }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    console.log("CaptionDisplay received caption:", caption);
    // Only animate if caption exists and ref is valid
    if (caption && containerRef.current) {
      // Animate entry
      gsap.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
      
      // Log to confirm caption is received
      console.log("Caption received:", caption);
    }
  }, [caption]);
  
  // Don't render anything if no caption
  if (!caption) return null;
  
  return (
    <CaptionContainer ref={containerRef}>
      <CaptionHeading>Generated Caption</CaptionHeading>
      <CaptionText>{caption}</CaptionText>
    </CaptionContainer>
  );
};

export default CaptionDisplay;