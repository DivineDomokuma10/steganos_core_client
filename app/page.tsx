"use client";
import { Loader2 } from "lucide-react";

import {
  DecodeActionCard,
  EncodeActionCard,
  ProfileHeader,
} from "@/components/home";
import { useGetUserProfile } from "@/hook/queries/user";
import DashboardWrapper from "@/components/shared/dashboard-wrapper";

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
      <main className="w-full h-screen bg-background flex flex-col justify-center items-center">
        <h3 className="text-lg text-red-500">{error.message}</h3>
      </main>
    );
  }

  if (!data?.data) {
    return (
      <main className="w-full h-screen bg-background flex flex-col justify-center items-center">
        <h3 className="text-lg text-red-500">No User Data found</h3>
      </main>
    );
  }

  const userData = data.data;

  return (
    <DashboardWrapper>
      <main className="w-full flex flex-col md:flex-row md:items-center gap-10 py-5">
        <ProfileHeader {...userData} />

        <EncodeActionCard />

        <DecodeActionCard />
      </main>
    </DashboardWrapper>
  );
}
