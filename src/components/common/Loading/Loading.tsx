import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';

interface LoadingProps {
  show: boolean;
}

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  backdrop-filter: blur(5px);
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  color: white;
  margin-top: 1rem;
  font-size: 1.2rem;
`;

const Loading: React.FC<LoadingProps> = ({ show }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (show) {
      gsap.to(containerRef.current, {
        opacity: 1,
        duration: 0.3,
        pointerEvents: 'all',
        ease: 'power2.out'
      });
    } else {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        pointerEvents: 'none',
        ease: 'power2.in'
      });
    }
  }, [show]);
  
  return (
    <LoadingContainer ref={containerRef}>
      <LoadingContent>
        <Spinner />
        <LoadingText>Generating caption...</LoadingText>
      </LoadingContent>
    </LoadingContainer>
  );
};

export default Loading;