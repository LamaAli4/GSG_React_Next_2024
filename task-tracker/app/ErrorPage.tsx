import { AlertOctagon } from "lucide-react";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorIcon}>
          <AlertOctagon size={64} />
        </div>
        <h1 className={styles.title}>Something Went Wrong!</h1>
        <p className={styles.message}>
          We encountered an error while fetching the data. Please try again
          later.
        </p>
        <button onClick={handleRefresh} className={styles.refreshButton}>
          Refresh Page
        </button>
      </div>
    </main>
  );
};

export default ErrorPage;
