import Image from "next/image";

import { toDashCase, toSnakeCase } from "@/utils";
import { IUserProfileResponse } from "@/interface";
import { ArrowRight, LockKeyhole, LockOpen } from "lucide-react";
import Link from "next/link";

export const ProfileHeader = (userData: IUserProfileResponse) => {
  return (
    <section className="flex-1 bg-foreground p-5 flex flex-col space-y-12">
      <header className="flex flex-col items-center space-y-10">
        <div className="w-full flex items-center justify-end">
          <p className="text-gray-500 text-xs font-semibold">
            STATUS: SECURE_SESSION
          </p>
        </div>

        <aside className="w-full h-fit flex flex-col items-center space-y-5">
          <div
            className="w-50 h-50 relative overflow-hidden btn-glow
  [clip-path:polygon(30%_0%,70%_0%,100%_30%,100%_70%,70%_100%,30%_100%,0%_70%,0%_30%)]"
          >
            <Image
              fill
              alt="profile-pics"
              src="/profile.jpg"
              className="object-cover duration-300 transition hover:scale-125"
            />
          </div>

          <h3 className="text-2xl text-gray-300">
            {toSnakeCase(userData.username.toUpperCase())}
          </h3>
        </aside>
      </header>

      <section className="space-y-3">
        <div className="space-y-1 text-sm">
          <p className="text-gray-400">IDENTITY HASH</p>
          <p className="text-gray-200">{toDashCase(userData._id)}</p>
        </div>

        <div className="space-y-1 text-sm">
          <p className="text-gray-400">SECURE COMMS EMAIL</p>
          <p className="text-gray-200">{userData.email}</p>
        </div>
      </section>
    </section>
  );
};

export const EncodeActionCard = () => {
  return (
    <section className="flex-1 bg-primary/70 p-5 flex flex-col justify-between space-y-10 ">
      <header className="w-full flex justify-between">
        <div className="w-1/2 space-y-2">
          <p className="text-sm text-gray-300 font-semibold">
            ACTION SEQUENCE 01
          </p>
          <h1 className="font-bold text-gray-700 text-4xl">ENCODE PROTOCOL</h1>
        </div>

        <LockKeyhole className="text-gray-300/70 stroke-2 size-25" />
      </header>

      <div className="h-3/5 flex flex-col justify-between space-y-10">
        <p className="text-2xl animate-pulse text-center text-gray-800 font-semibold">
          INITIATE STEGANOGRAPHY SEQUENCE
        </p>

        <p className="text-lg text-gray-700">
          Hide sensitive message within carrier files using Steganos_Core&apos;s
          steganographic layering algorithms.
        </p>

        <Link
          href={"/encode"}
          className="flex items-center space-x-3 font-semibold hover:text-primary"
        >
          {" "}
          <p>COMMENCE_SEQUENCES</p>
          <ArrowRight className="stroke-2 size-6" />
        </Link>
      </div>
    </section>
  );
};

export const DecodeActionCard = () => {
  return (
    <section className="flex-1 bg-foreground p-5 flex flex-col justify-between space-y-10">
      <header className="w-full flex justify-between">
        <div className="w-1/2 space-y-2">
          <p className="text-sm text-gray-500 font-semibold">
            ACTION SEQUENCE 02
          </p>
          <h1 className="font-bold text-gray-300 text-4xl">DECODE PROTOCOL</h1>
        </div>

        <LockOpen className="text-gray-300/70 stroke-2 size-25" />
      </header>

      <div className="h-3/5 flex flex-col justify-between space-y-10">
        <p className="text-2xl animate-pulse text-center text-gray-400 font-semibold">
          EXTRACT HIDDEN DATA PACKETS
        </p>

        <p className="text-lg text-gray-500">
          Extract and verify embedded payloads from secure carrier files usind
          Steganos_Core Algorithm.
        </p>

        <Link
          href={"/decode"}
          className="flex items-center space-x-3 font-semibold text-gray-300 hover:text-primary"
        >
          {" "}
          <p>COMMENCE_SEQUENCES</p>
          <ArrowRight className="stroke-2 size-6" />
        </Link>
      </div>
    </section>
  );
};
