import { z } from "zod";
import { MAX_SIZE } from "@/utils/constant";

export const stegSchema = z.object({
  message: z.string().min(1, "Message is required"),
  passphrase: z.string().min(6, "Passphrase must be at least 6 chars"),
  image: z
    .instanceof(File, {
      message: "PNG image is required",
    })
    .refine((file) => file.type === "image/png", {
      message: "Only PNG files are allowed",
    })
    .refine((file) => file.size <= MAX_SIZE, {
      message: "File size must not exceed 10MB",
    }),
});
