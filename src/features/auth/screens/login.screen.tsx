import LoginHero from "../components/login/LoginHero";
import LoginForm from "../components/login/LoginForm";
export default function LoginScreen (){
    return<>
        <div className="container grid lg:grid-cols-2 lg:gap-12"> 
        <LoginHero/>
        <LoginForm/>
         </div>
    </>
}