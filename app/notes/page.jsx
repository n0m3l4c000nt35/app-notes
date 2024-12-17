import Link from "next/link";
import { getNotes } from "../lib/db";
import Note from "@/app/components/note/note";
import styles from "./page.module.css";
import { PiNotePencilBold } from "react-icons/pi";
import { CgNotes } from "react-icons/cg";

export default async function Page() {
  const notes = await getNotes();
  return (
    <section className={styles.notesPage}>
      <h1 className={styles.titlePage}>Notes</h1>
      <CgNotes className={styles.notePageIcon} />
      <div>
        <Link className={styles.navLink} href="/create-note">
          Create Note <PiNotePencilBold className={styles.navLinkIcon} />
        </Link>
      </div>
      <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        {notes?.length > 0 ? (
          notes.map(({ _id, title, content }) => <Note key={_id} id={_id.toString()} title={title} content={content} />)
        ) : (
          <p style={{ fontSize: "1.5rem" }}>Write your first note</p>
        )}
      </div>
    </section>
  );
}
