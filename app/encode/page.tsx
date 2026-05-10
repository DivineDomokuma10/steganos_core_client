"use client";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { stegSchema } from "@/schema/steg";
import { generatePassphrase } from "@/utils";
import { TStegFormValues } from "@/types/schema-derived";
import { AuthInput, AuthTextArea } from "../auth/components";

import Button from "@/components/shared/button";
import { FileUpload } from "@/components/shared/media-upload";
import DashboardWrapper from "@/components/shared/dashboard-wrapper";
import { decryptMessage, encryptMessage } from "@/utils/crypto/encryption";
import { useEncodeMutation } from "@/hook/queries/steg";

const EncodePage = () => {
  const { handleSubmit, register, control, formState, setValue } =
    useForm<TStegFormValues>({
      mode: "onChange",
      resolver: zodResolver(stegSchema),
      defaultValues: {
        message: "",
        passphrase: "",
      },
    });

  const { errors, isValid } = formState;

  const { mutate, isPending } = useEncodeMutation();

  const generatePhrase = () => {
    const phrase = generatePassphrase();

    setValue("passphrase", phrase, {
      shouldDirty: true,
    });
  };

  const onsubmit = async (data: TStegFormValues) => {
    console.log("raw", data);

    const { image, message, passphrase } = data;

    const result = await encryptMessage(message, passphrase);

    const payload = { ...result, image };

    mutate(payload, {
      onSuccess(res) {
        console.log(res);
      },
      onError(err) {
        console.error(err.message);
      },
    });
  };

  return (
    <DashboardWrapper>
      <main className="p-5">
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          <AuthTextArea
            rows={10}
            name="message"
            errors={errors}
            register={register}
            label="SECRET_MESSAGE"
            placeholder="INPUT PLAIN TEXT DATA"
          />

          <FileUpload control={control} name="image" label="MASKING_IMAGE" />

          <AuthInput
            type="text"
            errors={errors}
            name="passphrase"
            label="PASS_PHRASE"
            register={register}
            disabled
            placeholder="GENERATE PASSPHRASE"
          >
            <button
              type="button"
              onClick={generatePhrase}
              className="absolute right-5 top-1/3 text-primary font-semibold cursor-pointer"
            >
              GENERATE
            </button>
          </AuthInput>
          <div className="h-full flex items-end">
            <Button
              type="submit"
              disabled={!isValid}
              className="w-full text-lg flex items-center justify-center h-fit p-4 disabled:bg-primary/10 disabled:hover:scale-none"
            >
              {isPending ? (
                <Loader2 size={30} className="animate-spin" />
              ) : (
                "ENCODE PROTOCOL"
              )}
            </Button>
          </div>
        </form>
      </main>
    </DashboardWrapper>
  );
};

export default EncodePage;
