"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgetPasswordFormValues,
  forgetPasswordSchema,
} from "../../schemas/forgetpassword.schema";
import { forgetPasswordAction } from "../../server/forgetpassword.action";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEnvelope, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function ForgetPasswordForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
} = useForm<ForgetPasswordFormValues>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetPasswordSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<ForgetPasswordFormValues> = async (
    values
  ) => {
    const response = await forgetPasswordAction(values);

    if (response.success) {
      toast.success(response.message);
    } else {
      if (response.errors) {
        Object.keys(response.errors).forEach((key) => {
          setError(key as keyof ForgetPasswordFormValues, {
            message: response.errors?.[key],
          });
        });
      } else {
        toast.error(response.message);
      }
    }
  };

  return (
    <div className="form mt-5 space-y-6 rounded-xl shadow-xl p-12">
      <h2 className="text-2xl font-bold text-center text-primary-600">
        Forgot Password?
      </h2>

      <p className="text-center text-gray-600">
        Enter your email and we will send you a reset link
      </p>

      <form
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label htmlFor="email" className="py-2">
            Email Address
          </label>

          <div className="relative">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="form-control w-full pl-10 py-3 rounded-xl"
              {...register("email")}
            />
          </div>

          {errors.email && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.email.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn w-full flex items-center justify-center bg-primary-600 text-white gap-2 hover:bg-primary-700 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin />
              <span>Sending...</span>
            </>
          ) : (
            "Send Reset Link"
          )}
        </button>
        <p>
            <Link href="/login" className="text-primary-600 text-center flex items-center gap-2 justify-center">
                <FontAwesomeIcon icon={faArrowLeft} className="text-primary-600"/>
                Back to Signin 
        </Link>
        </p>
      </form>

      <p className="text-center pt-6 border-t border-gray-300/50">
        Remember your password?{" "}
        <Link href="/login" className="text-primary-600">
          Sign In
        </Link>
      </p>
    </div>
  );
}