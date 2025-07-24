// import { DesignSystemPreview } from "@/dev/DesignSystemPreview";

import DesignSystemPreview from "@/dev/DesignSystemPreview";

// app/page.tsx o donde tengas tu componente
export default function HomePage() {
  return (
    <main className="home-page">
      <div className="content">
        <h1 className="title">Bienvenido a la página principal</h1>
        <p className="subtitle">Este es el inicio de tu aplicación Next.js.</p>
      </div>
      <DesignSystemPreview />
    </main>
  );
}
