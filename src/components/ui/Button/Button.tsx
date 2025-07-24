import React from "react";
import "./Button.scss"; // asegúrate de que se importe como archivo global

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  disabled,
  ...props
}) => {
  return (
    <button className={`button ${variant} ${size} ${className}`} disabled={disabled || loading} {...props}>
      {loading ? "Loading..." : children}
    </button>
  );
};
