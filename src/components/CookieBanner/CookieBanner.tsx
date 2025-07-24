"use client";

import Link from "next/link";
import "./CookieBanner.scss";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    // localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const handleReject = () => {
    // localStorage.setItem("cookieConsent", "rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  const isDevelopment = true;

  return (
    <div className="cookie-banner">
      <p>Usamos cookies para mejorar tu experiencia. ¿Aceptas el uso de cookies?</p>
      <div className="cookie-buttons">
        <button onClick={handleAccept}>Aceptar</button>
        <button onClick={handleReject}>Rechazar</button>
      </div>
      {isDevelopment && (
        <div className="nav-links">
          <nav>
            {/* <Link href="/privacy-policy">Política de privacidad</Link> */}
            <Link href="/">home</Link>
            <Link href="/login">login</Link>
            <Link href="/register">register</Link>
            <Link href="/dashboard">dashboard</Link>
            <Link href="/admin">admin</Link>
          </nav>
        </div>
      )}
    </div>
  );
}
