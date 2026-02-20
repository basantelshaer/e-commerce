"use server";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {
  forgetPasswordSchema,
  ForgetPasswordFormValues,
} from "../schemas/forgetpassword.schema";

export async function forgetPasswordAction(
  values: ForgetPasswordFormValues
) {
  const validationResult = forgetPasswordSchema.safeParse(values);

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
      message: "validation failed",
      errors,
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      method: "POST",
      data: values,
    };

    const { data } = await axios.request(options);

    if (data.statusMsg === "success") {
      return {
        success: true,
        message: "Reset link sent successfully",
      };
    }

    return {
      success: false,
      message: data.message,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Something went wrong",
      };
    }

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}