import { z } from "zod";
const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "email address is required " })
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters longs" })
    .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
      message: "Password should contain at least 1 special character",
    }),
});
type TSignInSchema = z.infer<typeof signInSchema>;
export { signInSchema, type TSignInSchema };
