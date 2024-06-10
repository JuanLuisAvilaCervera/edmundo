
import { enviarRuta } from "../../router.js";

export class Header {
    headerHTML = `
    <div class="row justify-content-between">
        <!-- LOGO -->
        <div class="col-4">
            <div class="row">
                <div class="col d-flex flex-row align-items-center">
                    <img src="http://www.edmundo.com/edmundo/assets/files/logos/edmundo.png" alt="Logo Edmundo" style="width: 100px; height: 100px;">
                    <h1>Edmundo</h1>
                </div>
            </div>
        </div>
        <!--  MENU -->
        <div class="col-5 ">
            <div class="row w-100 h-100 d-flex align-items-center justify-content-end">
                <div class="col-4 h-100 d-flex align-items-center"><button id="home" class="header-button"><h3>Home</h3></button></div>
                <div class="col-4 h-100 d-flex align-items-center"><button id="avisos" class="header-button"><h3>Eventos y Tareas</h3></button></div>
            </div>
        </div>
        <div class="col-3">
            <button id="logOff">Cerrar Sesion</button>
        </div>

    </div>`;

    constructor(){
        document.getElementById('header').innerHTML = this.headerHTML;
        document.getElementById('logOff').addEventListener('click', () =>{
            localStorage.clear();
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
                        localStorage.clear();
                        window.location.replace("http://www.edmundo.com/edmundo/index.html");
                    }
                }
            };
            //PAGINA ENVIO PHP
            xmlhttp.open('POST','http://www.edmundo.com/edmundo/assets/php/login/destroySession.php');
            xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
            xmlhttp.send();
        });

        $("#avisos").on("click", function(){
            enviarRuta("/avisos");
        });
        $("#home").on("click", function(){
            enviarRuta("/");
        });
    }
}