import { z } from "zod";

export const stegSchema = z.object({
  message: z.string().min(1, "Message is required"),
  passphrase: z.string().min(6, "Passphrase must be at least 6 chars"),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Image is required"),
});
