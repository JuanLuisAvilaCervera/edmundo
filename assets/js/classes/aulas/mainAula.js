import { enviarRuta } from "../../router.js";
import { enviarClase } from "../../archivos.js";

export class mainAula{

    mainHTML = `<div class="comp-register box text-center" id="comp-register">
        <div id="principal">
            <div class="row">
            <div class="col"><button id="volverHome" class="btn btn-secondary">Volver</button></div>
                <div class="col text-end p-1"><h3>[NOMBRE]</h3></div>
                <div class="col p-1">
                    <button id="buttonEditar" class="btn btn-secondary p-1">
                        <ion-icon name="cog-outline"></ion-icon>
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <div class="container-perfil" style="height: 100px; width:100px; border: solid 1px black">
                        <img class="image" id="chooseImg"  src="http://www.edmundo.com/edmundo/assets/files/aulas/[PERFIL]">
                        <div class="overlay  p-0 m-0">
                            <div class="text"><a class="d-flex align-items-center" style="color:black;text-decoration:none" href="http://www.edmundo.com/edmundo/assets/files/aulas/[PERFIL]" download><ion-icon name="arrow-down-outline" style="height:75px;width:75px"></ion-icon></a></div>
                        </div>
                    </div>
                </div>
                <div class="col-8">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <!--<label for="nombreAula">Nombre:</label>
                                <span id="nombreAula">[NOMBRE]</span>-->
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
            <hr>
            <div class="row">
                <h5>Participantes</h5>
                <div id="creadorClase">
                    <h5>Docente</h5>
                    [DOCENTE]
                </div>
                <hr>
                <div id="estudiantesList">
                    <!-- LISTA DE USUARIOS -->
                    [LISTA-USUARIOS]
                </div>
            </div>
        </div>
        <!-- EDITAR-->
        <div id="editar" style="display:none">
            <h3>Modificar Aula</h3>
            <div class="row">
                <div class="col-4 ">
                    <div class="container-perfil" style="height: 100px; width:100px; border: solid 1px black">
                        <img class="image" id="chooseImg"  src="http://www.edmundo.com/edmundo/assets/files/aulas/[PERFIL]">
                        <div class="overlay  p-0 m-0">
                            <div class="text">
                            <form enctype="multipart/form-data" method="post" id="formClase">
                                <input class="form-control" type="file" name="fileToUpload" id="fileToUpload" accept="image/*">
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-8">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <label for="inputNom">Nombre:</label>
                                <input type="text" id="inputNom" placeholder="[NOMBRE]"/>
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <button id="abrirBorrar" class="btn btn-danger">Borrar Clase</button>
                </div>
                <div class="col-6 d-flex flex-row">
                    <button id="abrirModificar" class="btn btn-primary">Modificar</button>
                    
                    <button id="cancelarEditar" class="btn btn-secondary">Cancelar</button>
                </div>
            </div>
        </div>
     </div>
     
     <!-- MODAL MODIFICAR -->
     <div class="modal fade" id="modificarModal" tabindex="-1" aria-labelledby="modificarModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="modificarModalLabel">
                            ¿Desea continuar con los cambios (los campos vacios no cambiarán)?
                        </h1>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-secondary" id="aceptarModificar">Aceptar Cambios</button>
                    </div>
                </div>
            </div>
        </div>
     
     
     `;

    constructor(){
        document.getElementById("main").innerHTML = this.mainHTML;
        this.BBDDcallUser();
    }

    crea_query_string_calluser() {
        var obj = {
            "codAula": localStorage.getItem("lastCodAula"),
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
                        console.log("error");
                    }else{
                        let perfil = datos['imagenAula'] || "edmundo.png";
                        let nombre = datos['nombre'];
                        
                        thisClass.mainHTML = thisClass.mainHTML.replaceAll("[PERFIL]", perfil )
                                                                        .replaceAll("[NOMBRE]", nombre);

                        thisClass.BBDDcallAulaUser();

                        
                        
                    }
                }
            };
            //PAGINA ENVIO PHP
            xmlhttp.open('POST','http://www.edmundo.com/edmundo/assets/php/aulas/callAula.php');
            xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
            let cadena = this.crea_query_string_calluser();
            xmlhttp.send(cadena);
    }

    crea_query_string_sendmodificar(nombre){
        var obj = {
            "codAula": localStorage.getItem("lastCodAula"),
            "nombre": nombre,
        }
        var cadena = JSON.stringify(obj);
        return cadena;
    }

    BBDDcallModificar(nombre){
        var thisClass =this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    console.log("error");
                }else{
                    enviarRuta("/aulas");
                }
            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','http://www.edmundo.com/edmundo/assets/php/aulas/sendModificar.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string_sendmodificar(nombre);
        xmlhttp.send(cadena);
    }

    crea_query_string_callaulauser(){
        var obj = {
            "codAula": localStorage.getItem("lastCodAula")
        }
        var cadena = JSON.stringify(obj);
        return cadena;
    }

    BBDDcallAulaUser(){

        var thisClass =this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    console.log("error");
                }else{
                    var found = false;
                    var userListHTML = ``;
                    var userHTML = 
                    `<div>
                        <span id="nombre">[NOMBRE]</span>
                    </div>`;
                    datos.forEach(usuario => {
                        if(!found && usuario['idCreator'] == usuario['idUsuario']){
                            found = true;
                            thisClass.mainHTML = thisClass.mainHTML.replace('[DOCENTE]', userHTML.replace('[NOMBRE]'
                                , usuario['name'] + " " + usuario['surname']));
                        }else{
                            userListHTML += userHTML.replace('[NOMBRE]', usuario['name'] + " " + usuario['surname']);
                        }
                    });

                    thisClass.mainHTML = thisClass.mainHTML.replace('[LISTA-USUARIOS]', userListHTML);
                    document.getElementById('main').innerHTML = thisClass.mainHTML;

                    if(localStorage.getItem("creator") == localStorage.getItem("idUsuario")){
                        $("#buttonEditar").show();
                    }else{
                        $("#buttonEditar").hide();
                    }
                    $("#buttonEditar").on('click' , () =>{
                        $('#editar').show();
                        $('#principal').hide();
                    })
                    $("#cancelarEditar").on('click' , () =>{
                        $('#editar').hide();
                        $('#principal').show();
                    })

                    $("#abrirModificar").on('click', () =>{
                        $('#modificarModal').modal("show");
                    })
                    $("#aceptarModificar").on('click', () =>{
                        var nombre = $("#inputNom").val() || $("#inputNom").attr("placeholder");
                        var apellidos = $("#inputApe").val() || $("#inputApe").attr("placeholder");
                        thisClass.BBDDcallModificar(nombre , apellidos);
                    });

                    $("#volverHome").on("click", ()=>{
                        enviarRuta("/");
                    })

                    document.getElementById("fileToUpload").onchange = function(e) {
                        e.preventDefault();
                        if($("#fileToUpload").val() == "" || $("#fileToUpload").val() == undefined || $("#fileToUpload").val() == null){
                            alert("No se ha añadido ningún archivo");
                        }else{
                            enviarClase();
                        }
                    };
                }
            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','http://www.edmundo.com/edmundo/assets/php/aulas/callaulauser.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string_callaulauser();
        xmlhttp.send(cadena);

    }

}