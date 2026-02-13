"use server";

import { signupSchema, type signupFormValues } from "../schemas/signup.schema";
import { AxiosError } from "axios";
import axios from "axios";

export default async function signupActions(values: signupFormValues) {

  const validationResult = signupSchema.safeParse(values);

  if (!validationResult.success) {
    const errors: Record<string, string> = {};

    validationResult.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;

      if (!errors[field]) {
        errors[field] = issue.message;
      }
    });

    return {
      success: false,
      message: "validation error",
      errors,
    };
  }

  const { terms, ...requestBody } = values;

  try {

    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      requestBody
    );

    if (data.message === "success") {
      return {
        success: true,
        message: "account created successfully",
        data,
      };
    }

    return {
      success: false,
      message: data.message || "something went wrong",
    };

  } catch (error) {
    if(error instanceof AxiosError){
     const errorMessage = error.response?.data.message;
     if(errorMessage==="Account already exists"){
        return {
            success: false,
            message: "Account already exists",
            errors: {
              email: " an account with this email already exists",
            },
        }
     }
    }

    return {
      success: false,
      message: "something went wrong, please try again later",
    };

  }
}
 