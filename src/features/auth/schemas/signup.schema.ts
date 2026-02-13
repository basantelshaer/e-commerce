import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .nonempty("name is required")
      .min(3, "name must be at least 3 characters")
      .max(50, "name must be less than 50 characters"),

    email: z.string()
    .nonempty("email is required")
    .pipe(z.email("invalid email address")),

    password: z
      .string()
      .nonempty("password is required")   
      .min(6, "password must be at least 6 characters")
      .regex(/[A-Z]/, "password must contain at least one uppercase letter")
      .regex(/[a-z]/, "password must contain at least one lowercase letter")
      .regex(/[0-9]/, "password must contain at least one number")
      .regex(
        /[!@#$%^&*]/,
        "password must contain at least one special character"
      ),

    rePassword: z.string()
    .nonempty("re-password is required"),

    phone: z
      .string()
      .nonempty("phone is required")
      .regex(
        /^(\+2)?01[0125][0-9]{8}$/,
        "only egyptian phone numbers are allowed"
      ),

    terms: z
      .boolean()
      .refine((value) => value === true, {
        message: "you must accept the terms and conditions",
      }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "passwords and re-password must match",
    path: ["rePassword"],
  });

export type signupFormValues = z.infer<typeof signupSchema>;
