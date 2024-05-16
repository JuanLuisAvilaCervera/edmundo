import { enviarRuta } from "../../router.js";

export class callAvisos{
    constructor(){
        this.BBDDcallAulas();
        this.callAvisos();

        //LISTAR SOLO NUEVOS
        var thisClass = this;
        $('#aulaSelect').change(function() {
            thisClass.mostrarAvisos();
        });

        $("#verAntiguos").change(function() {
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

    }

    checkOld(){

        var ischecked= $("#verAntiguos").is(':checked');
        if(!ischecked){
                $(".expired").parent().hide();
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
        this.BBDDcallTareas();
    }

    BBDDcallTareas(){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    console.log("Fallo");
                }else{
                    datos.forEach(tarea => {
                        var tareaId = tarea['idTarea'];
                        var fechaEntrega = tarea['fechaEntrega'];
                        var file = tarea['file'];
                        var aviso = $('.aviso[id*="'+ tareaId +'-"]');
                        console.log(aviso);
                        if(fechaEntrega.substr(0,10) == "0000-00-00" || file == ""){
                            aviso.find(".entregada").text("Sin Entregar");
                            aviso.find(".entregada").css("color", "red");
                        }else{
                            if((new Date(aviso.find(".fecha").text()) - new Date(fechaEntrega.substr(0,10))) < 0){
                                aviso.find(".entregada").html("Entregada");
                                aviso.find(".entregada").css("color", "green");
                            }else{
                                aviso.find(".entregada").text("Entregada con atraso");
                                aviso.find(".entregada").css("color", "red");
                            }
                        }
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
            <span class="titulo">[TITULO]</span><span class="fecha"> [FECHA]</span> <span class='[SPANCLASS] '>[SPANTEXTO]</span>
            <div class="tarea istarea-[ISTAREA] isatrasada-[ISATRASADA]" style="display:[DISPLAYTAREA];">
                <span class='entregada' >[ENTREGADA]</span>
            </div>
            <span class="texto" style="display:none;">[TEXTO]</span>
            
        </div>`;
    
        var thisClass = this;

        var xmlhttp = new XMLHttpRequest();
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

                        newAviso = newAviso
                                        .replace('[TITULO]' , aviso['titulo'])
                                        .replace('[FECHA]' , fechaDMY)
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
                    //CONFIGURACIÓN DEL MODAL
                    $(".aviso").on("click", function(event){
                        var titulo = $(this).find(".titulo").html();
                        var texto = $(this).find(".texto").html();
                        var fecha = $(this).find(".fecha").html();
                        if($(this).find(".tarea").hasClass("istarea-true")){
                            if($(this).find(".tarea").hasClass("isatrasada-true") || (new Date() - new Date(fecha) < 0)){
                                $('#avisoModal').find("#botonEntrega").show();
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
                    })
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

