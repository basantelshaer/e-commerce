"use server";

import { loginSchema, type LoginFormValues } from "../schemas/login.schema";
import axios, { AxiosError } from "axios";

export default async function loginActions(values: LoginFormValues) {
  const validationResult = loginSchema.safeParse(values);

  if (!validationResult.success) {
    const errors: Record<string, string> = {};

    validationResult.error.issues.forEach((issue) => {
      const key = issue.path[0] as string;

      if (!errors[key]) {
        errors[key] = issue.message;
      }
    });

    return {
      success: false,
      message: "validation error",
      errors,
    };
  }

  try {
    const { rememberMe, ...requestData } = values;

    const { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/auth/signin",      
      requestData
    );

    if (data.message === "success") {
      return {
        success: true,
        message: "user logged in successfully",
        data,
      };
    }

    return {
      success: false,
      message: data?.message || "login failed",
    };

  } catch (error) {

    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message;

      if (errorMessage === "incorrect email or password") {
        return {
          success: false,
          message: "wrong credentials",
          errors: {
            password: "incorrect email or password",
          },
        };
      }

      return {
        success: false,
        message: errorMessage || "login failed",
      };
    }

    return {
      success: false,
      message: "something went wrong, please try again later",
    };
  }
}
 