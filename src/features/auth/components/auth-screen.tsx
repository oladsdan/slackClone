import { useState } from "react"
import { SignInflow } from "../types"
import SignInCard from "./signInCard"
import SignUpCard from "./signUpCard"
import { useConvexAuth } from "convex/react"
import { Navigate } from "react-router-dom"


const AuthScreen = () => {
    const [auth, setAuth] = useState<SignInflow>("signIn");
    const {isAuthenticated} = useConvexAuth();
    console.log("this is authenticated");
    console.log(isAuthenticated);

    if(isAuthenticated){
        return <Navigate to="/"/>
    }

  return (
    <div className="h-[100vh] flex items-center justify-center bg-[#5C3B58]">
      <div className="md:h-auto md:w-[420px]">
        {auth === "signIn" ? <SignInCard setAuth={setAuth} /> : <SignUpCard setAuth={setAuth} />}
      </div>
    </div>
  )
}

export default AuthScreen