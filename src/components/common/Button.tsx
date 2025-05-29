import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  darkMode: boolean;
  small?: boolean;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  darkMode,
  small = false,
  variant = 'primary',
}) => {
  const baseClasses = "flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const sizeClasses = small ? "px-3 py-1 text-sm" : "px-4 py-2";
  
  const variantClasses = variant === 'primary'
    ? darkMode 
      ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
      : "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500"
    : darkMode
      ? "bg-slate-700 hover:bg-slate-600 text-slate-200 focus:ring-slate-500"
      : "bg-slate-200 hover:bg-slate-300 text-slate-700 focus:ring-slate-400";
  
  const ringOffsetColor = darkMode ? "focus:ring-offset-slate-900" : "focus:ring-offset-white";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${ringOffsetColor} hover:scale-105 active:scale-95`}
    >
      {children}
    </button>
  );
};

export default Button;