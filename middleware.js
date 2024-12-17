import { NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";

const protectedRoutes = ["/notes"];
const publicRoutes = ["/login", "/signup"];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.userId) return NextResponse.redirect(new URL("/login", req.nextUrl));

  if (isPublicRoute && session?.userId && !req.nextUrl.pathname.startsWith("/notes"))
    return NextResponse.redirect(new URL("/notes", req.nextUrl));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
