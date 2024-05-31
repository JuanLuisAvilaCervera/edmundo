import { enviarRuta } from "../../router.js";
import { Calendar } from "../home/calendar.js";
import { Aulas } from "../home/aulas.js";
import { callTareas } from "./callTareas.js";


export class Tareas{

    mainHTML = `<div class="row">
    <!-- CLASES -->
    <div id="aula-section" class="aula-section col-xl-3">

    </div>
    <!-- TAREAS -->
    <div class="tarea-section col-xl-6">
        <div class="tarea-description">
            <button id="volverAvisos" class="volverAvisos">Volver</button>
            <span id="titulo"></span>
            <div id="texto"></div>
            <span id="fecha"></span>

            <div class="aviso-selection-hr"> </div>

        </div>


        <div id="tarea-list" class="tarea-list">
            <!-- LISTA DE TAREAS-->
            <h3>ENTREGADAS</h3>
            <div id="lista-entregadas">
                
            </div>
            <h3>SIN ENTREGAR</h3>
            <div id="lista-sinentregar">
                
            </div>
        </div>
    </div>
    <!-- CALENDARIO -->
    <div class="calendar-section col-xl-3" id="calendar-section"></div>

    <!-- Modal -->
    <div class="modal fade" id="tareaModal" tabindex="-1" aria-labelledby="tareaModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="tareaModalLabel">
                        <!-- TITULO DEL AVISO -->
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="divFecha">Fecha de entrega: <span id="fechaEntrega"></span></div>
                    <div id="divDescarga">Descargar archivo: <span id="descargar"></span></div>
                    <div id="divBotonPuntuar"><input type="number" id="inputPuntuar" min="1"/><button id="botonPuntuar">Puntuar</button></div>
                    <div id="divPuntuacion">Puntuación: <span id="puntuacion"></span></div>
                    <div style="display:none" id="idUsuario"></div>
                </div>
                <div class="modal-footer">

                </div>
            </div>
        </div>
</div>`;

    constructor(){
        var tarea = localStorage.getItem('tarea');
        if(tarea != "" && tarea != undefined && tarea != null){
            document.getElementById('main').innerHTML = this.mainHTML;
            let aulas = new Aulas();
            let calendario = new Calendar();
            let tareas = new callTareas();
            
        }else{
            enviarRuta('/avisos');
        }
        
    }
}