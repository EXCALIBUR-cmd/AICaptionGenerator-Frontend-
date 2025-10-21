import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styled, { createGlobalStyle } from 'styled-components';
import ImageUploader from './components/ImageUploader/ImageUploader';
import CaptionDisplay from './components/CaptionDisplay/CaptionDisplay';
import Loading from './components/common/Loading/Loading';
import { uploadImage } from './services/api';  // Make sure you're importing from api.ts

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
  }
  
  body {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    color: #f8f9fa;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem 1rem;
  
  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2.5rem;
  opacity: 0;
  transform: translateY(-20px);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, #4361ee, #4cc9f0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #ced4da;
  max-width: 600px;
  
  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: #adb5bd;
`;

function App() {
  const [caption, setCaption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only animate if ref is valid
    if (headerRef.current) {
      // Animate header entry
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
      });
    }
  }, []);

  const handleImageSelect = async (file: File) => {
    setIsLoading(true);
    setCaption(null);
    
    try {
      console.log("Sending file to API:", file.name, file.size);
      const response = await uploadImage(file);  // This should call the function from api.ts
      console.log("Response from backend:", response);
      
      if (response && response.caption) {
        console.log("Caption received:", response.caption);
        setCaption(response.caption);
      } else {
        console.error("No caption in response:", response);
        alert('The response did not contain a caption. Check console for details.');
      }
    } catch (error) {
      console.error('Error during image upload:', error);
      alert('Failed to generate caption. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header ref={headerRef}>
          <Title>Image Caption Generator</Title>
          <Subtitle>Upload an image and get an AI-generated caption describing what's in your picture.</Subtitle>
        </Header>

        <ImageUploader 
          onImageSelect={handleImageSelect}
          isLoading={isLoading}
        />
        
        <CaptionDisplay caption={caption} />
        
        <Loading show={isLoading} />
        
        <Footer>
          Created with React, GSAP, and AI caption technology
        </Footer>
      </AppContainer>
    </>
  );
}

export default App;
