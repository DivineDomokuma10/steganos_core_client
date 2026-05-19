"use client";
import Link from "next/link";
import { UserCircleIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/utils";
import AppLogo from "../logo";
import { NAV_LINKS } from "@/utils/constant";

export const HeaderNav = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full flex items-center space-x-3 justify-between z-30 p-5 shadow fixed top-0 left-0 bg-background md:py-7 md:px-14">
      <AppLogo />

      <section className="items-center space-x-10 hidden md:flex">
        {NAV_LINKS.map((link, i) => (
          <Link
            key={i + link.text + "desktop"}
            href={link.path}
            className={cn("text-white hover:text-primary glow-text", {
              "text-primary": pathname === link.path,
            })}
          >
            {link.text.toUpperCase()}
          </Link>
        ))}
      </section>

      <UserCircleIcon size={30} className="text-primary stroke-2" />
    </nav>
  );
};

export const MobileNav = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full flex items-center justify-between fixed left-0 bottom-0 p-5 bg-foreground md:hidden">
      {NAV_LINKS.map((link, i) => (
        <Link
          key={i + link.text + "mobile"}
          className={cn(
            "flex flex-col text-sm space-y-1 items-center text-white hover:text-primary glow-text",
            {
              "text-primary": pathname === link.path,
            },
          )}
          href={link.path}
        >
          <link.icon size={25} className="stroke-3" />

          <p>{link.text.toUpperCase().split("_")[0]}</p>
        </Link>
      ))}
    </nav>
  );
};
