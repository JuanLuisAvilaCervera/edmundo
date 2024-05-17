
import { enviarRuta } from "../../router.js";

export class Header {
    headerHTML = `
    <div class="row">
        <!-- LOGO -->
        <div class="col-3">
            <img src="" alt="" style="width: 100px; height: 100px;">
        </div>
        <!--  MENU -->
        <div class="col-6 d-flex flex-row align-items-center">
            <div class="row">
                <div class="col-2"><button id="home">Home</button></div>
                <div class="col-2"><button id="avisos">Avisos y Tareas</button></div>
                <div class="col-2">SAMPLE SECTION</div>
                <div class="col-2">SAMPLE SECTION</div>
                <div class="col-2">SAMPLE SECTION</div>
                <div class="col-2">SAMPLE SECTION</div>
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
    })

        $("#avisos").on("click", function(){
            enviarRuta("/avisos");
        });
        $("#home").on("click", function(){
            enviarRuta("/");
        })
    }
}