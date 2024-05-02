import { Aulas } from "../home/aulas.js";

export class MainAvisos{
    mainHTML = `<!-- MAIN -->
        <div class="row">
            <!-- CLASES -->
            <div id="aula-section" class="aula-section col-xl-3">

            </div>
            <!-- AVISOS -->
            <div class="post-section col-xl-9">
               
            </div>
        </div>`;
    
    constructor(){
        document.getElementById('main').innerHTML = this.mainHTML;
        let aulas = new Aulas();
    }
}