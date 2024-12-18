import type { Metadata } from "next";
import { AuthProvider } from "../context/auth-context";
import Footer from "@/app/components/footer/footer";
import "./globals.css";
import Header from "@/app/components/header/header";
import { neucha } from "@/fonts";

export const metadata: Metadata = {
  title: "Notes App",
  description: "App to create notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={neucha.className}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
