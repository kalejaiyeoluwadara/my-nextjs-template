import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}) => {
  // Base classes that are always applied
  const baseClasses = `
    inline-flex bg-primary items-center justify-center
    font-medium rounded-md
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:cursor-not-allowed
  `;

  // Size variations
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Variant styles
  const variantClasses = {
    primary: `
      bg-primary text-white
      hover:bg-primary/90
      focus:ring-primary/50
      disabled:bg-primary/50
    `,
    secondary: `
      bg-gray-200 text-gray-900
      hover:bg-gray-300
      focus:ring-gray-200
      disabled:bg-gray-100
    `,
    outline: `
      border border-gray-300 bg-transparent text-gray-900
      hover:bg-gray-50
      focus:ring-gray-200
      disabled:bg-gray-50
    `,
    ghost: `
      bg-transparent text-gray-900
      hover:bg-gray-100
      focus:ring-gray-200
      disabled:bg-transparent
    `,
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      disabled={disabled || isLoading}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${widthClass}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
