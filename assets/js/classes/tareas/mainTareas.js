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
        <div class="tarea-description rounded border">
            <div class="row">
                <div class="col-6 d-flex flex-row align-items-center">
                    <button id="volverAvisos" class="volverAvisos btn btn-secondary">Volver</button>
                    <h3 id="titulo"></h3>
                    <button id="buttonEditar" class="btn btn-secondary p-1 d-flex align-items-center"><ion-icon name="cog-outline"></ion-icon></button>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div id="texto"></div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 d-flex flex-row">
                    <span id="fecha"></span>
                    <span id="isTarea"></span>
                </div>
            </div>
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
</div>
<!-- Editar -->

<div class="modal fade" id="editarAviso" tabindex="-1" aria-labelledby="editarAvisoLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="editarAvisoLabel">Modificar evento</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-3"><label for="elegirAula">Elegir aula</label></div>
                    <div class="col-7">
                        <select id="elegirAula" class="form-select">
                            <!-- OPCIONES DE AULA -->
                            <option disabled selected value> -- select an option -- </option>

                        </select>
                    </div>
                </div>

            <div class="row">
                <div class="col-3"><label for="inputtitulo">Título:</label></div>
                <div class="col-7">
                    <input type="text" id="inputtitulo" class="form-control">
                </div>
            </div>

            <div>
                <label for="inputtexto">Descripción: </label>
                <textarea id="inputtexto" class="form-control"></textarea>
            </div>
            <div>
                <label for="tarea">Marcar como tarea (permitir entrega de archivos)</label>
                <input type="checkbox" id="tarea" class="form-check-input">
            </div>
            <div id="atrasada"style="display:none">
                <label for="tarea">¿Permitir entrega posterior a la fecha de la tarea?</label>
                <input type="checkbox" id="atrasadaCheck"  class="form-check-input"></div>
            <div>
            <div class="row">
                <div class="col-6"><label>Selecciona fecha del evento: </label></div>
                <div class="col-6">
                    <input type="text" id="inputdatepicker" class="form-control"/>
                </div>
            </div>
            <div class="row">
                <div class="col-6"><label for="inputhourpicker">Selecciona hora de finalización: </label></div>
                <div class="col-6">
                    <input type="text" id="inputhourpicker" class="form-control"/>
                </div>
            </div>
        </div>
        <div class="modal-footer">
        <div class="row">
            <div class="col-3">
                <button type="button" class="btn btn-danger" id="eliminarEvento">Eliminar evento</button>
            </div>
            <div class="col-9">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" id="modEvento">Aceptar</button>
            </div>
        </div>
            
        </div>
        </div>
    </div>
    </div>
    <!-- MODAL MODIFICAR -->
     <div class="modal fade" id="modificarModal" tabindex="-1" aria-labelledby="modificarModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="modificarModalLabel">
                            Algunos campos vacios quedarán vacios (como marcar como tarea o descripción) en lugar de tomar los datos anteriores
                            ¿Desea continuar con los cambios?
                        </h1>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-secondary" id="aceptarModificar">Aceptar Cambios</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- MODAL MODAL -->
     <div class="modal fade" id="borrarModal" tabindex="-1" aria-labelledby="borrarModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="borrarModalLabel">
                            ¿Desea eliminar el evento?
                        </h1>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-secondary" id="aceptarBorrar">Eliminar Evento</button>
                    </div>
                </div>
            </div>
        </div>
    
    
    
    `;

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