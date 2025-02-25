"use client";

import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface TextInputProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  type?: "text" | "password" | "email";
  className?: string;
  id?: string;
  name: string; // Added name prop
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  type = "text",
  className = "",
  id,
  name, // Added name prop
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const inputId = id || React.useId();

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className={`w-full space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-neutral"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          name={name} // Added name attribute
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          className={`
            w-full px-3 py-4 
            border rounded-[12px]
            bg-white
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-primary
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${error ? "border-red-500" : "border-[#EFEFEF]"}
            ${disabled ? "text-gray-500" : "text-gray-900"}
          `}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <FaEyeSlash className="h-4 w-4" />
            ) : (
              <FaEye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {(error || helperText) && (
        <p className={`text-sm ${error ? "text-red-500" : "text-gray-500"}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default TextInput;
