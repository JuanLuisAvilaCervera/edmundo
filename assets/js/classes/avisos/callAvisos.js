import { enviarRuta } from "../../router.js";
import { enviarArchivos } from "../../archivos.js";

export class callAvisos{
    constructor(){
        this.BBDDcallAulas();
        this.callAvisos();


        //LISTAR SOLO NUEVOS
        var thisClass = this;
        var fecha = localStorage.getItem("fecha");
        
        $('#aulaSelect').change(function() {
            thisClass.mostrarAvisos();
        });

        $("#verAntiguos").change(function() {
            thisClass.mostrarAvisos();
        });

        $("#verTareas").change(function() {
            thisClass.mostrarAvisos();
        });
        
    }

    mostrarAvisos(){

        var avisos = $(".aviso");

        var idAula =  $('#aulaSelect').children(":selected").attr("id");
        if (idAula == 'allAulas') {
            $('.aviso').show();
        }else{
            //array con los avisos de dicha aula
            $('.aviso').hide();
            $('.aviso[id*="-'+ idAula +'"]').show();
        }
        
        this.checkOld();
        this.checkTareas();

    }

    mostrarFecha(fecha){
        $('.aviso').hide();
        var puntofecha = "."+fecha;
        $('.aviso '+puntofecha).parent().show();
        localStorage.setItem("fecha", "");
    }

    checkOld(){

        var ischecked= $("#verAntiguos").is(':checked');
        if(!ischecked){
                $(".expired").parent().hide();
        }
        
    }
    checkTareas(){
        var ischecked = $("#verTareas").is(":checked");
        if(ischecked){
            $(".istarea-false").parent().hide();
        }
    }


    BBDDcallAulas(){
        //AÑADIR TIEMPO RESTANTE
        var optionHTML = 
        `<option id=[IDAULA]>[NOMBRE]</option>`;
    
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    console.log("Fallo");

                }else{
                    //AÑADIR OPTIONS A SELECT

                    var aulaSelect = document.getElementById('aulaSelect');
                    datos.forEach(aula => {
                        var optionAula = optionHTML;
                        optionAula = optionAula
                                        .replace('[NOMBRE]' , aula['nombre'])
                                        .replace('[IDAULA]' , aula['idAula']);
                        aulaSelect.innerHTML += optionAula;
                    });


                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','../assets/php/avisos/callaulas.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string();
        xmlhttp.send(cadena);
    }

    crea_query_string(){
        var obj = {
            "email": localStorage.getItem("email")
        }
        var cadena = JSON.stringify(obj);
        return cadena;
    }

    callAvisos(){
        this.BBDDcallAvisos();
    }

    BBDDcallTareas(){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    //PONER A TODAS LAS TAREAS (SIN ENTREGAR)
                    console.log("Fallo");
                }else{
                    datos.forEach(tarea => {
                        var tareaId = tarea['idTarea'];
                        var fechaEntrega = tarea['fechaEntrega'];
                        var file = tarea['file'];
                        var aviso = $('.aviso[id*="'+ tareaId +'-"]');
                        var puntuacion = tarea['puntuacion'];
                        if(fechaEntrega.substr(0,10) == "0000-00-00" || file == ""){
                            aviso.find(".entregada").text("Sin Entregar");
                            aviso.find(".entregada").css("color", "red");
                        }else{
                            let fechaTemp = aviso.find(".fecha").text();
                            fechaTemp = fechaTemp.substr(7,4)+"-"+fechaTemp.substr(4,2)+"-"+fechaTemp.substr(1,2);
                            
                            aviso.find(".tareaFile").text(file);

                            if(puntuacion != "" && puntuacion != undefined && puntuacion != null && puntuacion != 0 && puntuacion != "0"){
                                puntuacion = puntuacion + "/100";
                            }else{
                                puntuacion = "Sin calificar";
                            }
                            aviso.find(".puntuacion").text(puntuacion);

                            if((new Date(fechaTemp) - new Date(fechaEntrega.substr(0,10))) > 0){
                                aviso.find(".entregada").text("Entregada");
                                aviso.find(".entregada").css("color", "green");
                                aviso.find(".entregada").addClass("true");
                            }else{
                                aviso.find(".entregada").text("Entregada con atraso");
                                aviso.find(".entregada").css("color", "red");
                                aviso.find(".entregada").addClass("true");
                            }
                        }

                        //PONER AL RESTO DE TAREAS (SIN ENTREGAR)
                        //ELIMINAR PRIMER IFELSE
                    });

                }
            }
        }
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','../assets/php/avisos/calltareas.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string();
        xmlhttp.send(cadena);
    }
    
    BBDDcallAvisos(){
    
        //AÑADIR TIEMPO RESTANTE
        var avisoHTML = 
        `<div class="aviso form-control" id="[ID]-[IDAULA]" style="display:[DISPLAY];">
            <span class="titulo">[TITULO]</span><span class="fecha [DIA]"> [FECHA]</span> <span class='[SPANCLASS] '>[SPANTEXTO]</span>
            <div class="tarea istarea-[ISTAREA] isatrasada-[ISATRASADA]" style="display:[DISPLAYTAREA];">
                <span class='entregada'></span>
            </div>
            <span class="texto" style="display:none;">[TEXTO]</span>
            <span class="tareaFile" style="display:none;"></span>
            <span class="puntuacion" style="display:none;"></span>
            
        </div>`;
    
        var thisClass = this;

        var xmlhttp = new XMLHttpRequest();
        var thisClass = this;
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    console.log("Fallo");

                }else{
                    //LLAMADA A BBDD BUSCAR TAREAS ENTREGADAS
                    var avisoList = document.getElementById('aviso-list');
                    datos.forEach(aviso => {
                        var newAviso = avisoHTML;

                        var fechaYMD = aviso['fecha'].substr(0,16);
                        var fechaDMY = fechaYMD.substr(8,2)+"-"+fechaYMD.substr(5,2)+"-"+fechaYMD.substr(0,4)+ " "+fechaYMD.substr(11);

                        var isTarea = aviso['tarea'];
                        var atrasada = aviso['atrasada'];

                        newAviso = newAviso.replace('[TITULO]' , aviso['titulo'])
                                        .replace('[FECHA]' , fechaDMY)
                                        .replace('[DIA]' , fechaYMD.substr(0,10))
                                        .replace('[ID]', aviso['idAviso'])
                                        .replace('[IDAULA]' , aviso['idAula'])
                                        .replace('[TEXTO]', aviso['texto']);

                        
                        var diff = ( new Date(aviso['fecha'].replace(/-/g,'/')) - new Date());
                        var id = aviso['idAviso']+"-"+aviso['idAula'];
                        if(diff <= 0){
                            newAviso = newAviso.replace('[SPANCLASS]', "expired")
                                                .replace('[DISPLAY]', "none");
                            if(isTarea){
                                newAviso = newAviso.replace('[SPANTEXTO]', "Tarea finalizada");
                            }else{
                                newAviso = newAviso.replace('[SPANTEXTO]', "Evento finalizado");
                            }
                        }else{
                            // 1s = 1000  
                            var daysleft = Math.round(diff / (1000 * 3600 * 24));
                            newAviso = newAviso.replace('[SPANCLASS]', "ongoing")
                                                .replace('[SPANTEXTO]', "Quedan " + daysleft + " dia/s")
                                                .replace('[DISPLAY]', "block");

                        }

                        if(isTarea){
                            newAviso = newAviso.replace('[ISTAREA]', "true")
                                                .replace('[DISPLAYTAREA]', "block");
                            if(atrasada){
                                newAviso = newAviso.replace('[ISATRASADA]', "true");
                            }else{
                                newAviso = newAviso.replace('[ISATRASADA]', "false");
                            }
                            
                        }else{
                            newAviso = newAviso.replace('[ISTAREA]', "false")
                                                .replace('[DISPLAYTAREA]', "none"); 
                              
                        }
                        avisoList.innerHTML += newAviso;    
                    });
                    //MOSTRAR POR FECHA
                    var fecha = localStorage.getItem("fecha");

                    if(fecha != "" && fecha != null && fecha != undefined){
                        console.log(fecha);
                        thisClass.mostrarFecha(fecha);
                        // localStorage.setItem("fecha", "");
                    }


                    //CONFIGURACIÓN DEL MODAL
                    $(".aviso").on("click", function(event){
                        var rol = localStorage.getItem('rol');
                        var fullTareaId = $(this).attr("id");
                        var tareaArray = fullTareaId.split("-");
                        console.log("Aviso");
                        if(rol == "1"){
                            localStorage.setItem('tarea',tareaArray[0]);
                            enviarRuta("/tareas");
                            
                        }else{
                            var titulo = $(this).find(".titulo").html();
                            var texto = $(this).find(".texto").html();
                            var fecha = $(this).find(".fecha").html();
                            var entregada = $(this).find(".true");
                            //AVERIGUAR QUE TIPO ES
                            var fechafinal = fecha.substr(7,4)+"/"+fecha.substr(4,2)+"/"+fecha.substr(1,2)+" "+fecha.substr(11)+":00";
                            
                            if($(this).find(".tarea").hasClass("istarea-true")){
                                    console.log(entregada.length);
                                    $('#avisoModal').find("#descargarTarea").empty();
                                    if(entregada.length != 0){

                                        var filename = $(this).find(".tareaFile").text();
                                        var puntuacion = $(this).find(".puntuacion").text();
                                        $('#avisoModal').find("#puntuacion").text("Puntuación:" +puntuacion);
                                        //NO MOSTRAR BOTÓN DE ENTREGAR
                                        $('#avisoModal').find("#botonEntrega").hide();
                                        //ENSEÑAR NOMBRE DEL ARCHIVO ENTREGADO
                                        $('#avisoModal').find("#descargarTarea").append('<a href="http://www.edmundo.com/edmundo/assets/files/tareasEntregadas/'+filename+ '" download>'+filename+'</a>');
                                        $('#avisoModal').find("#descargarTarea").append('<button id="borrarTarea">X</button>');
                                        //PERMITIR DESCARGARLO O ELIMINARLO
                                        //AÑADIR VENTANA EMERGENTE AVISANDO AL BORRAR
                                    }else
                                    if($(this).find(".tarea").hasClass("isatrasada-true") || (new Date() - new Date(fechafinal)) < 0){
                                        $('#avisoModal').find("#botonEntrega").show();
                                        $('#entregar').on("click", function(e){
                                            e.preventDefault();
                                            console.log($("#fileToUpload").val());
                                            if($("#fileToUpload").val() == "" || $("#fileToUpload").val() == undefined || $("#fileToUpload").val() == null){
                                                alert("No se ha añadido ningún archivo");
                                            }else{
                                                enviarArchivos(tareaArray[0]);
                                            }
                                        
                                        });
                                    }else{
                                        $('#avisoModal').find("#botonEntrega").hide();
                                        $('#avisoModal').find("#noEntrega").text("Fuera de plazo");
                                    }
                                
                            }else{
                                $('#avisoModal').find("#botonEntrega").hide();
                            }
                            $('#avisoModal').find("#avisoModalLabel").text(titulo);
                            $('#avisoModal').find("#texto").text(texto);
                            $('#avisoModal').find("#fecha").text(fecha);
                            $('#avisoModal').modal('show');
                        }
                    })


                    //BBDDCALLTAREAS
                    thisClass.BBDDcallTareas();
                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','../assets/php/avisos/callavisos.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string();
        xmlhttp.send(cadena);
    }

}

