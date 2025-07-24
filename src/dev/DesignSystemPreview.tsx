"use client";
import React, { useEffect, useState } from "react";
import "./DesignSystemPreview.scss";

const DesignSystemPreview = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const body = document.body;

    if (theme === "dark") {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="design-system">
      <div className="theme-toggle">
        <label className="checkbox">
          <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} />
          Dark Theme
        </label>
      </div>

      <h1>Design System</h1>

      <section className="colors">
        <h2>Colors</h2>
        <div className="swatches">
          {[
            "primary",
            "secondary",
            "accent",
            "success",
            "warning",
            "error",
            "danger",
            "gray",
            "black",
            "white",
            "text",
            "bg",
          ].map((name) => (
            <div key={name} className={`swatch ${name}`}>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="typography">
        <h2>Typography</h2>
        <div className="text-sample primary-font">
          <p>Primary: Inter</p>
          <p className="sample">The quick brown fox jumps over the lazy dog</p>
        </div>
        <div className="text-sample secondary-font">
          <p>Secondary: Urbanist</p>
          <p className="sample">The quick brown fox jumps over the lazy dog</p>
        </div>
        <div className="text-sample mono-font">
          <p>Mono: JetBrains Mono</p>
          <p className="sample">const hello = "world";</p>
        </div>
      </section>

      <section className="form-controls">
        <h2>Checkbox</h2>
        <label className="checkbox">
          <input type="checkbox" />
          Accept terms and conditions
        </label>
      </section>
    </div>
  );
};

export default DesignSystemPreview;
