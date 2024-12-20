// components/Button.component.tsx
import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className = "" }) => (
  <button className={`button ${className}`} onClick={onClick}>
    {label}
  </button>
);

export default Button;
