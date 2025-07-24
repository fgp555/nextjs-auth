import { RegisterForm } from "@/components/auth/RegisterForm";
import styles from "@/styles/components/_auth.module.scss";

export default function RegisterPage() {
  return (
    <div className={styles.authContainer}>
      <RegisterForm />
    </div>
  );
}