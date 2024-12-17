import type { Metadata } from "next";
import { AuthProvider } from "../context/auth-context";
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
          <footer style={{ gridArea: "footer", padding: "1rem" }}>
            <p style={{ fontSize: "1.2rem", textAlign: "center" }}>
              <b style={{ color: "crimson" }}>&copy;</b> 2024 <b style={{ color: "orange" }}>n0m3l4c000nt35</b>
            </p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
