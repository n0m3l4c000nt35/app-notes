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
            placeholder="user@domain.tld"
            required
            autoFocus
          />
        </label>
        {state?.errors?.email && (
          <p style={{ paddingLeft: "0.5rem", paddingBottom: "0.5rem", color: "red" }}>{state.errors.email}</p>
        )}
        <label className={styles.labelForm} htmlFor="password">
          <input
            className={styles.inputForm}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password.."
            required
          />
        </label>
        {state?.errors?.password && <p style={{ color: "red" }}>{state.errors.password}</p>}
        <button className={styles.submitForm} type="submit" aria-disabled={pending}>
          Login User
        </button>
        <p style={{ paddingTop: "0.5rem", color: "red" }} aria-live="polite" role="status">
          {state?.message}
        </p>
      </form>
    </div>
  );
}
