import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "dep. — Instant HTML Hosting",
  description:
    "Instantly host your single-page HTML applications. No setup, no drama. Just deploy.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-[#08090f] text-white min-h-dvh font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
