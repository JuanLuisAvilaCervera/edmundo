
import { enviarRuta } from "../../router.js";
import { Footer } from "../mainstructure/footer.js";

export class Register {
    correo = "";
    password = "";
    nombre = "";
    apellidos = "";

    registerHTML = `<div class="form-signin justify-content-center text-center login box">
        <div class="row">
            <div class="col-12">
                <h1> Edmundo </h1>
                <h3>Registro</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-6 text-start"><label for="nombre">Nombre</label></div>
            <div class="col-6 text-start"><label for="apellidos">Apellidos</label></div>
        </div>
        <div class="row">
            <div class="col-6"><input type="text" class="nombre form-control" id="nombre" /></div>
            <div class="col-6"><input type="text" class="apellidos form-control" id="apellidos" /></div>
        </div>

        <div class="row">
            <div class="col-12 text-start"><label for="correo">Correo</label></div>
        </div>
        <div class="row">
            <div class="col-12"><input type="text" class="correo form-control" id="correo" /></div>
        </div>

        <div class="row">
            <div class="col-12 text-start">
                <label for="contrasena">Contraseña</label>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <input type="password" class="contrasena form-control" id="contrasena" />
            </div>
        </div>

        <div class="row">
            <div class="col-12 text-start">
                <label for="repeatPassword">Repetir Contraseña</label>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <input type="password" class="repeatPassword form-control" id="repeatPassword" />
            </div>
        </div>
        <div class="row mb-0">
            <div class="col-12">
                <label>¿Ya tienes cuenta?</label><button id="enviarLogin" class="btn btn-secondary">Iniciar Sesión</button>
            </div>
        </div>
    </div>
    <div><button id="registrarse" class="register-button">Enviar</button></div>
    
    <div class="footer-secondary" id="footer"></div>
    `;

    constructor() {
        this.createRegister();
        let footer = new Footer();
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
        this.password = document.getElementById('contrasena').value || "";
        this.repPassword = document.getElementById('repeatPassword').value|| "";
        this.nombre = document.getElementById("nombre").value || "";
        this.apellidos = document.getElementById("apellidos").value || "";

        if (this.correo == "" || this.password == "" || this.nombre == "" || this.apellidos == "") {
            alert("Faltan datos");
            $("input").each(function(e){
                if($(this).val() == ""){
                    $(this).addClass("wrong");
                }else{
                    $(this).removeClass("wrong");
                }
            })
        } else {
            if(this.password != this.repPassword ){
                alert("Las contraseñas no coinciden");
            }else{
                this.BBDDcall();
                
            }
            
        }
    }

    //CREAR STRING DE DATOS
    crea_query_string() {
        var obj = {"email":this.correo,"password":this.password, "nombre":this.nombre, "apellidos":this.apellidos};
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
                    alert("Usuario con mismo correo ya registrado");
                }else{
                    
                    console.log(datos);
                    console.log("Completado");
                    localStorage.setItem('email', datos);
                    enviarRuta('/');
                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','../assets/php/login/register.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string();
        xmlhttp.send(cadena);
    }

    

}