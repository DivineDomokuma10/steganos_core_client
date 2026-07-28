"use client";
import DashboardWrapper from "@/components/shared/dashboard-wrapper";
import { FileUpload } from "@/components/shared/media-upload";
import { decodeSchema } from "@/schema/steg";
import { TDecodeStegFormValues } from "@/types/schema-derived";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthInput } from "../auth/components";
import Button from "@/components/shared/button";
import { useDecodeMutation } from "@/hook/queries/steg";
import { useState } from "react";
import { decryptMessage } from "@/utils/crypto/encryption";
import { toast } from "sonner";

const DecodePage = () => {
  const [decodedMsg, setDecodedMsg] = useState("");
  const [isDecoded, setIsDecoded] = useState(false);

  const { handleSubmit, register, control, formState, reset } =
    useForm<TDecodeStegFormValues>({
      mode: "onChange",
      resolver: zodResolver(decodeSchema),
      defaultValues: {
        passphrase: "",
      },
    });

  const { errors, isValid } = formState;

  const { mutate, isPending } = useDecodeMutation();

  const onsubmit = async (data: TDecodeStegFormValues) => {
    const { image, passphrase } = data;

    const formData = new FormData();

    formData.append("image", image);

    mutate(formData, {
      onSuccess: async (res) => {
        if (res.data) {
          const result = await decryptMessage(res.data, passphrase);

          setDecodedMsg(result);
          setIsDecoded(true);
        }

        toast.success(res.message);
      },
      onError(err) {
        toast.error(err.message);
      },
    });

    reset();
  };
  return (
    <DashboardWrapper>
      <main className="w-full flex flex-col items-center justify-center">
        {isDecoded ? (
          <aside className="w-full flex flex-col space-y-7 p-5 bg-gray-800 md:w-1/3">
            <h1 className="border-l-8 px-2 border-primary text-2xl text-primary font-bold">
              DECODED MESSAGE
            </h1>

            <div className="p-5 bg-black text-primary">{decodedMsg}</div>
          </aside>
        ) : (
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="w-full flex flex-col space-y-10 md:w-1/2"
          >
            <FileUpload control={control} name="image" label="MASKING_IMAGE" />

            <AuthInput
              type="text"
              errors={errors}
              name="passphrase"
              label="PASS_PHRASE"
              register={register}
              placeholder="ENTER PASSPHRASE"
            />

            <Button
              type="submit"
              disabled={!isValid || isPending}
              className="w-full text-lg flex items-center justify-center h-fit p-4 disabled:bg-primary/10 disabled:hover:scale-none"
            >
              {isPending ? "DECODING MESSAGE ..." : "DECODE PROTOCOL"}
            </Button>
          </form>
        )}
      </main>
    </DashboardWrapper>
  );
};

export default DecodePage;
