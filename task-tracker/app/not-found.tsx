import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <main className={styles.container}>
      <div className={styles.errorIcon}>
        <AlertTriangle size={80} />
      </div>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>
        The task you are looking for does not exist or may have been moved.
      </p>
      <Link href="/" className={styles.link}>
        Back to Tasks
      </Link>
    </main>
  );
};

export default NotFound;
