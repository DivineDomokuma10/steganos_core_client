"use client";
import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Loader } from "./utils";
import AuthStore from "@/store/auth";
import SessionStore from "@/store/session";
import { OPEN_ROUTE } from "@/utils/constant";

const ProtectRoutes = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { authData } = AuthStore();
  const { isLoading, initSession } = SessionStore();

  useEffect(() => {
    initSession();
  }, [initSession]);

  useEffect(() => {
    if (isLoading) return;

    const isAuthPage = OPEN_ROUTE.includes(pathname);

    if (!authData && !isAuthPage) {
      router.replace("/auth/login");
      return;
    }

    if (authData && isAuthPage) {
      router.replace("/");
      return;
    }
  }, [isLoading, authData, pathname]);

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
