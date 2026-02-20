"use server";

import { cookies } from "next/headers";
import type { AuthState } from "@/app/store/auth.slice";
import axios, { AxiosRequestConfig } from "axios";

export async function setTokken(
  token: string,
  rememberMe: boolean
): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    maxAge: rememberMe
      ? 30 * 24 * 60 * 60
      : 1 * 24 * 60 * 60,
  });
}

export async function getTokken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value || null;
}

export async function removeTokken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

export async function verifyTokken(): Promise<AuthState> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    return {
      isAuthenticated: false,
      userInfo: null,
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
      method: "GET",
      headers: {
        token,
      },
    };

    const { data } = await axios.request(options);

    if (data.message === "verified") {
      const { name, id, role } = data.decoded;

      return {
        isAuthenticated: true,
        userInfo: {
          _id: id,   // ✅ أهم تعديل هنا
          name,
          role,
        },
      };
    }

    return {
      isAuthenticated: false,
      userInfo: null,
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      userInfo: null,
    };
  }
}