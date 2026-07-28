"use client";

import { Toaster as SonnerToaster } from "sonner";
import { Terminal } from "lucide-react";

const iconClass = "stroke-3 shrink-0";

const Toaster = () => {
  return (
    <SonnerToaster
      closeButton
      position="top-right"
      icons={{
        success: (
          <Terminal size={18} className={iconClass} style={{ color: "#22c55e" }} />
        ),
        error: (
          <Terminal size={18} className={iconClass} style={{ color: "#ef4444" }} />
        ),
      }}
      toastOptions={{ unstyled: true }}
      duration={4000}
    />
  );
};

export { Toaster };
export { toast } from "sonner";
