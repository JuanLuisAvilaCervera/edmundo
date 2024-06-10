
import { enviarRuta } from "../../router.js";
import { Footer } from "../../classes/mainstructure/footer.js";

export class Login {
    correo = "";
    password = "";

    // loginHTML = `<div class="row"><h1> LOGIN </h1></div>
    // <div class="row"><label for="correo">Correo</label>
    // <input id="correo" name="correo" type="email"></div>
    // <div class="row"><label for="contrasena">Contraseña</label>
    // <input id="password" name="password" type="password"></div>
    // <div class="row"><button id="enviarLogin">Enviar</button>
    // <button id="registrarse">Registrarse</button></div>`;
    loginHTML = `<div class="form-signin justify-content-center text-center login box"> 
        <div class="row">
            <div class="col-12">
                <h1> Edmundo </h1>
                <h3>Inicio de Sesión</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-start">
                <label for="correo">Correo</label>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <input id="correo" class="correo form-control" type="email" >
            </div>
        </div>
        
        <div class="row">
            <div class="col-12 text-start">
                <label for="password">Contraseña</label>
            </div>
        </div>
        <div class="row mb-4">
            <div class="col-12">
                <input id="password" class="password form-control" type="password">
            </div>
        </div>
        <div class="row">
            <div class="col-5 pe-0">
                <button id="registrarse" class="w-100 rounded-start">Registrarse</button>
            </div>
            <div class="col-7 ps-0">
                <button id="enviarLogin" class="w-100 rounded-end">Iniciar Sesión</button>
            </div>
            
        </div>
    </div>`;

    constructor() {
        //COMPROBAR QUE NO ESTÁ REGISTRADO
        this.createLogin();
        let footer = new Footer();
    }

   

    createLogin() {
        //AÑADIR ELEMENTO AL COMIENZO DEL DIV
        let sp1 = document.createElement("div");
        sp1.classList.add("justify-content-center");
        sp1.innerHTML = this.loginHTML;
        document.getElementById('body').insertBefore(sp1, document.getElementById('body').firstChild);

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
            alert("Faltan datos");
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
                    alert("La contraseña es erronea o no hay una cuenta vinculada al correo indicado");
                }else{
                    console.log(datos);
                    localStorage.setItem('email', datos["email"]);
                    localStorage.setItem('idUsuario', datos["idUsuario"]);
                    localStorage.setItem('rol', datos["rol"]);
                    localStorage.setItem('lastCodAula', datos["lastCodAula"]);
                    localStorage.setItem('solicitud', datos['solicitud']);
                    localStorage.setItem('verified', datos["verificado"]);
                    console.log("Completado");
                    enviarRuta('/');
                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','../assets/php/login/login.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string();
        xmlhttp.send(cadena);
    }

}