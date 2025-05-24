// app/(public)/layout.tsx
import MainHeader from "@/components/main-header";
import MainFooter from "@/components/main-footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
      <MainFooter />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
