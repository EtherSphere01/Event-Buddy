// src/app/(auth)/layout.tsx
"use client";
import AuthHeader from "@/components/auth-header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthHeader />
      <main className="bg-secondary min-h-screen">{children}</main>
    </>
  );
}
