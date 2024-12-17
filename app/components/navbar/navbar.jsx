"use client";

import { useActionState } from "react";
import Link from "next/link";
import { logoutUser } from "@/app/actions/auth";
import styles from "./navbar.module.css";

export default function Navbar({ user }) {
  const [state, formAction, pending] = useActionState(logoutUser, null);
  return (
    <nav className={styles.nav}>
      <div>
        <Link className={styles.navLink} href="/">
          Home
        </Link>
        {user && (
          <Link className={styles.navLink} href="/notes">
            Notes
          </Link>
        )}
      </div>
      <div>
        {!user ? (
          <>
            <Link className={styles.navLink} href="/signup">
              Signup
            </Link>
            <Link className={styles.navLink} href="/login">
              Login
            </Link>
          </>
        ) : (
          <form action={formAction} className={styles.navLinkForm}>
            <button className={styles.btnLogout} type="submit" aria-disabled={pending}>
              Logout
            </button>
          </form>
        )}
      </div>
    </nav>
  );
}
