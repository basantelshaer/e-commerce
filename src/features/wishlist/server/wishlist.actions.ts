"use server";

import { cookies } from "next/headers";
import axios, { AxiosRequestConfig } from "axios";
import { WishlistResponse } from "../types/wishlist.types";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";

export async function getLoggedUserWishlist(): Promise<WishlistResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Authentication required");

  const options: AxiosRequestConfig = {
    url: BASE_URL,
    method: "GET",
    headers: { token },
  };

  const { data } = await axios.request(options);
  return data;
}

export async function addProductToWishlist(productId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Authentication required");

  const options: AxiosRequestConfig = {
    url: BASE_URL,
    method: "POST",
    headers: { token },
    data: { productId },
  };

  const { data } = await axios.request(options);
  return data;
}

export async function removeProductFromWishlist(productId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Authentication required");

  const options: AxiosRequestConfig = {
    url: `${BASE_URL}/${productId}`,
    method: "DELETE",
    headers: { token },
  };

  const { data } = await axios.request(options);
  return data;
}