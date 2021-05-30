import React from 'react'
import { Route } from 'react-router-dom'
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import AuthHeader from "../components/OtherComponents/AuthHeader";
import ForgottenPasswordPage from "./ForgottenPasswordPage";
import SuccessVerified from "./SuccessVerified";


const AuthContainer = () => {
    return(
        <>
            <AuthHeader/>
            <Route exact path={"/"} render={()=><LoginPage/>}/>
            <Route exact path={"/registration"} render={()=><RegistrationPage/>}/>
            <Route exact path={"/forgotten"} render={()=><ForgottenPasswordPage/>}/>
            <Route exact path={"/verify/:id"} render={()=><SuccessVerified/>}/>
        </>
    )
};

export default AuthContainer