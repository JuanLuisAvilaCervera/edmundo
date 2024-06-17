import { enviarRuta } from "../../router.js";
import { Profile } from "./profile.js";


export class HeaderSecondary {
    headerHTML = `
    <div class="row justify-content-between h-100">
        <!-- LOGO -->
        <div class="col-5 h-100">
            <div class="row">
                <div class="col d-flex flex-row align-items-center">
                    <img src="http://www.edmundo.com/edmundo/assets/files/logos/edmundo.png" alt="Logo Edmundo" style="width: 100px; height: 100px;">
                    <h1>Edmundo</h1>
                </div>
            </div>
        </div>
        <div class="col-3 d-flex justify-content-center align-items-center h-100" id="perfilDiv">
            <!-- PERFIL -->
        </div>

    </div>`;

    constructor(){
        document.getElementById('header').innerHTML = this.headerHTML;
        
        let profile = new Profile();

    };
}