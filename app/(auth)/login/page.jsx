"use client";

import { useActionState } from "react";
import { loginUser } from "@/app/actions/auth";
import styles from "./page.module.css";
import { FaUserCircle } from "react-icons/fa";

const initialState = {
  message: null,
};

export default function Page() {
  const [state, formAction, pending] = useActionState(loginUser, initialState);
  return (
    <div className={styles.loginPage}>
      <h1 className={styles.titlePage}>Login</h1>
      <FaUserCircle className={styles.userIcon} />
      <form action={formAction}>
        <label className={styles.labelForm} htmlFor="email">
          <input
            className={styles.inputForm}
            type="email"
            id="email"
            name="email"
            placeholder="email@domain.tld"
            required
            autoFocus
          />
        </label>
        <label className={styles.labelForm} htmlFor="password">
          <input
            className={styles.inputForm}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </label>
        <button className={styles.submitForm} type="submit" aria-disabled={pending}>
          Login User
        </button>
        {state?.message && (
          <p className={styles.errorState} aria-live="polite" role="status">
            {state?.message}
          </p>
        )}
      </form>
    </div>
  );
}
