import z from "zod";
import { stegSchema } from "@/schema/steg";
import { loginSchema, registerSchema } from "@/schema/auth";

export type TStegFormValues = z.infer<typeof stegSchema>;

export type TLoginFormValues = z.infer<typeof loginSchema>;

export type TRegisterFormValues = z.infer<typeof registerSchema>;
