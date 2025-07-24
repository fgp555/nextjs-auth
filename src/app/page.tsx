import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Bienvenido a la página principal</h1>
        <p className={styles.subtitle}>Este es el inicio de tu aplicación Next.js.</p>
      </div>
    </main>
  );
}
