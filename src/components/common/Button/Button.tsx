import React from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

interface ButtonProps {
  primary?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
}

const StyledButton = styled.button<{ primary?: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s, box-shadow 0.2s;
  border: none;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  background: ${props => props.primary 
    ? 'linear-gradient(to right, #4361ee, #4cc9f0)' 
    : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.primary ? 'white' : '#e9ecef'};
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: ${props => props.primary 
      ? 'linear-gradient(to right, #8892c2, #97bdc7)' 
      : 'rgba(255, 255, 255, 0.05)'};
  }
`;

const Button: React.FC<ButtonProps> = ({
  primary = false,
  onClick,
  disabled = false,
  type = 'button',
  children,
  className
}) => {
  const handleClick = () => {
    if (onClick && !disabled) {
      // Add a small animation on click
      gsap.to(".button-pulse", {
        scale: 1.05,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut"
      });
      
      onClick();
    }
  };

  return (
    <StyledButton
      className={`button-pulse ${className || ''}`}
      primary={primary}
      onClick={handleClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </StyledButton>
  );
};

export default Button;