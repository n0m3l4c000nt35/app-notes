import { cookies } from "next/headers";
import Navbar from "@/app/components/navbar/navbar";
import styles from "./header.module.css";
import { decrypt } from "@/app/lib/session";

export default async function Header() {
  const cookie = (await cookies()).get("appnote_jwt")?.value;
  const payload = cookie ? await decrypt(cookie) : null;
  return (
    <header className={styles.header}>
      <Navbar user={payload?.userId} />
    </header>
  );
}
