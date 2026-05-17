import { TStegImageMeta } from "@/types/steg";
import { useCallback, useEffect, useState } from "react";

export function useStegImage() {
  const [meta, setMetaData] = useState<TStegImageMeta>({
    size: 0,
    format: "",
    fileName: "",
  });
  const [stegImgUrl, setStegImgUrl] = useState<string | null>(null);

  const handleImgUrl = useCallback((imageBlob: Blob) => {
    const url = URL.createObjectURL(imageBlob);

    setMetaData({
      size: imageBlob.size,
      format: imageBlob.type,
      fileName: "steg-image.png",
    });

    setStegImgUrl((prevUrl) => {
      if (prevUrl) {
        URL.revokeObjectURL(prevUrl);
      }

      return url;
    });
  }, []);

  const downloadStegImg = useCallback(
    (filename = "steg-image.png") => {
      if (!stegImgUrl) return;

      const anchor = document.createElement("a");

      anchor.href = stegImgUrl;
      anchor.download = filename;

      document.body.appendChild(anchor);

      anchor.click();

      document.body.removeChild(anchor);
    },
    [stegImgUrl],
  );

  useEffect(() => {
    return () => {
      if (stegImgUrl) {
        URL.revokeObjectURL(stegImgUrl);
      }
    };
  }, [stegImgUrl]);

  return {
    meta,
    stegImgUrl,
    handleImgUrl,
    downloadStegImg,
  };
}
