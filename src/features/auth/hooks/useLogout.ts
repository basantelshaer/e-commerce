"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { removeTokken } from "../server/auth.actions";
import { setAuthInfo } from "@/app/store/auth.slice";
import { toast } from "react-toastify";

export default function useLogout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = async () => {
    await removeTokken();

    dispatch(
      setAuthInfo({
        isAuthenticated: false,
        userInfo: null,
      })
    );
     toast.success("logout successfully");
    router.push("/login");
    router.refresh();
  };

  return logout;
}