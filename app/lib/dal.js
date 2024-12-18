import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "@/app/lib/session";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("appnote_jwt")?.value;
  const session = await decrypt(cookie);
  if (!session?.userId) redirect("/login");
  return { isAuth: true, userId: session.userId };
});
