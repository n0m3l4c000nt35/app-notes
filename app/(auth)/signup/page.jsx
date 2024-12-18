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
            // pattern="/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/"
            autoFocus
            // required
          />
        </label>
        {state?.errors?.email && (
          <div className={styles.errorEmailContainer}>
            {state?.errors?.email.map((error, index) => (
              <p className={styles.errorEmail} key={`error_email_${index}`}>
                {error}
              </p>
            ))}
          </div>
        )}
        <label className={styles.labelForm} htmlFor="password">
          <input
            className={styles.inputForm}
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            required
          />
        </label>
        {state?.errors?.password && (
          <div className={styles.errorPasswordContainer}>
            {state.errors.password.map((error, index) => (
              <p className={styles.errorPassword} key={`error_password_${index}`}>
                {error}
              </p>
            ))}
          </div>
        )}
        <button className={styles.submitForm} type="submit" aria-disabled={pending}>
          Register User
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
