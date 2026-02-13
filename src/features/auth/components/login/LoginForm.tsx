"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faEnvelope, faLock,  faStar, faUser } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginFormValues, loginSchema } from '../../schemas/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";
import loginActions from "../../server/login.actions";
import { setTokken } from "../../server/auth.actions";
import { setAuthInfo } from"@/app/store/auth.slice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Link from 'next/link'

export default function LoginForm() {
  const router = useRouter();
  const dispatch=useDispatch();
  const {
  register,
  handleSubmit,
  setError,
  formState: { errors },
} = useForm<LoginFormValues>({
    defaultValues:{
       email:"",
     password:"",
     rememberMe:false
    },
    resolver: zodResolver(loginSchema),
    mode:"onSubmit",
    reValidateMode:"onChange"

  });
  const onsubmit: SubmitHandler<LoginFormValues> = async (values) => {

  const response = await loginActions(values);

  if (response.success) {
    await setTokken(response.data.token,values.rememberMe);
    dispatch(setAuthInfo({
      isAuthenticated: true,
      userInfo:{...response.data.user} 
    }))
    toast.success(response.message);
    setTimeout(() => {
      router.replace("/");
    },3000)


  } else {

    if (response.errors) {
      Object.keys(response.errors).forEach((key) => {
        setError(key as keyof LoginFormValues, {
          type: "manual",
          message: response.errors![key],
        });
      });
    } else {
      toast.error(response.message);
    }

  }
};

  return <>
          <div className='form space-y-3 rounded-xl shadow-xl  p-12'>
          <h1 className='text-3xl font-bold text-center text-gray-800'><span className='text-primary-600'>Fresh</span>Cart</h1>
          <h2 className='text-center text-2xl font-bold text-gray-800 pt-2 '>Welcome Back!</h2>
          <p className='text-center text-gray-600 pb-5'>Sign in to continue your fresh shopping experience</p>
          <div className=' items-center gap-4 justify-center'>
            <button className='my-4 btn rounded-xl flex items-center justify-center w-full bg-white border-gray-300/50 hover:bg-primary-100/60 hover:border-primary-300 border-2 py-3'>
              <FontAwesomeIcon icon={faGoogle} className='text-red-500' />
              <span  className='text-gray-700 px-3'>Continue with Google</span>
            </button>
            <button className='btn mb-8 rounded-xl flex items-center justify-center w-full  bg-white border-gray-300/50  hover:bg-primary-100/60 hover:border-primary-300 border-2 py-3 '>
              <FontAwesomeIcon icon={faFacebook} className='text-blue-500 px-3' />
              <span className='text-gray-700'>Continue with Facebook</span>
            </button>
          </div>
          <div className='relative w-full h-0.5 bg-gray-300/30 my-5'>
            <span className='absolute text-gray-500 text-sm  bg-white px-4 left-1/2 top-1/2 -translate-1/2 '>OR CONTINUE WITH EMAIL</span>
          </div>
          <form action="" className='space-y-5' onSubmit={handleSubmit(onsubmit)}>

            <div className='email flex flex-col '>
              <label htmlFor="email" className='pl-2 py-3'>Email Address</label>
              <div className='relative '>
                 <FontAwesomeIcon icon={faEnvelope}  className='w-5 absolute left-2 top-1/2 -translate-1/2 text-gray-400 mx-3'/>
                <input className='form-control w-full pl-10 py-3 rounded-xl' type="email" id="email"
                  placeholder='Enter Your Email' 
                  {...register("email")}
                  />
              </div>
               {errors.email && (<p className='text-red-400 mt-1'>*{errors.email.message} </p>)}
            </div>

            <div className='password flex flex-col'>
             <div className='flex items-center justify-between py-3'>
               <label htmlFor="password" className='pl-2'>Password</label>
               <p className='text-sm'><Link href="/forgetpassword" className='text-primary-600'>Forgot Password?</Link> </p>
             </div>
            
              <div className='relative '>
                <FontAwesomeIcon icon={faLock} className='w-5 absolute left-2 top-1/2 -translate-1/2 text-gray-400 mx-3' />
                <input className='form-control w-full pl-10 py-3 rounded-xl' type="password" id="password"
                  placeholder='Enter your password'
                   {...register("password")}
                  />
              </div>
               {errors.password && (<p className='text-red-400 mt-1'>*{errors.password.message} </p>)}
            </div>
            <div className='rememberMe space-x-4 flex space-y-2 items-center'>
              <input type="checkbox" id="rememberMe"
                className=' accent-primary-600 size-4'  
                 {...register("rememberMe")}
                 />
              <label htmlFor="rememberMe">Keep me signed in</label>
            </div>

            <button type="submit" className='mb-8 btn w-full flex items-center justify-center bg-primary-600 cursor-pointer disabled:cursor-not-allowed text-white gap-2 hover:bg-primary-700'>
              Sign in
            </button>
          </form>
          <p className='text-center pt-8 border-t border-gray-300/50 '>New to FreshCart? <Link href="/signup" className='text-primary-600'>Create an account</Link></p>
         <div className='px-15 py-3 gap-2 text-sm text-gray-500 flex items-center justify-around  text-center'>
           <div className='flex items-center'>
              <FontAwesomeIcon icon={faClock} className=' size-2' />
              <span>SSL Secured</span>
            </div>
            <div className='flex items-center'>
              <FontAwesomeIcon icon={faUser}className=' size-2'  />
              <span>50K+ Users</span>
            </div>
            <div className='flex items-center'>
              <FontAwesomeIcon icon={faStar} className=' size-2 ' />
              <span>9.5 Rating</span>
            </div>
          </div>

        </div>
  </>
}