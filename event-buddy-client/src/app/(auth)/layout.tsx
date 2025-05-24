import AuthHeader from "@/components/auth-header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthHeader />
      <main className="bg-secondary">{children}</main>
    </>
  );
}
