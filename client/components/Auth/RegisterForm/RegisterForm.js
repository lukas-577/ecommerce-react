import React, {useState} from "react";
import { Form,Button} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerApi } from "../../../api/user";
import { toast } from "react-toastify";

export default function RegistroForm(props){

    const {showLoginForm } = props;
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()), 
        onSubmit: async (formData)=> {
            setLoading(true);
            const response = await registerApi(formData);
            //console.log(response);
            if(response?.jwt){
                showLoginForm();
            }else{
                //console.log("Error al registrar el usuario, intentelo mas tarde");
                toast.error('Error al registrar el usuario, intentelo mas tarde', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
            setLoading(false);
        }
    });

    return(
        <Form className="login-form" onSubmit={formik.handleSubmit}>
            <Form.Input name="name" type="text" placeholder="Nombre" onChange={formik.handleChange} 
            error={formik.errors.name}></Form.Input>
            <Form.Input name="lastname" type="text" placeholder="Apellidos" onChange={formik.handleChange} 
            error= {formik.errors.lastname}></Form.Input>
            <Form.Input name="username" type="text" placeholder="Nombre de usuario" onChange={formik.handleChange}
            error={formik.errors.username}></Form.Input>
            <Form.Input name="email" type="text" placeholder="Correo electronico" onChange={formik.handleChange} 
            error={formik.errors.email}></Form.Input>
            <Form.Input name="password" type="password" placeholder="Contraseña" onChange={formik.handleChange}
            error={formik.errors.password}></Form.Input>
            <div className="actions">
                <Button type="button" basic onClick={showLoginForm}>
                    Iniciar sesión
                </Button>
                <Button type="submit" className="submit" loading= {loading} >
                    Registrar
                </Button>
            </div>

        </Form>
    )
}


function initialValues (){
    return {
        name:"",
        lastname:"",
        username:"",
        email:"",
        password:""
    }
}

function validationSchema(){
    return{
        name: Yup.string().required(true),
        lastname: Yup.string().required(true),
        username: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        password: Yup.string().required(true)

    }
}