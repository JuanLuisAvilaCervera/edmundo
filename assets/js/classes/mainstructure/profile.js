import { enviarRuta } from "../../router.js";

export class Profile{

    profileHTML = `<div class="dropdown">
                    <button class="btn btn-outline-light p-0 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <div class="row ">
                            <div class="col">
                                <img style="height: 90px; width: 90px;" src="http://www.edmundo.com/edmundo/assets/files/perfiles/[PERFIL]">
                            </div>
                            <div class="col">
                                <h5>[NOMBRE-APELLIDOS]</h5>
                                <p>[ROL]</p>
                            </div>

                        </div>
                    </button>
                    <ul class="dropdown-menu w-100">
                      <li><button id="verPerfil" class="dropdown-item w-100">Ver Perfil</button></li>
                      <li><button id="solicitarDocente" class="dropdown-item">Solicitar ser Docente</button></li>
                      <li><button id="cancelarDocente" class="dropdown-item">Cancelar solicitud de Docente</button></li>
                      <li><button id="logOff" class="dropdown-item">Cerrar Sesión</button></li>
                    </ul>
                  </div>
                  <!--ModalBorrar-->
        <div class="modal fade" id="logoffModal" tabindex="-1" aria-labelledby="logoffModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="logoffModalLabel">
                            ¿Desea cerrar su sesión en la página?
                        </h1>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-secondary" id="aceptarLogoff">Cerrar la sesión</button>
                    </div>
                </div>
            </div>
        </div>`;


    constructor(){

        this.BBDDcallUser();

        
    }

    crea_query_string($solicitud) {
        var obj = {
            "email": localStorage.getItem("email"),
            "solicitud": $solicitud
        }
        var cadena = JSON.stringify(obj);
        return cadena;
    }

    BBDDcallUser(){
        var thisClass =this;
        var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange=function() {
                if(this.readyState==4 && this.status==200) {
                    var datos = JSON.parse(this.responseText);
                    if (datos == "") {
                        // localStorage.clear();
                        // enviarRuta("/");
                        console.log("error");
                    }else{
                        let perfil = datos['imagenPerfil'] || (datos['rol'] == 1 ? "eddocente.png": (datos['rol'] == 3 ? "edmundo.png" : "edestudiante.png"));
                        let nombre = datos['name'] + " " + datos['surname'];
                        let rolName = "";
                        let rolDatos = datos['rol'];
                        switch(rolDatos){
                            case 1:
                                rolName = "Docente";
                                break;
                            case 2:
                                rolName = "Estudiante";
                                break;
                            case 3:
                                rolName = "Admin";
                                break;
                            default:
                                rolName = "";
                                break;
                        }
                        thisClass.profileHTML = thisClass.profileHTML.replace("[PERFIL]", perfil )
                                                                        .replace("[NOMBRE-APELLIDOS]", nombre)
                                                                        .replace("[ROL]", rolName);

                        document.getElementById('perfilDiv').innerHTML = thisClass.profileHTML;
                        if(rolDatos == 2){
                            $("#cancelarDocente").parent().hide();
                            $("#solicitarDocente").parent().show();
                        }else if(rolDatos == 1 && datos['solicitud'] != 2){
                            $("#cancelarDocente").parent().show();
                            $("#solicitarDocente").parent().hide();
                        }else{
                            $("#cancelarDocente").parent().hide();
                            $("#solicitarDocente").parent().hide();
                        }


                        document.getElementById('logOff').addEventListener('click', () =>{
                            $("#logoffModal").modal("show");
                        });
                        document.getElementById('aceptarLogoff').addEventListener('click', () =>{
                            thisClass.BBDDcallLogOff();
                        });

                        $("#cancelarDocente").on("click", () =>{
                            thisClass.BBDDcallCancelar();
                        });
                        $("#solicitarDocente").on("click", () =>{
                            thisClass.BBDDcallSolicitar();
                        });
                        $("#verPerfil").on("click", () =>{
                            enviarRuta('/profile');
                        });

                    }
                }
            };
            //PAGINA ENVIO PHP
            xmlhttp.open('POST','http://www.edmundo.com/edmundo/assets/php/profile/callUser.php');
            xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
            let cadena = this.crea_query_string(0);
            xmlhttp.send(cadena);
    }

    BBDDcallLogOff(){
        localStorage.clear();
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange=function() {
                if(this.readyState==4 && this.status==200) {
                    localStorage.clear();
                    window.location.replace("http://www.edmundo.com/edmundo/index.html");
                }
            };
            //PAGINA ENVIO PHP
            xmlhttp.open('POST','http://www.edmundo.com/edmundo/assets/php/login/destroySession.php');
            xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
            xmlhttp.send();
    }

    BBDDcallSolicitar(){
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange=function() {
                if(this.readyState==4 && this.status==200) {
                    localStorage.setItem('rol', "1");
                    localStorage.setItem('solicitud', "1");
                    enviarRuta('/');
                }
            };
            //PAGINA ENVIO PHP
            xmlhttp.open('POST','http://www.edmundo.com/edmundo/assets/php/profile/changeSolicitud.php');
            xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
            let cadena = this.crea_query_string(1);
            xmlhttp.send(cadena);
    }

    BBDDcallCancelar(){
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange=function() {
                if(this.readyState==4 && this.status==200) {
                    localStorage.setItem('rol', "2");
                    localStorage.setItem('solicitud', "0");
                    enviarRuta('/');
                }
            };
            //PAGINA ENVIO PHP
            xmlhttp.open('POST','http://www.edmundo.com/edmundo/assets/php/profile/changeSolicitud.php');
            xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
            let cadena = this.crea_query_string(2);
            xmlhttp.send(cadena);
    }
}