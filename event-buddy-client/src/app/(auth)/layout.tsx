import AuthHeader from "@/components/auth-header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthHeader />
      <main className="min-h-screen flex items-center justify-center bg-secondary">
        {children}
      </main>
    </>
  );
}
