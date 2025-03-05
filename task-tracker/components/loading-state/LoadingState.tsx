import styles from "./loading-state.module.css";

const LoadingState = () => {
  return (
    <main className={styles.container}>
      <div className={styles.loadingWrapper}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    </main>
  );
};

export default LoadingState;
