"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { generatePassphrase } from "@/utils";
import { encryptMessage } from "@/utils/crypto/encryption";

import { encodeSchema } from "@/schema/steg";
import { useStegImage } from "@/hook/steg";
import { useEncodeMutation } from "@/hook/queries/steg";
import { TEncodeStegFormValues } from "@/types/schema-derived";
import { AuthInput, AuthTextArea } from "../auth/components";

import { StegImagePreview } from "./components";
import Button from "@/components/shared/button";
import { FileUpload } from "@/components/shared/media-upload";
import DashboardWrapper from "@/components/shared/dashboard-wrapper";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const EncodePage = () => {
  const [passPhrase, setPassPhrase] = useState("");
  const [isStegDone, setIStegDone] = useState(false);

  const { handleSubmit, register, control, formState, setValue, reset } =
    useForm<TEncodeStegFormValues>({
      mode: "onChange",
      resolver: zodResolver(encodeSchema),
      defaultValues: {
        message: "",
        passphrase: "",
      },
    });

  const { errors, isValid } = formState;

  const { mutate, isPending } = useEncodeMutation();

  const { meta, stegImgUrl, handleImgUrl, downloadStegImg } = useStegImage();

  const generatePhrase = () => {
    const phrase = generatePassphrase();

    setValue("passphrase", phrase, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setPassPhrase(phrase);
  };

  const onsubmit = async (data: TEncodeStegFormValues) => {
    const { image, message, passphrase } = data;

    const result = await encryptMessage(message, passphrase);

    const formData = new FormData();

    formData.append("image", image);
    formData.append("iv", result.iv);
    formData.append("salt", result.salt);
    formData.append("ciphertext", result.ciphertext);

    mutate(formData, {
      onSuccess(img) {
        handleImgUrl(img);
        setIStegDone(true);

        toast.success("Image Encoded successfully");
      },
      onError(err) {
        toast.error(err.message);
      },
    });

    reset();
  };

  return (
    <DashboardWrapper>
      <main className="">
        {isStegDone ? (
          <div className="w-full h-fit space-y-5">
            <button
              onClick={() => setIStegDone(false)}
              className="text-primary cursor-pointer flex items-center p-3 text-lg gap-3"
            >
              <ArrowLeft />
              ENCODE ANOTHER
            </button>

            <StegImagePreview
              {...{ downloadStegImg, meta, stegImgUrl, passPhrase }}
            />
          </div>
        ) : (
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
                disabled={!isValid || isPending}
                className="w-full text-lg flex items-center justify-center h-fit p-4 disabled:bg-primary/10 disabled:hover:scale-none"
              >
                {isPending ? "ENCODING MESSAGE ..." : "ENCODE PROTOCOL"}
              </Button>
            </div>
          </form>
        )}
      </main>
    </DashboardWrapper>
  );
};

export default EncodePage;
