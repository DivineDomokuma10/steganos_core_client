"use client";
import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Loader } from "./utils";

import SessionStore from "@/store/session";
import { OPEN_ROUTE } from "@/utils/constant";

const ProtectRoutes = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const sessionData = SessionStore((state) => state.session);
  const isLoading = SessionStore((state) => state.isLoading);
  const initSession = SessionStore((state) => state.initSession);

  useEffect(() => {
    void initSession();
  }, [initSession]);

  useEffect(() => {
    if (isLoading) return;

    const isAuthPage = OPEN_ROUTE.some((route) => pathname.startsWith(route));

    if (!sessionData && !isAuthPage) {
      router.replace("/auth/login");
      return;
    }

    if (sessionData && isAuthPage) {
      router.replace("/");
      return;
    }
  }, [isLoading, sessionData, pathname, router]);

  if (isLoading) {
    return (
      <Loader className="w-screen h-screen">
        <p className="text-center text-xl font-semibold text-primary animate-pulse">
          CONFIRMING SECURE IDENTITY...
        </p>
      </Loader>
    );
  }

  return <>{children}</>;
};

export default ProtectRoutes;
