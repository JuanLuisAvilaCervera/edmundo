
import { enviarRuta } from "../../router.js";

export class Login {
    correo = "";
    password = "";

    loginHTML = `<h1> LOGIN </h1>
    <label for="correo">Correo</label>
    <input id="correo" name="correo" type="email">
    <label for="contrasena">Contraseña</label>
    <input id="password" name="password" type="password">
    <button id="enviarLogin">Enviar</button>
    <button id="registrarse">Registrarse</button>`;

    constructor() {
        this.createLogin();
    }

    createLogin() {

        document.getElementById('body').innerHTML = this.loginHTML;

        document.getElementById('registrarse').addEventListener('click', () => {
            enviarRuta('/register');
        });
        document.getElementById('enviarLogin').addEventListener('click', () => {
            this.enviarLogin();
        });
    }

    crea_query_string() {
        var obj = {"email":this.correo,"password":this.password};
        var cadena = JSON.stringify(obj);
        return cadena;
    }

    //EVENTO BOTÓN LOG IN
    enviarLogin() {
        this.correo = document.getElementById('correo').value || "";
        this.password = document.getElementById('password').value || "";

        if (this.correo == "" || this.password == "") {
            this.error(1); // ERROR: FALTAN DATOS
        } else {
            this.BBDDcall();
        }
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
                    //ENVIAR DATOS POR PANTALLA
                    // for(var atributo in datos){
                    //     let texto = atributo +"->" +datos[atributo]+"<br>";
                    //     
                    //     document.getElementById('datos').innerHTML +=texto;
                    // }
                    console.log(datos);
                    localStorage.setItem('email', datos["email"]);
                    localStorage.setItem('rol', datos["rol"]);
                    localStorage.setItem('lastCodAula', datos["lastCodAula"])
                    console.log("Completado");
                    enviarRuta('/');
                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','assets/php/Login/login.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string();
        xmlhttp.send(cadena);
    }

    //CLASE ERROR (MENSAJES EN ROJO POR PANTALLA ALERT)
    error(code) {
        console.log("error: " + code);
        // switch (code) {
        //     case 1:

        //         // ERROR: FALTAN DATOS
        //         break;
        //     case 2:
        //         // ERROR: DATOS ERRONEOS
        //         break;
        // }
    }

}