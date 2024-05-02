import { Aulas } from "../home/aulas.js";
import { newAviso } from "./newAviso.js";

export class MainAvisos{
    mainHTML = `<!-- MAIN -->
        <div class="row">
            <!-- CLASES -->
            <div id="aula-section" class="aula-section col-xl-3">

            </div>
            <!-- AVISOS -->
            <div class="avisos-section col-xl-6">
               
            </div>
            <div class="anadir-aviso-section col-xl-3" id="anadir-aviso-section">
               
            </div>
        </div>`;
    
    constructor(){
        document.getElementById('main').innerHTML = this.mainHTML;
        let aulas = new Aulas();
        let newaviso = new newAviso();
    }
}