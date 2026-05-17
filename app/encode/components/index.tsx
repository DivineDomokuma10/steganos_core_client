"use  client";
import Button from "@/components/shared/button";
import { useCopyToClipboard } from "@/hook/copy";
import { TCopyStatus } from "@/types";
import { TStegImageMeta } from "@/types/steg";
import { formatToMB } from "@/utils";
import { Check, Copy, Download, Terminal, X } from "lucide-react";
import Image from "next/image";

interface Props {
  passPhrase: string;
  meta: TStegImageMeta;
  stegImgUrl: string | null;
  downloadStegImg: (filename?: string) => void;
}

export const StegImagePreview = ({
  meta,
  stegImgUrl,
  passPhrase,
  downloadStegImg,
}: Props) => {
  const { copy, status } = useCopyToClipboard();

  const getCopyStatusIcon = (status: TCopyStatus) => {
    if (status === "copied") return <Check className="text-green-400" />;

    if (status === "idle") return <Copy className="text-primary" />;

    return <X className="text-red-400" />;
  };

  return (
    <>
      {stegImgUrl ? (
        <main className="w-full h-screen flex flex-col space-y-10 md:flex-row md:space-y-0 md:space-x-10">
          <div className="relative z-0 w-full h-[25rem] md:h-[30rem] overflow-hidden md:w-1/2">
            <Image
              fill
              src={stegImgUrl}
              className="object-cover"
              alt="Steganographic Image"
            />
          </div>

          <section className="w-full md:w-1/2 flex flex-col space-y-5">
            <aside className="flex flex-col space-y-7 p-5 bg-gray-800">
              <h1 className="border-l-8 px-2 border-primary text-2xl text-primary font-bold">
                FILE METADATA
              </h1>

              <section className="grid grid-cols-2 gap-5">
                <div className="space-y-1 text-sm">
                  <p className="text-gray-400">SIZE</p>
                  <p className="text-gray-200">{formatToMB(meta.size)}</p>
                </div>

                <div className="space-y-1 text-sm">
                  <p className="text-gray-400">FORMAT</p>
                  <p className="text-gray-200">{meta.format.toUpperCase()}</p>
                </div>

                <div className="space-y-1 text-sm">
                  <p className="text-gray-400">IDENTIFIER</p>
                  <p className="text-gray-200">{meta.fileName.toUpperCase()}</p>
                </div>
              </section>
            </aside>

            <aside className="flex flex-col space-y-7 p-5 bg-gray-800">
              <h1 className="border-l-8 px-2 border-primary text-2xl text-primary font-bold">
                CIPHER KEY
              </h1>

              <div className="relative p-5 bg-black text-primary">
                {passPhrase}

                <span
                  className="absolute right-5"
                  onClick={async () => await copy(passPhrase)}
                >
                  {getCopyStatusIcon(status)}
                </span>
              </div>
            </aside>

            <Button
              onClick={() => downloadStegImg()}
              className="w-full flex justify-center p-5 items-center space-x-3"
            >
              <Download />
              <span className="text-lg">DOWNLOAD IMAGE</span>
            </Button>
          </section>
        </main>
      ) : (
        <main className="w-full h-full flex items-center justify-center space-x-3">
          <Terminal className="text-red-500 size-5" />
          <p className="text-red-500 font-bold animate-pulse text-xl text-center">
            NO STEG-IMAGE FOUND
          </p>
        </main>
      )}
    </>
  );
};
