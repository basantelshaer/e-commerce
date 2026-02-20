import ForgetPasswordForm from "../components/forgetPassword/ForgetPasswordForm";
import ForgetpasswordHero from "../components/forgetPassword/ForgetpasswordHero";

export default function ForgetPasswordScreen() {
  return (
    <main className="py-12">
      <div className="container grid lg:grid-cols-2 lg:gap-12">
          <ForgetpasswordHero/>
          <ForgetPasswordForm />
        
      </div>
    </main>
  );
}