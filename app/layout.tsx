import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Bibing's Wedding",
  description:
    "Join us as we celebrate the wedding of Bibing & Partner. RSVP, view the schedule, find the venue, and browse our gallery.",
  openGraph: {
    title: "Bibing's Wedding",
    description: "You're invited! Join us to celebrate our special day.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="antialiased bg-white text-green-900 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="bg-green-800 text-green-100 text-center py-6 text-sm">
          <p>Made with love · Bibing &amp; Partner · 2026</p>
        </footer>
      </body>
    </html>
  );
}
