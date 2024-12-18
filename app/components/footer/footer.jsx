import styles from "./footer.module.css";

export default async function Page() {
  return (
    <footer className={styles.footer}>
      <p className={styles.author}>
        <b className={styles.copy}>&copy;</b> 2024{" "}
        <a className={styles.authorGithub} href="https://github.com/n0m3l4c000nt35" target="_blank" rel="noreferrer">
          n0m3l4c000nt35
        </a>
      </p>
    </footer>
  );
}
