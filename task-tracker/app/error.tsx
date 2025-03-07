"use client";

import styles from "./ErrorState.module.css";

interface IProps {
  error: Error;
  reset: () => void;
}

const ErrorState = ({ error, reset }: IProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorIcon}>⚠️</div>
        <h2 className={styles.title}>Oops!</h2>
        <h3 className={styles.message}>
          Something went wrong while processing your request.
        </h3>
        <p>
          You can
          <button className={styles.refreshButton} onClick={reset}>
            try again
          </button>
          or
          <button
            className={styles.refreshButton}
            onClick={() => window.location.reload()}
          >
            refresh the page
          </button>
        </p>
        <div className={styles.errorInfo}>
          <p>
            <strong>Error details:</strong> {error.message}
          </p>
          <p>
            If the problem persists, please contact the system administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
