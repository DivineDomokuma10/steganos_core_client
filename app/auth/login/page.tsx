"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Fingerprint, Key } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { ILoginFields } from "@/interface";
import AuthInput from "../components/input";
import { loginSchema } from "@/schema/auth";
import Button from "@/components/shared/button";
import { useFormError } from "@/hook";

const Login = () => {
  const { register, handleSubmit, formState } = useForm<ILoginFields>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const { isValid, errors } = formState;

  const { isErrorExist, errorMessages } = useFormError(errors);

  const onsubmit = async (data: ILoginFields) => {
    console.log(data);
  };

  return (
    <main className="w-full flex flex-col items-center space-y-7 p-5 md:w-[35%]">
      {isErrorExist && (
        <section className="w-full p-5 border bg-red-600/10 border-red-600 flex flex-col space-y-2">
          {errorMessages.map((errMsg, i) => (
            <div key={errMsg + i} className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />

              <p className="text-red-500">{errMsg.toUpperCase()}</p>
            </div>
          ))}
        </section>
      )}

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
          className="w-full text-lg p-5 disabled:bg-primary/10 disabled:hover:scale-none"
        >
          INITIATE SESSION
        </Button>
      </form>
    </main>
  );
};

export default Login;
