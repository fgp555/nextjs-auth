import React from "react";
import "./Input.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = "", ...props }) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label className="label">{label}</label>}
      <input className={`input ${error ? "error" : ""}`} {...props} />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};
