"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Fingerprint, Key, Loader2 } from "lucide-react";

import { useFormError } from "@/hook";
import { ILoginFields } from "@/interface";
import { loginSchema } from "@/schema/auth";

import Button from "@/components/shared/button";
import { AuthInput, ErrorMessages } from "../components";
import { useLoginMutation } from "@/hook/queries/auth.hook";

const Login = () => {
  const { register, handleSubmit, formState } = useForm<ILoginFields>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const { isValid, errors } = formState;

  const { isErrorExist, errorMessages } = useFormError(errors);

  const { mutate, isPending } = useLoginMutation();

  const onsubmit = async (data: ILoginFields) => {
    mutate(data, {
      onSuccess(res) {
        console.log(res.message);
      },
      onError(err) {
        console.log(err.message);
      },
    });
  };

  return (
    <main className="w-full flex flex-col items-center space-y-7 p-5 md:w-[35%]">
      {isErrorExist && <ErrorMessages {...{ errorMessages }} />}

      <form
        onSubmit={handleSubmit(onsubmit)}
        className="w-full flex flex-col items-center space-y-10 p-6 bg-gray-800/30"
      >
        <header className="w-full flex flex-col space-y-3">
          <div className="w-full flex justify-end space-x-2 items-center animate-pulse">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <p className="text-primary text-xs font-bold">READY</p>
          </div>

          <h1 className="text-white font-semibold text-3xl">ACCESS PROTOCOL</h1>
        </header>

        <AuthInput
          type="email"
          name="email"
          icon={Fingerprint}
          register={register}
          label="SECURE COMMS EMAIL"
          placeholder="SECURE EMAIL ADDRESS"
        />

        <div className="w-full flex flex-col space-y-2">
          <AuthInput
            icon={Key}
            type="password"
            name="password"
            register={register}
            label="ACCESS CIPHER"
            placeholder="* * * * * * * * * * * * * * * *"
          />

          <div className="w-full flex justify-end">
            <Link
              href={"/auth/forgot"}
              className="text-sm text-gray-400 transition duration-200 hover:text-primary"
            >
              FORGOT ACCESS?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          disabled={!isValid}
          className="w-full text-lg flex items-center justify-center p-5 disabled:bg-primary/10 disabled:hover:scale-none"
        >
          {isPending ? (
            <Loader2 size={30} className="animate-spin" />
          ) : (
            "INITIATE SESSION"
          )}
        </Button>

        <div className="w-full flex flex-col space-y-7 items-center">
          <section className="w-full flex items-center space-x-2">
            <div className="flex-1 h-0.5 bg-gray-100/10" />

            <p className="text-sm text-gray-300 font-bold">NEW DEPLOYMENT?</p>

            <div className="flex-1 h-0.5 bg-gray-100/10" />
          </section>

          <Link
            href={"/auth/register"}
            className="flex items-center space-x-2 transition duration-200 text-white font-bold hover:text-primary"
          >
            <span>CREATE PROTOCOL</span>
            <ArrowRight />
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Login;
