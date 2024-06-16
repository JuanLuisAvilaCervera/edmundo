import { enviarRuta } from "../../router.js";
import { enviarPerfil } from "../../archivos.js";

export class mainProfile{

    mainHTML = `<div class="comp-register box text-center" id="comp-register">
        <div id="principal">
            <div class="row">
            <div class="col"><button id="volverHome" class="btn btn-secondary">Volver</button></div>
            <div class="col text-end p-1"><h3>Perfil</h3></div>
            <div class="col p-1"><button id="buttonEditar" class="btn btn-secondary p-1 d-flex align-items-center"><ion-icon name="cog-outline"></ion-icon></button></h3>
</div>
            </div>
            <div class="row">
                <div class="col-4">
                    <div class="container-perfil" style="height: 100px; width:100px; border: solid 1px black">
                        <img class="image" id="chooseImg"  src="http://www.edmundo.com/edmundo/assets/files/perfiles/[PERFIL]">
                        <div class="overlay  p-0 m-0">
                            <div class="text"><a class="d-flex align-items-center" style="color:black;text-decoration:none" href="http://www.edmundo.com/edmundo/assets/files/perfiles/[PERFIL]" download><ion-icon name="arrow-down-outline" style="height:75px;width:75px"></ion-icon></a></div>
                        </div>
                    </div>
                </div>
                <div class="col-8">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <label for="nombreUsuario">Nombre:</label>
                                <span id="nombreUsuario">[NOMBRE]</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <label for="apellidosUsuario">Apellidos:</label>
                                <span id="apellidosUsuario">[APELLIDOS]</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <label for="rolUsuario">Rol:</label>
                                <span id="rolUsuario">[ROL]</span>
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
            
            <div class="row" id="aulasCreadas" style="display:none;"><hr>
                <h5>Aulas en las que creaste</h5>
                <div id="aulasCreadasList">
                    <!-- LISTA DE AULAS -->
                </div>
            </div>
            <div class="row" id="aulasParticipa">
                <h5>Aulas en las que participas</h5>
                <div id="aulaList">
                    <!-- LISTA DE AULAS -->
                    [LISTA-AULAS]
                </div>
            </div>
        </div>
        <!-- EDITAR-->
        <div id="editar" style="display:none">
            <h3>Modificar Perfil</h3>
            <div class="row">
                <div class="col-4 ">
                    <div class="container-perfil" style="height: 100px; width:100px; border: solid 1px black">
                        <img class="image" id="chooseImg"  src="http://www.edmundo.com/edmundo/assets/files/perfiles/[PERFIL]">
                        <div class="overlay  p-0 m-0">
                            <div class="text">
                            <form enctype="multipart/form-data" method="post" id="formPerfil">
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
                        <div class="row">
                            <div class="col-12">
                                <label for="inputApe">Apellidos:</label>
                                <input type="text" id="inputApe" placeholder="[APELLIDOS]"/>
                            </div>
                        </div>
                        <!--<div class="row">
                            <div class="col-12">
                                <label for="contrasena">Para confirmar los cambios, escriba su contraseña: </label>
                                <input type="password" id="contrasena"/>
                                <button id="cambiarPassword" class="btn btn-secondary">Cambiar contraseña</button>
                            </div>
                        </div>-->
                    </div>   
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <button id="abrirBorrar" class="btn btn-danger">Borrar Cuenta</button>
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
            "email": localStorage.getItem("email"),
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
                        let perfil = datos['imagenPerfil'] || (datos['rol'] == 1 ? "eddocente.png": (datos['rol'] == 3 ? "edmundo.png" : "edestudiante.png"));
                        let nombre = datos['name'];
                        let apellidos = datos['surname'];
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
                        thisClass.mainHTML = thisClass.mainHTML.replaceAll("[PERFIL]", perfil )
                                                                        .replaceAll("[NOMBRE]", nombre)
                                                                        .replaceAll("[APELLIDOS]" , apellidos)
                                                                        .replaceAll("[ROL]", rolName);

                        thisClass.BBDDcallAulas();
                        
                    }
                }
            };
            //PAGINA ENVIO PHP
            xmlhttp.open('POST','http://www.edmundo.com/edmundo/assets/php/profile/callUser.php');
            xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
            let cadena = this.crea_query_string_calluser();
            xmlhttp.send(cadena);
    }

    crea_query_string_sendmodificar(nombre , apellidos){
        var obj = {
            "email": localStorage.getItem("email"),
            "nombre": nombre,
            "apellidos": apellidos
        }
        var cadena = JSON.stringify(obj);
        return cadena;
    }

    BBDDcallModificar(nombre, apellidos){
        var thisClass =this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    console.log("error");
                }else{
                    enviarRuta("/profile");
                }
            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','http://www.edmundo.com/edmundo/assets/php/profile/sendModificar.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string_sendmodificar(nombre, apellidos);
        xmlhttp.send(cadena);
    }

    crea_query_string_callaulas(){
        var obj = {
            "email": localStorage.getItem("email")
        }
        var cadena = JSON.stringify(obj);
        return cadena;
    }

    BBDDcallAulas(){
        var thisClass =this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                var datos = JSON.parse(this.responseText);
                var noAulas = false;
                if (datos == "") {
                    noAulas = true;
                }else{
                    var aulaListHTML = ``;
                    var aulaHTML = 
                    `<div>
                        <span id="nombre">[NOMBRE]</span>
                    </div>`;
                    datos.forEach(aula => {
                        aulaListHTML += aulaHTML.replace('[NOMBRE]', aula['nombre'] + " Código de aula:" + aula['codAula']);
                    });

                    thisClass.mainHTML = thisClass.mainHTML.replace('[LISTA-AULAS]', aulaListHTML);   
                }

                document.getElementById('main').innerHTML = thisClass.mainHTML;

                if(noAulas){
                    $("#aulasParticipa").hide();
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

                document.getElementById("fileToUpload").onchange = function(e) {
                    e.preventDefault();
                    if($("#fileToUpload").val() == "" || $("#fileToUpload").val() == undefined || $("#fileToUpload").val() == null){
                        alert("No se ha añadido ningún archivo");
                    }else{
                        enviarPerfil();
                    }
                };

                $("#volverHome").on("click", ()=>{
                    enviarRuta("/");
                })
            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','http://www.edmundo.com/edmundo/assets/php/profile/callAulas.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string_callaulas();
        xmlhttp.send(cadena);
    }
}