"use client";

import { useUser } from "@/context/user-context";
import LoadingSpinner from "./loading-spinner";

export default function SetLoading() {
  const { loading } = useUser(); // This is OK because "use client" is set above

  if (!loading) return null;
  return <LoadingSpinner />;
}
