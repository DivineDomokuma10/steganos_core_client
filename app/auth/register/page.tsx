"use client";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFormError, useResponseMsg } from "@/hook";
import { useRegisterMutation } from "@/hook/queries/auth";

import { AuthInput } from "../components";
import { IRegisterFields } from "@/interface";
import { registerSchema } from "@/schema/auth";

import Button from "@/components/shared/button";
import MessagesBox from "@/components/shared/message-box";

const Register = () => {
  const { register, handleSubmit, formState } = useForm<IRegisterFields>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  const { isValid, errors } = formState;

  const { mutate, isPending } = useRegisterMutation();

  const { resMsg, setResponseMsg } = useResponseMsg();

  const { isErrorExist, errorMessages } = useFormError(errors);

  const onsubmit = async (data: IRegisterFields) => {
    mutate(data, {
      onSuccess(res) {
        setResponseMsg({ msg: res.message, status: "success" });
      },
      onError(err) {
        setResponseMsg({ msg: err.message, status: "error" });
      },
    });
  };

  return (
    <main className="w-full flex flex-col items-center space-y-7 p-5 md:w-[35%]">
      {isErrorExist && <MessagesBox status="error" messages={errorMessages} />}

      {resMsg && <MessagesBox status={resMsg.status} messages={resMsg.msg} />}

      <form
        onSubmit={handleSubmit(onsubmit)}
        className="w-full flex flex-col items-center space-y-10 p-6 bg-gray-800/30"
      >
        <header className="w-full flex flex-col space-y-3">
          <div className="w-full flex justify-end space-x-2 items-center animate-pulse">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <p className="text-primary text-xs font-bold">READY</p>
          </div>

          <h1 className="text-white font-semibold text-3xl">
            ESTABLISH IDENTITY
          </h1>

          <p className="text-lg text-gray-400">
            SECURE ACCESS TO THE STEGANOS CORE ENVIRONMENT
          </p>
        </header>

        <AuthInput
          type="text"
          name="username"
          register={register}
          label="OPERATIONAL ALIAS"
          placeholder="SECURE EMAIL ADDRESS"
        />

        <AuthInput
          type="email"
          name="email"
          register={register}
          label="SECURE COMMS EMAIL"
          placeholder="SECURE EMAIL ADDRESS"
        />

        <AuthInput
          type="password"
          name="password"
          register={register}
          label="DEFINE ACCESS CIPHER"
          placeholder="* * * * * * * * * * * * * * * *"
        />

        <label className="w-full flex items-center space-x-2">
          <input
            type="checkbox"
            {...register("termsAndCondition")}
            className="w-6 h-6 accent-primary bg-slate-900 border-gray-600 rounded"
          />

          <span className="text-gray-500 font-bold text-lg">
            ACCEPT SECURITY PROTOCOLS
          </span>
        </label>

        <Button
          type="submit"
          disabled={!isValid || isPending}
          className="w-full text-lg flex items-center justify-center p-5 disabled:bg-primary/10 disabled:hover:scale-none"
        >
          {isPending ? (
            <Loader2 size={30} className="animate-spin" />
          ) : (
            "ESTABLISH IDENTITY"
          )}
        </Button>

        <div className="w-full flex items-center justify-center">
          <Link
            href={"/auth/login"}
            className="flex items-center space-x-2 transition duration-200 text-gray-400 font-bold hover:text-primary"
          >
            <ArrowLeft />
            <span>RETURN TO LOGIN</span>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Register;
