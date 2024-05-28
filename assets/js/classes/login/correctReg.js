import { enviarRuta } from "../../router.js";

export class CorrectReg {

    correctHTML = `<h1> Registro Completado </h1>
    <p>Se ha registrado correctamente, se ha enviado un correo de verificación a su cuenta de correo electrónico</p>`;

    constructor() {
        this.createCorrectReg();
    }

    createCorrectReg() {

        document.getElementById('body').innerHTML = this.correctHTML;

        
        this.BBDDcall();


    }

    crea_query_string(){
        var obj = {"email":localStorage.getItem('email')};
        var cadena = JSON.stringify(obj);
        return cadena;
    }

    BBDDcall(){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                console.log(this.responseText);
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    //document.getElementById('datos').innerHTML = "La contraseña o el usuario introducidos son incorrectos";
                    console.log("Fallo");
                }else{
                    
                    console.log(datos);
                    console.log("Completado");
                    localStorage.removeItem("email");
                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','../assets/php/correo/verRegistro.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string();
        xmlhttp.send(cadena);
    }


}