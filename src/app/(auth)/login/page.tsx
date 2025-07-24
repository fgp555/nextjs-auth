import { LoginForm } from "@/components/auth/LoginForm";
import styles from "@/styles/components/_auth.module.scss";

export default function LoginPage() {
  return (
    <div className={styles.authContainer}>
      <LoginForm />
    </div>
  );
}
