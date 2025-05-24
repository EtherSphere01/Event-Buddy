import "./globals.css";
import type { Metadata } from "next";

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
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
