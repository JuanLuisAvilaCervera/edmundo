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
            <div class="avisos-section col-xl-5">

                <h1>Eventos</h1>
                <div class="aviso-selection">
                    <div class="aviso-selection-options row">
                        <div class="col-5"><select id="aulaSelect" class="form-select">
                            <option id="allAulas">Todas las aulas</option>
                        </select></div>
                        <div class="col-4 d-flex align-items-center rounded border"><input type="checkbox" id="verAntiguos" class="form-check-input me-2"/> <label for="verAntiguos">Eventos Pasados</label></div>
                        <div class="col-3 d-flex align-items-center rounded border"><input type="checkbox" id="verTareas" class="form-check-input me-2"/> <label for="verTareas">Sólo tareas</label></div>
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
            <div class="calendar-section col-xl-4" id="calendar-section"></div>
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
                                <button id="entregar" class="btn btn-primary">Entregar</button>
                            </form>
                        </div>
                        <div id="noEntrega">
                            <!-- RELLENAR SI EL EVENTO HA PASADO -->
                        </div>
                        <div id="puntuacion">
                            <!-- PUNTUACION -->
                        </div>
                        <div id="descargarTarea">
                            <!-- PODER VER TAREA ENTREGADA E INCLUSO BORRARLA -->
                        </div>
                        <div id="idTareaEntregada" style="display:none">
                            <!-- PODER VER TAREA ENTREGADA E INCLUSO BORRARLA -->
                        </div>
                        
                    </div>
                    <div class="modal-footer">

                    </div>
                </div>
            </div>
        </div>
        <!--ModalBorrar-->
        <div class="modal fade" id="borrarModal" tabindex="-1" aria-labelledby="borrarModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="borrarModalLabel">
                            ¿Desea eliminar la tarea entregada? (Puede que no puedas entregarla después de borrarla)
                        </h1>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-secondary" id="aceptarBorrado">Sí, deseo eliminar</button>
                    </div>
                </div>
            </div>
        </div>
        `;
    
    constructor(){
        document.getElementById('main').innerHTML = this.mainHTML;
        let aulas = new Aulas();
        let avisos = new callAvisos();
        let calendario = new Calendar();
        if(localStorage.getItem('idUsuario') == localStorage.getItem('creator')){
            let aviso = new newAviso();
        }
    }

    

}