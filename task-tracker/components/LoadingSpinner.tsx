"use client";

import styles from "../app/task/[id]/TaskDetails.module.css";

const LoadingSpinner = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default LoadingSpinner;