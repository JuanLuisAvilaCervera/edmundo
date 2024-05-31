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
                        <label for="verAntiguos">Mostrar sólo tareas:</label><input type="checkbox" id="verTareas"/>
                        <div id="nuevoAvisoDiv">

                        </div>
                    </div>
                    <div class="aviso-selection-hr"></div>
                </div>
                
                <div id="aviso-list" class="aviso-list">
                    <!-- LISTA DE AVISOS-->
                </div>
            </div>
                <!-- CALENDARIO -->
            <div class="calendar-section col-xl-3" id="calendar-section"></div>
        </div>
        
        <!-- Modal -->
        <div class="modal fade" id="avisoModal" tabindex="-1" aria-labelledby="avisoModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="avisoModalLabel">
                            <!-- TITULO DEL AVISO -->
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div id="texto">
                            <!-- CONTENIDO DEL AVISO -->
                        </div>
                        <div id="fecha">
                            <!-- FECHA DEL EVENTO / ENTREGA DE LA TAREA -->
                        </div>
                        <div id="botonEntrega">
                            <!-- BOTON DE ENTREGA (SOLO MOSTRAR SI ES TAREA) -->
                            <form enctype="multipart/form-data" method="post" id="formTarea">
                                <input class="form-control" type="file" name="fileToUpload" id="fileToUpload" accept="image/*,.pdf,.rar,.zip">
                                <button id="entregar">Entregar</button>
                            </form>
                        </div>
                        <div id="noEntrega">
                            <!-- RELLENAR SI EL EVENTO HA PASADO -->
                        </div>
                    </div>
                    <div class="modal-footer">

                    </div>
                </div>
            </div>
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