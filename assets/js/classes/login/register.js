
import { enviarRuta } from "../../router.js";

export class Register {
    correo = "";
    password = "";

    registerHTML = `<h1> Register </h1>
    <label for="correo">Correo</label>
    <input id="correo" name="correo" type="email">
    <label for="contrasena">Contraseña</label>
    <input id="password" name="password" type="password">
    <label for="contrasena">Repetir Contraseña</label>
    <input id="repeatPassword" name="repeatPassword" type="password">
    <p>¿Ya tienes cuenta?<button id="enviarLogin">Log In</button></p>
    <button id="registrarse">Enviar</button>`;

    constructor() {
        this.createRegister();
    }

    createRegister() {

        document.getElementById('body').innerHTML = this.registerHTML;

        document.getElementById('registrarse').addEventListener('click', () => {
            this.enviarRegistro();
        });
        document.getElementById('enviarLogin').addEventListener('click', () => {
            enviarRuta('/');
        });
    }

    //EVENTO BOTÓN REGISTER
    enviarRegistro() {
        this.correo = document.getElementById('correo').value || "";
        this.password = document.getElementById('password').value || "";
        this.repPassword = document.getElementById('repeatPassword').value|| "";

        if (this.correo == "" || this.password == "") {
            this.error(1); // ERROR (1): FALTAN DATOS
        } else {
            if(this.password != this.repPassword ){
                this.error(2); // ERROR (2): LAS CONTRASEÑAS NO COINCIDEN
            }else{
                this.BBDDcall();
                //-------COMPROBAR REGISTRO CORRECTO ANTES
                enviarRuta('/correct_reg');
            }
            
        }
    }

    //------CLASE ERROR (MENSAJES EN ROJO POR PANTALLA ALERT)
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
    //CREAR STRING DE DATOS
    crea_query_string() {
        var obj = {"email":this.correo,"password":this.password};
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
                    //ENVIAR DATOS POR PANTALLA
                    // for(var atributo in datos){
                    //     let texto = atributo +"->" +datos[atributo]+"<br>";
                    //     
                    //     document.getElementById('datos').innerHTML +=texto;
                    // }
                    console.log(datos);
                    console.log("Completado");
                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','assets/php/register.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string();
        xmlhttp.send(cadena);
    }

}