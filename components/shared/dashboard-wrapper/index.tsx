import { ReactNode } from "react";
import { HeaderNav, MobileNav } from "./navs";
import { FOOTER_LINKS } from "@/utils/constant";

const DashboardWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-full h-screen flex flex-col">
      <HeaderNav />

      <section className="h-full w-full px-5 py-24 md:py-28 md:px-14 overflow-y-auto">
        {children}
      </section>

      <footer className="hidden w-full p-5 items-center justify-between md:flex">
        <div>
          <h3 className="text-white">
            © 2026 <span className="text-primary glow-text">STEGANOS_CORE</span>{" "}
            STEGANOGRAPHY_ENGINE
          </h3>

          <p className="text-sm text-gray-300">
            UNAUTHORIZED ACCESS PROHIGBITED
          </p>
        </div>

        <section className="items-center space-x-10 hidden md:flex">
          {FOOTER_LINKS.map((link, i) => (
            <a
              href={link.path}
              key={i + link.text + "footer"}
              className="text-white hover:text-primary glow-text"
            >
              {link.text.toUpperCase()}
            </a>
          ))}
        </section>
      </footer>

      <MobileNav />
    </main>
  );
};

export default DashboardWrapper;
