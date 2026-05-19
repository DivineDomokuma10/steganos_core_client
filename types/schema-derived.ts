import z from "zod";
import { decodeSchema, encodeSchema } from "@/schema/steg";
import { loginSchema, registerSchema } from "@/schema/auth";

export type TEncodeStegFormValues = z.infer<typeof encodeSchema>;

export type TDecodeStegFormValues = z.infer<typeof decodeSchema>;

export type TLoginFormValues = z.infer<typeof loginSchema>;

export type TRegisterFormValues = z.infer<typeof registerSchema>;
