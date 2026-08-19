import z from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(2, "Password is required"),
});

// export const registerSchema = z.object({
//   email: z.string().email("Invalid email address"),

//   termsAndCondition: z.boolean().refine((val) => val === true, {
//     message: "You must accept the terms and conditions",
//   }),

//   password: z
//     .string()
//     .min(5, "Password must be at least 5 characters long")
//     .regex(/[a-z]/, "Password must contain at least one lowercase letter")
//     .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//     .regex(/[0-9]/, "Password must contain at least one number"),

//   username: z.string().min(2, "Username must be at least 2 characters"),
// });

export const registerSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters long"),
  username: z.string().min(2, "Username must be at least 2 characters"),
});
