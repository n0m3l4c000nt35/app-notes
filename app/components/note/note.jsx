"use client";

import { useActionState } from "react";
import { deleteNote } from "@/app/actions/notes";
import styles from "./note.module.css";
import { PiTrashBold } from "react-icons/pi";

const initialState = {
  message: null,
};

export default function Note({ id, title, content }) {
  const [state, formAction, pending] = useActionState(deleteNote, initialState);
  return (
    <article className={styles.note}>
      <div>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
      <form action={formAction}>
        <input type="hidden" name="id" value={id} />
        <button className={styles.buttonSubmit} type="submit">
          <PiTrashBold className={styles.trashIcon} />
        </button>
      </form>
    </article>
  );
}
