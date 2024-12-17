import styles from "@/app/notes/loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <h1 className={styles.loadingTitle}>[ Loading ]</h1>
    </div>
  );
}
