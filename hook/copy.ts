import { TCopyStatus } from "@/types";
import { useCallback, useState } from "react";

export function useCopyToClipboard(resetDelay = 2000) {
  const [status, setStatus] = useState<TCopyStatus>("idle");

  const copy = useCallback(
    async (text: string) => {
      if (!text) return false;

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";

          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();

          document.execCommand("copy");
          document.body.removeChild(textarea);
        }

        setStatus("copied");

        setTimeout(() => setStatus("idle"), resetDelay);

        return true;
      } catch (err) {
        console.error("Copy failed:", err);
        setStatus("error");

        setTimeout(() => setStatus("idle"), resetDelay);

        return false;
      }
    },
    [resetDelay],
  );

  return {
    copy,
    status,
  };
}
