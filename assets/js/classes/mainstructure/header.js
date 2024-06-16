
import { enviarRuta } from "../../router.js";
import { Profile } from "./profile.js";

export class Header {
    headerHTML = `
    <div class="row justify-content-between h-100">
        <!-- LOGO -->
        <div class="col-3 h-100">
            <div class="row">
                <div class="col d-flex flex-row align-items-center">
                    <img src="http://www.edmundo.com/edmundo/assets/files/logos/edmundo.png" alt="Logo Edmundo" style="width: 100px; height: 100px;">
                    <h1>Edmundo</h1>
                </div>
            </div>
        </div>
        <!--  MENU -->
        <div class="col-6 h-100">
            <div class="row w-100 h-100 d-flex align-items-center justify-content-end">
                <div class="col-4 h-100 d-flex align-items-center"><button id="home" class="header-button"><h3>Home</h3></button></div>
                <div class="col-4 h-100 d-flex align-items-center"><button id="avisos" class="header-button"><h3>Eventos y Tareas</h3></button></div>
            </div>
        </div>
        <div class="col-3 d-flex justify-content-center align-items-center h-100" id="perfilDiv">
            <!-- PERFIL -->
        </div>

    </div>`;

    constructor(){
        document.getElementById('header').innerHTML = this.headerHTML;
        
        let profile = new Profile();

        $("#avisos").on("click", function(){
            enviarRuta("/avisos");
        });
        $("#home").on("click", function(){
            enviarRuta("/");
        });
    }
}