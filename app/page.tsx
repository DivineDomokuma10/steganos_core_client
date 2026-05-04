"use client";
import { Loader2 } from "lucide-react";

import AppLogo from "@/components/shared/logo";
import { useGetUserProfile } from "@/hook/queries/user";

export default function Home() {
  const { data, isLoading, error } = useGetUserProfile();

  if (isLoading) {
    return (
      <main className="w-screen h-screen bg-background flex justify-center items-center">
        <Loader2 size={30} className="text-primary animate-spin" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="w-screen h-screen bg-background flex flex-col justify-center items-center">
        <h3 className="text-lg text-red-500">{error.message}</h3>
      </main>
    );
  }

  return (
    <div className="bg-background">
      <AppLogo /> {JSON.stringify(data?.data)}
    </div>
  );
}
