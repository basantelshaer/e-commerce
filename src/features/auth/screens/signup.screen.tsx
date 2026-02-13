import SignupForm from "@/features/auth/components/signup/SignupForm";
import SignupHero from "@/features/auth/components/signup/SignupHero";

export default function signupScreen() {
  return <>
 <div className="container grid lg:grid-cols-2 lg:gap-12"> 
    <SignupHero/>
   <SignupForm/>
 </div>
  </>
}