import { useState } from "react";
import LoginForm from "./LoginForm";
import RegistroForm from "./RegisterForm/RegisterForm";

export default function Auth(props){
    const {onCloseModal,setTitleModal} = props;
    const[showLogin,setShowLogin] = useState(true);

    const showLoginForm = ()=> {
        setTitleModal("iniciar sesión");
        setShowLogin(true);
    };
    const showRegisterForm = ()=> {
        setTitleModal("Crear nuevo usuario");
        setShowLogin (false);
    };
    
    return showLogin? <LoginForm showRegisterForm={showRegisterForm}></LoginForm>: <RegistroForm showLoginForm ={showLoginForm }></RegistroForm>
}