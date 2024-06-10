import { enviarRuta } from "../../router.js";


export class callTareas{


    constructor(){

        $("#volverAvisos").on("click", function(){
            localStorage.removeItem('tarea');
            enviarRuta('/avisos');
        })

        


        //LISTAR TAREAS ENTREGADAS Y SUS MODALES
        this.BBDDcallAviso();
        this.BBDDcallTareas();
        this.BBDDcallSinentregar();



    }
    crea_query_string(){
        var obj = {
            "tarea": localStorage.getItem("tarea")
        }
        var cadena = JSON.stringify(obj);
        return cadena;
    }

    BBDDcallAviso(){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    console.log("Fallo");

                }else{
                    //MOSTRAR TEXTO Y FECHA DE LA TAREA
                    document.getElementById('fecha').innerHTML = datos['fecha'].substr(0,16);
                    document.getElementById('texto').innerHTML = datos['texto'];
                    document.getElementById('titulo').innerHTML = datos['titulo'];
                }
            }
        }
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','../assets/php/tareas/callAviso.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string();
        xmlhttp.send(cadena);

    }

    BBDDcallTareas(){
        var thisClass = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    console.log("Fallo");
                }else{
                    console.log("Completado");
                    console.log(datos);
                    var tareaHTML = `<div class="tarea" id="[IDALUMNO]">
                    <span class="nombreAlumno">[NOMBRE] [APELLIDOS]</span>
                    <span class="fechaEntrega">[FECHA]</span>
                    <span class="puntuacion">Puntuación: [PUNTUACION]</span>
                    <div style="display:none" class="archivoTarea">[fileName]</div>
                    </div>`;
                    document.getElementById('lista-entregadas').innerHTML = "";
                    datos.forEach(alumno =>{
                        var puntuacion =  alumno['puntuacion'];
                        if(puntuacion != "" && puntuacion != undefined && puntuacion != null){
                            puntuacion = puntuacion + "/100";
                        }else{
                            puntuacion = "<span style='color:red'>Sin calificar</span>";
                        }
                        var tarea = tareaHTML.replace("[IDALUMNO]", alumno['idUsuario'])
                                            .replace("[NOMBRE]", alumno['name'])
                                            .replace("[APELLIDOS]", alumno['surname'])
                                            .replace("[FECHA]", alumno['fechaEntrega'].substr(0,16))
                                            .replace("[fileName]", alumno['file'])
                                            .replace("[PUNTUACION]",puntuacion);
                        document.getElementById('lista-entregadas').innerHTML += tarea;
                    });
                    var tareas = document.getElementById('lista-entregadas').children;
                    for(let i = 0 ; i < tareas.length ; i++){
                        tareas[i].addEventListener('click', (e) =>{
                            //ABRIR MODAL
                            $("#descargar").empty();
                            $("#tareaModalLabel").text(tareas[i].querySelector('.nombreAlumno').innerText);
                            var filename = tareas[i].querySelector('.archivoTarea').innerText;
                            $("#descargar").append('<a href="http://www.edmundo.com/edmundo/assets/files/tareasEntregadas/'+filename+ '" download>'+filename+'</a>');
                            $("#fechaEntrega").text(tareas[i].querySelector('.fechaEntrega').innerText);
                            $("#puntuacion").text(tareas[i].querySelector('.puntuacion').innerText);
                            $('#idUsuario').text(tareas[i].id);
                            $('#tareaModal').modal('show');

                            $('#botonPuntuar').on("click" , () =>{
                                var puntuacion = $('#inputPuntuar').val();
                                if(puntuacion < 1 || puntuacion > 100){
                                    alert('Valor de puntuación equivocada');
                                }else{
                                    thisClass.BBDDcallPuntuacion(puntuacion);
                                }
                            })
                        })
                    }
                    
                }
            }
        }
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','../assets/php/tareas/callTareas.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string();
        xmlhttp.send(cadena);
    }

    BBDDcallSinentregar(){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    console.log("Fallo");
                }else{
                    console.log("Completado");
                    console.log(datos);
                    var tareaHTML = `<div class="tarea" id="[IDALUMNO]">
                    <span class="nombreAlumno">[NOMBRE] [APELLIDOS]<span>
                    </div>`;
                    document.getElementById('lista-sinentregar').innerHTML = "";
                    datos.forEach(alumno =>{
                        var tarea = tareaHTML.replace("[IDALUMNO]", alumno['idUsuario'])
                                            .replace("[NOMBRE]", alumno['name'])
                                            .replace("[APELLIDOS]", alumno['surname']);
                        document.getElementById('lista-sinentregar').innerHTML += tarea;
                    })
                    
                    
                    
                }
            }
        }
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','../assets/php/tareas/callSinEntregar.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string();
        xmlhttp.send(cadena);
    }

    crea_query_string_puntuacion(puntuacion){
        var obj = {
            "idTarea": localStorage.getItem("tarea"),
            "idUsuario": $("#idUsuario").text(),
            "puntuacion": puntuacion
        }
        var cadena = JSON.stringify(obj);
        console.log(cadena);
        return cadena;
    }

    BBDDcallPuntuacion(puntuacion){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                var datos = JSON.parse(this.responseText);
                console.log(datos);
                if (datos == "") {
                    console.log("Fallo");

                }else{
                    var points =  datos;
                        if(points != "" && points != undefined && points != null){
                            points = points + "/100";
                        }else{
                            points = "Sin calificar";
                        }
                        $("#puntuacion").text(points);
                }
            }
        }
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','../assets/php/tareas/puntuar.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string_puntuacion(puntuacion);
        xmlhttp.send(cadena);
    }
}