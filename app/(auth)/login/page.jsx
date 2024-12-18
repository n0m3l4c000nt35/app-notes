"use client";

import { useActionState, useState } from "react";
import { loginUser } from "@/app/actions/auth";
import styles from "./page.module.css";
import { FaUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";

const initialState = {
  message: null,
};

export default function Page() {
  const [state, formAction, pending] = useActionState(loginUser, initialState);
  const [showPassword, setShowPassword] = useState();
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  return (
    <div className={styles.loginPage}>
      <h1 className={styles.titlePage}>Login</h1>
      <FaUserCircle className={styles.userIcon} />
      <form action={formAction}>
        <label className={styles.labelForm} htmlFor="email">
          Email
          <input
            className={styles.inputForm}
            type="email"
            id="email"
            name="email"
            placeholder="email@domain.tld"
            minLength={5}
            maxLength={50}
            pattern="/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/"
            required
            autoFocus
          />
        </label>
        <label className={styles.labelForm} htmlFor="password">
          Password
          <div className={styles.labelPasswordContainer}>
            <input
              className={styles.inputForm}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
            <button type="button" onClick={togglePasswordVisibility} className={styles.buttonToggleEyeIcon}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
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
