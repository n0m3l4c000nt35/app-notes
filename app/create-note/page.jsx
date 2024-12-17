"use client";

import { useActionState } from "react";
import { createNote } from "@/app/actions/notes";
import styles from "./page.module.css";
import { LuNotebookPen } from "react-icons/lu";

const initialState = {
  message: null,
};

export default function NewNote() {
  const [state, formAction, pending] = useActionState(createNote, initialState);
  return (
    <section className={styles.createNote}>
      <h1 className={styles.titlePage}>Create Note</h1>
      <LuNotebookPen className={styles.createNoteIcon} />
      <form action={formAction}>
        <label className={styles.labelForm} htmlFor="title">
          Title
          <input
            className={styles.inputForm}
            type="text"
            name="title"
            id="title"
            minLength={1}
            maxLength={100}
            placeholder="Enter title note.."
            required
            autoFocus
          />
        </label>
        {state?.errors?.title && <p className={`${styles.error} ${styles.inputError}`}>{state.errors.title}</p>}
        <label className={styles.labelForm} htmlFor="content">
          Content
          <textarea
            className={styles.textareaForm}
            name="content"
            id="content"
            minLength={1}
            maxLength={5000}
            placeholder="Write your note here.."
            required
            rows={10}
          ></textarea>
        </label>
        {state?.errors?.content && <p className={`${styles.error} ${styles.inputError}`}>{state.errors.content}</p>}
        <button className={styles.submitForm} type="submit" aria-disabled={pending}>
          Save Note
        </button>
        {state?.message && (
          <p className={`${styles.error} ${stateError}`} aria-live="polite" role="status">
            {state?.message}
          </p>
        )}
      </form>
    </section>
  );
}
