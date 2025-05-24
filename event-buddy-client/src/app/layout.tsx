import { UserProvider } from "@/context/user-context";
import "./globals.css";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

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
        <UserProvider>
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </UserProvider>
      </body>
    </html>
  );
}
