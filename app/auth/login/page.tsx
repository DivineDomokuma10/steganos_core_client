"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Fingerprint, Key, Loader2 } from "lucide-react";

import { useLoginMutation } from "@/hook/queries/auth";
import { TLoginFormValues } from "@/types/schema-derived";

import useAuthStore from "@/store/auth";
import SessionStore from "@/store/session";

import { loginSchema } from "@/schema/auth";

import { AuthInput } from "../components";
import Button from "@/components/shared/button";
import { toast } from "@/components/shared/toast";

const Login = () => {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<TLoginFormValues>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const { isValid, errors } = formState;

  const { mutateAuthData } = useAuthStore();

  const { mutate, isPending } = useLoginMutation();

  const mutateSession = SessionStore((state) => state.mutateSession);

  const onsubmit = async (data: TLoginFormValues) => {
    mutate(data, {
      onSuccess(res) {
        if (res.data) {
          const { accessToken, userId } = res.data;

          mutateAuthData({
            accessToken,
          });

          mutateSession({
            userId,
          });
        }

        toast.success(res.message);

        setTimeout(() => router.replace("/"), 1000);
      },
      onError(err) {
        toast.error(err.message);
      },
    });
  };

  return (
    <main className="w-full flex flex-col items-center space-y-7 p-5 md:w-[35%]">
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="w-full flex flex-col items-center space-y-10 p-6 bg-gray-800/30"
      >
        <header className="w-full flex flex-col space-y-3">
          <div className="w-full flex justify-end space-x-2 items-center animate-pulse">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <p className="text-primary text-xs font-bold">READY</p>
          </div>

          <h1 className="text-white font-semibold text-3xl">LOGIN</h1>
        </header>

        <AuthInput
          type="email"
          name="email"
          errors={errors}
          icon={Fingerprint}
          register={register}
          label="EMAIL  ADDRESS"
          placeholder="SECURE EMAIL ADDRESS"
        />

        <div className="w-full flex flex-col space-y-2">
          <AuthInput
            icon={Key}
            type="password"
            name="password"
            errors={errors}
            register={register}
            label="PASSWORD"
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
          {isPending ? <Loader2 size={30} className="animate-spin" /> : "LOGIN"}
        </Button>

        <div className="w-full flex flex-col space-y-7 items-center">
          <section className="w-full flex items-center space-x-2">
            <div className="flex-1 h-0.5 bg-gray-100/10" />

            <p className="text-sm text-gray-300 font-bold">NO ACCOUNT?</p>

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
