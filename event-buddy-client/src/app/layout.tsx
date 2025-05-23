import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Event Buddy",
  description: "Your event management platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="bg-background text-foreground">
        {children}
        <ToastContainer position="top-right" autoClose={3000} />;
      </body>
    </html>
  );
}
