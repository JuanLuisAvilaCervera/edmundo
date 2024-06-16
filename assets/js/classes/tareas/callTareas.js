import { enviarRuta } from "../../router.js";


export class callTareas{


    constructor(){
        var thisClass = this;

        $("#volverAvisos").on("click", function(){
            localStorage.removeItem('tarea');
            enviarRuta('/avisos');
        })

        $("#buttonEditar").on("click", function(){
            $("#editarAviso").modal("show");
        })
        $("#verNotas").on("click", function(){
            thisClass.notasPDF();
        })

        $(function(){
            $('#inputdatepicker').datepicker({dateFormat: "dd-mm-yy"});
        });
        $(function(){
            $('#inputhourpicker').clockTimePicker({});
        })

        $("#modEvento").on('click', ()  =>{
             var titulo = document.getElementById('inputtitulo').value
            var fecha = document.getElementById('inputdatepicker').value;
            var hora = document.getElementById('inputhourpicker').value;
            var codAula = localStorage.getItem('lastCodAula');

            if( fecha == "" || this.comprobar_fecha(fecha)){
                $("#modificarModal").modal("show");
            }else{
                alert("La fecha no es válida, es la fecha actual o anterior a esta");
            }

            
        })

        $("#eliminarEvento").on("click", () =>{
            $("#borrarModal").modal("show");
        });
        
        $("#aceptarModificar").on("click", () =>{
            thisClass.BBDDcallModificar();
        })

        $("#aceptarBorrar").on("click", () =>{
            thisClass.BBDDcallBorrar();
        })

        


        //LISTAR TAREAS ENTREGADAS Y SUS MODALES
        this.BBDDcallAviso();
        this.BBDDcallTareas();
        this.BBDDcallSinentregar();



    }

    comprobar_fecha(fecha){

        var dia = fecha.substring(0,2);
        var mes = fecha.substring(3,5);
        var anno = fecha.substring(6,10);

        var chosendate = new Date(mes + "-"+ dia + "-" + anno);

        if(chosendate == "Invalid Date"){
            return false;
        }else{
            return true;
        }
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

                    var fechaYMD = datos['fecha'].substr(0,10);
                    var fechaDMY = fechaYMD.substr(8,2)+"-"+fechaYMD.substr(5,2)+"-"+fechaYMD.substr(0,4);

                    document.getElementById('fecha').innerHTML = fechaDMY+ " " + datos['fecha'].substr(11,5);
                    document.getElementById('texto').innerHTML = datos['texto'];
                    document.getElementById('titulo').innerHTML = datos['titulo'];

                    $("#inputtitulo").attr("placeholder",  datos['titulo']);
                    $("#inputtexto").attr("placeholder",  datos['texto']);
                    
                    $("#inputdatepicker").attr("placeholder",  fechaDMY);
                    $("#inputhourpicker").attr("placeholder",  datos['fecha'].substr(11,5));
                    if(datos['tarea']){
                        document.getElementById('isTarea').innerHTML = "Tarea a entregar";
                    }else{
                        $("#tarea-list").hide();
                    }
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
        var thisClass = this;
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
                    //REFRESCAR POR ATRAS
                    thisClass.BBDDcallAviso();
                    thisClass.BBDDcallTareas();
                    thisClass.BBDDcallSinentregar();
                }
            }
        }
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','../assets/php/tareas/puntuar.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string_puntuacion(puntuacion);
        xmlhttp.send(cadena);
    }

    crea_query_string_modificar() {
        // var obj = {"codAula": this.classCode , "email": localStorage.getItem("email")};
        var titulo = $("#inputtitulo").val() || $("#inputtitulo").attr("placeholder");
        var fecha = $("#inputdatepicker").val() || $("#inputdatepicker").attr("placeholder");
        var texto = $("#inputtexto").val();
        var tarea = $("#tarea").is(":checked");
        var atrasada = $("#atrasadaCheck").is(":checked");
        var hora = $("#inputhourpicker").val() ||  $("#inputhourpicker").attr("placeholder");
        var idAviso  = localStorage.getItem("tarea");

        var dia = fecha.substring(0,2);
        var mes = fecha.substring(3,5);
        var anno = fecha.substring(6,10);

        //DATETIME EN MYSQL TIENE "YYYY-MM-DD" COMO FORMATO
        var chosendate = anno + "-"+ mes + "-" + dia;

        //CONVERTIR STRINGFECHA Y STRINGHORA EN FECHA
        var fulldate = chosendate + " " + hora + ":00";

        var obj = {
            "text":texto,
            "idAviso":idAviso,
            "titulo":titulo,
            "tarea":tarea,
            "fecha":fulldate,
            "atrasada":atrasada
        }
        var cadena = JSON.stringify(obj);
        console.log(obj);
        return cadena;
    }

    BBDDcallModificar(){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                var datos = JSON.parse(this.responseText);
                
                if (datos == "") {
                    console.log("Fallo");
                }else{
                    console.log(datos);
                    console.log("Completado");
                    //REFRESCAR PÁGINA
                    window.location.reload();
                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','../assets/php/avisos/updateavisos.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string_modificar();
        xmlhttp.send(cadena);
    }

    crea_query_string_borrar(){
        var obj = {
            "idTarea": localStorage.getItem("tarea"),
        }
        var cadena = JSON.stringify(obj);
        console.log(cadena);
        return cadena;
    }

    BBDDcallBorrar(){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                var datos = JSON.parse(this.responseText);
                
                if (datos == "") {
                    console.log("Fallo");
                }else{
                    console.log(datos);
                    console.log("Completado");
                    //REFRESCAR PÁGINA
                    localStorage.removeItem("tarea");
                    enviarRuta("/avisos");
                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','../assets/php/avisos/borraravisos.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string_borrar();
        xmlhttp.send(cadena);
    }

    notasPDF(){
        var f = document.createElement("form");
        f.setAttribute('method',"post");
        f.setAttribute('action',"http://www.edmundo.com/edmundo/assets/php/tareas/pdf.php");
        $(document.body).append(f);
        f.submit();
    }
}