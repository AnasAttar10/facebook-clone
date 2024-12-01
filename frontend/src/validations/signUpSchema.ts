import { z } from "zod";

const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "first name is required ")
      .max(25, "first name should be less than 25 letters "),
    lastName: z
      .string()
      .min(1, "last name is required ")
      .max(25, "last name should be less than 25 letters "),
    email: z
      .string()
      .min(1, "email is required ")
      .email("Invalid email address"),
    birthday: z
      .string()
      .min(1, "birthday is required ")
      .transform((str) => new Date(str)),
    gender: z.enum(["male", "female"], { message: "Expected male or femal" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters longs" })
      .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
        message: "Password should contain at least 1 special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "Password and Confirm Password does not match",
    path: ["confirmPassword"],
  });

type TSignUpSchema = z.infer<typeof signUpSchema>;
export { signUpSchema, type TSignUpSchema };
