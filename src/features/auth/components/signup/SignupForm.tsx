"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { signupFormValues,signupSchema } from "../../schemas/signup.schema";
import signupActions from "../../server/signup.actions";
import { toast } from "react-toastify";
export default function SignupForm() {
  const router=useRouter()
  const { register, handleSubmit ,setError, formState :{errors,isSubmitting} } = useForm<signupFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
    resolver: zodResolver(signupSchema),
    mode:"onSubmit",
    reValidateMode:"onChange"
  });

  const onSubmit: SubmitHandler<signupFormValues> = async (values) =>{
   try{
      const response=await signupActions(values)
      console.log(response)
      if(response?.success){
        toast.success(response.message)
        setTimeout(() => {
          router.push("/login")
        },2000)
      }
      else{
        if(response?.errors){
          Object.keys(response.errors).forEach((key) => {
            setError(key as keyof signupFormValues, {
              type: "manual",
              message: response.errors[key]!,
            });
          }); 
        }
      }
   }catch(error){
   }
  } 

  return (
    <>
      <div className="bg-white p-10 space-y-8 shadow-xl rounded-xl">
        <div className="text-center">
          <h2 className="text-3xl">create an account</h2>
          <p className="mt-1">start your fresh journey with us today</p>
        </div>

        <div
          className=" flex gap-2 *:flex *:items-center *:justify-center *:w-full *:gap-2
        *:hover:bg-gray-100"
        >
          <button
            type="button"
            className="btn bg-transparent border border-gray-400/40"
          >
            <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
            <span> google</span>
          </button>

          <button
            type="button"
            className="btn bg-transparent border border-gray-400/40"
          >
            <FontAwesomeIcon icon={faFacebookF} className="text-blue-500" />
            <span> facebook</span>
          </button>
        </div>

        <div className="relative w-full h-0.5 bg-gray-300/40">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm">
            or
          </span>
        </div>

        <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
          <div className="name flex flex-col gap-1">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              id="name"
              placeholder="Ali"
              className="form-control"
              {...register("name")}
            />
            {errors.name && <p className="text-red-500 mt-0.5">*{errors.name.message}</p>}
          </div>

          <div className="email flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="ali.route@gmail.com"
              className="form-control"
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 mt-0.5">*{errors.email.message}</p>}
          </div>
          <div className="phone flex flex-col gap-1">
            <label htmlFor="phone">phone*</label>
            <input
              type="tel"
              id="phone"
              placeholder="+02 123 456 789"
              className="form-control"
              {...register("phone")}
            />
            {errors.phone&& <p className="text-red-500 mt-0.5">*{errors.phone.message}</p>}
            
          </div>

         <div className="password flex flex-col gap-1">
         <label htmlFor="password">Password*</label>
         <input
          type="password"
          id="password"
          placeholder="create a strong password"
          className="form-control"
          {...register("password")}
           />

          {errors.password ? (
         <p className="text-red-500 mt-0.5">*{errors.password.message}</p>
         ) : (
        <p className="text-sm text-gray-500">
         must be at least 8 characters with numbers and symbols
       </p>
       )}

      <div className="password-strength flex items-center gap-2 mt-1">
      <div className="bar w-full h-1 bg-gray-200 rounded-xl overflow-hidden">
      <div className="progress w-1/4 h-full bg-red-500"></div>
    </div>
  </div>
</div>


          <div className="rePassword flex flex-col gap-1">
            <label htmlFor="repassword">confirm password*</label>
            <input
              type="password"
              id="repassword"
              placeholder="confirm your password"
              className="form-control"
              {...register("rePassword")}
            />
          {errors.rePassword && <p className="text-red-500 mt-0.5">*{errors.rePassword.message}</p>}
          </div>

          <div className="terms flex gap-2 items-center">
            <input
              type="checkbox"
              id="terms"
              className="accent-primary-600 size-4"
              {...register("terms")}
            />
            {errors.terms && <p className="text-red-500 mt-0.5">*{errors.terms.message}</p>}
            <label htmlFor="terms">
              i agree to the{" "}
              <Link href="/terms" className="text-primary-600 underline">
                terms of services
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-primary-600 underline"
              >
                privacy policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn bg-primary-600 text-white flex gap-2 items-center
          hover:bg-primary-700 w-full justify-center cursor-pointer disabled:cursor-not-allowed">
            {isSubmitting?<>
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            <span> Creating an Account</span>
            </>:<>
            <FontAwesomeIcon icon={faUserPlus} />
            <span> Create My Account</span>
            </>
            }
          </button>
        </form>

        <p className="text-center pt-8 border-t border-gray-300/50">
          already have an account?{" "}
          <Link href="/login" className="text-primary-600 underline">
            login
          </Link>
        </p>
      </div>
    </>
  );
}
