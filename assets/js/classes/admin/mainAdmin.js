export class MainAdmin{
    pestanasHTML = `<div class="d-flex flex-column justify-content-center align-items-center">
    <div class="pestanas-contenedor">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="alumnos-tab" data-bs-toggle="tab" data-bs-target="#alumnos"
                    type="button" role="tab" aria-controls="alumnos" aria-selected="true">Alumnos</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="profesores-tab" data-bs-toggle="tab" data-bs-target="#profesores" type="button"
                    role="tab" aria-controls="profesores" aria-selected="false">Profesores</button>
            </li>
            
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="alumnos" role="tabpanel" aria-labelledby="info-tab">
                <div class="pestana">
                
                </div>
            </div>
            <div class="tab-pane fade" id="profesores" role="tabpanel" aria-labelledby="profesores-tab">
                <div class="pestana">
                    
                </div>
            </div>
        </div>
    </div>`;

    constructor(){
        document.getElementById('main').innerHTML = this.pestanasHTML;
        this.BBDDcall();
    }
    
    aceptarSolicitud(idUsuario){
        var obj = {
            "idUsuario": idUsuario
        }
        var cadena = JSON.stringify(obj);
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    console.log("Fallo");
                }else{
                    console.log("Completado");
                    window.location.reload();
                }
            }
        }
        xmlhttp.open('POST','../assets/php/admin/aceptarSolicitud.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        xmlhttp.send(cadena);
    }

    BBDDcall(){
        const thisClass = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    console.log("Fallo");
                }else{

                    var alumnosHTML = 
                        `<div class="container tabla">
                            <div class="row" id="[IDUSUARIO]">
                                <div class="col datos" id="nombre">
                                    [NOMBRE]
                                </div>
                                <div class="col datos" id="apellidos">
                                    [APELLIDOS]
                                </div>
                                <div class="col datos" id="email">
                                    [EMAIL]
                                </div>
                            </div>
                        </div>`;
                        var profesoresHTML = 
                        `<div class="container tabla">
                            <div class="row" id="[IDUSUARIO]">
                                <div class="col datos" id="nombre">
                                    [NOMBRE]
                                </div>
                                <div class="col datos" id="apellidos">
                                    [APELLIDOS]
                                </div>
                                <div class="col datos" id="email">
                                    [EMAIL]
                                </div>
                                <div class="col-3">
                                    [SOLICITUD]
                                </div>
                            </div>
                        </div>`;

                        var alumnosArray = [];
                        var profesoresArray = [];
                    
                     datos.forEach(usuario => {
                        var usuarioHTML = "";
                        if(usuario['rol'] == "1"){
                            usuarioHTML = profesoresHTML.replace("[NOMBRE]", usuario['name'])
                                                        .replace("[APELLIDOS]", usuario['surname'])
                                                        .replace("[IDUSUARIO]", usuario['idUsuario'])
                                                        .replace("[EMAIL]", usuario['email']);
                            if(usuario['solicitud'] == "1"){
                                usuarioHTML = usuarioHTML.replace("[SOLICITUD]", '<button class="solicitud">Aceptar Solicitud</button>');
                            }else{
                                usuarioHTML = usuarioHTML.replace("[SOLICITUD]", '');
                            }
                            profesoresArray.push(usuarioHTML);
                        }else if(usuario['rol'] == "2"){
                            usuarioHTML = alumnosHTML.replace("[NOMBRE]", usuario['name'])
                                                        .replace("[APELLIDOS]", usuario['surname'])
                                                        .replace("[IDUSUARIO]", usuario['idUsuario'])
                                                        .replace("[EMAIL]", usuario['email']);
                            alumnosArray.push(usuarioHTML);
                        }
                    });
                        alumnosArray.forEach(alumno =>{
                            
                            $("#alumnos .pestana").append(alumno);
                        })
                        profesoresArray.forEach(profesor =>{
                            $("#profesores .pestana").append(profesor);
                        })

                       
                        $(".solicitud").on("click", function(event){
                            var id = $(this).parent().parent().attr("id");
                            thisClass.aceptarSolicitud(id);
                        })
                }
            }
        }
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','../assets/php/admin/callusers.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        xmlhttp.send();
    }
}