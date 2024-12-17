"use client";

import { useActionState } from "react";
import { signupUser } from "@/app/actions/auth";
import styles from "./page.module.css";
import { FaUserCircle } from "react-icons/fa";

const initialState = {
  message: null,
};

export default function Page() {
  const [state, formAction, pending] = useActionState(signupUser, initialState);
  return (
    <div className={styles.signupPage}>
      <h1 className={styles.titlePage}>Signup</h1>
      <FaUserCircle className={styles.userIcon} />
      <form action={formAction}>
        <label className={styles.labelForm} htmlFor="email">
          <input
            className={styles.inputForm}
            type="email"
            name="email"
            id="email"
            placeholder="user@domain.tld"
            minLength={5}
            maxLength={50}
            autoFocus
            required
          />
        </label>
        {state?.errors?.email && (
          <p style={{ paddingLeft: "0.5rem", paddingBottom: "0.5rem", color: "red" }}>{state.errors.email}</p>
        )}
        <label className={styles.labelForm} htmlFor="password">
          <input
            className={styles.inputForm}
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password.."
            required
          />
        </label>
        {state?.errors?.password && <p style={{ color: "red" }}>{state.errors.password}</p>}
        <button className={styles.submitForm} type="submit" aria-disabled={pending}>
          Register User
        </button>
        {state?.message && (
          <p style={{ paddingTop: "0.5rem", color: "red" }} aria-live="polite" role="status">
            {state?.message}
          </p>
        )}
      </form>
    </div>
  );
}
