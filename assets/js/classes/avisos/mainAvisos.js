import { Aulas } from "../home/aulas.js";
import { newAviso } from "./newAviso.js";
import { callAvisos } from "./callAvisos.js";
import { Calendar } from "../home/calendar.js";

export class MainAvisos{
    mainHTML = `<!-- MAIN -->
        <div class="row">
            <!-- CLASES -->
            <div id="aula-section" class="aula-section col-xl-3">

            </div>
            <!-- AVISOS -->
            <div class="avisos-section col-xl-6">
                <div class="aviso-selection">
                    <div class="aviso-selection-options">
                        <select id="aulaSelect">
                            <option id="allAulas">Todas las aulas</option>
                        </select>
                        <label for="verAntiguos">Mostrar antiguos:</label><input type="checkbox" id="verAntiguos"/>
                        <div id="nuevoAvisoDiv">

                        </div>
                    </div>
                    <div class="aviso-selection-hr"></div>
                </div>
                
                <div id="aviso-list" class="aviso-list">
                    <!-- LISTA DE AVISOS-->
                </div>
            </div>

            <div class="calendar-section col-xl-3" id="calendar-section"></div>
        </div>`;
    
    constructor(){
        document.getElementById('main').innerHTML = this.mainHTML;
        let aulas = new Aulas();
        let avisos = new callAvisos();
        if(localStorage.getItem("rol") == "1"){
            let newaviso = new newAviso();
        }
        let calendario = new Calendar();
    }
}