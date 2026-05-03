import AppLogo from "@/components/shared/logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full min-h-screen flex flex-col">
      <header className="p-5">
        <AppLogo />
      </header>

      <section className="w-full h-full flex items-center justify-center">
        {children}
      </section>
    </main>
  );
}
