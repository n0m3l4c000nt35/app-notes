import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email()
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    .trim(),
  password: z.string().min(4).trim(),
});

export const SignupFormSchema = z.object({
  email: z.string().email().trim(),
  password: z
    .string()
    .min(4, { message: "Be at least 4 character long" })
    .regex(/[a-zA-Z]+/, { message: "Must include at least one character from a to z" })
    .regex(/[0-9]+/, { message: "Must include at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Must include at least one special character" })
    .trim(),
});

export const CreateNoteFormSchema = z.object({
  title: z.string().min(4, { message: "Be at least 1 character long" }).trim(),
  content: z.string().min(4, { message: "Be at least 1 character long" }).trim(),
});
