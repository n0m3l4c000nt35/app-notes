import styles from "./page.module.css";
import { LuNotebookPen } from "react-icons/lu";

export default function Home() {
  return (
    <div className={styles.homePage}>
      <h1 className={styles.titlePage}>Take notes</h1>
      <LuNotebookPen className={styles.noteIcon} />
    </div>
  );
}
