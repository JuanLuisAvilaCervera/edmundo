import { enviarRuta } from "../../router.js";

export class callAvisos{
    constructor(){
        this.BBDDcallAulas();
        this.BBDDcallAvisos();

        //LISTAR SOLO NUEVOS
        var thisClass = this;
        $('#aulaSelect').change(function() {
            thisClass.mostrarAvisos();
        });

        $("#verAntiguos").change(function() {
            thisClass.mostrarAvisos();
        });

        this.checkOld();

        
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
                console.log($(".aviso"));
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
    
    BBDDcallAvisos(){
    
        //AÑADIR TIEMPO RESTANTE
        var avisoHTML = 
        `<div class="aviso form-control" id="[ID]-[IDAULA]">
            [TITULO] [FECHA] <span class='[SPANCLASS]'>[SPANTEXTO]</span>
        </div>`;
    
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    console.log("Fallo");

                }else{
                    var avisoList = document.getElementById('aviso-list');
                    datos.forEach(aviso => {
                        var newAviso = avisoHTML;

                        var fechaYMD = aviso['fecha'].substr(0,16);
                        var fechaDMY = fechaYMD.substr(8,2)+"-"+fechaYMD.substr(5,2)+"-"+fechaYMD.substr(0,4)+ " "+fechaYMD.substr(11);
                        newAviso = newAviso
                                        .replace('[TITULO]' , aviso['titulo'])
                                        .replace('[FECHA]' , fechaDMY)
                                        .replace('[ID]', aviso['idAviso'])
                                        .replace('[IDAULA]' , aviso['idAula']);

                        
                        var diff = ( new Date(aviso['fecha'].replace(/-/g,'/')) - new Date());
                        var id = aviso['idAviso']+"-"+aviso['idAula'];
                        if(diff <= 0){
                            newAviso = newAviso.replace('[SPANCLASS]', "expired")
                                                .replace('[SPANTEXTO]', "Evento pasado");
                        }else{
                            var daysleft = Math.round(diff / (1000 * 3600 * 24));
                            newAviso = newAviso.replace('[SPANCLASS]', "ongoing")
                                                .replace('[SPANTEXTO]', "Quedan " + daysleft + " dia/s");

                        }
                        


                        avisoList.innerHTML += newAviso;
                        // 1s = 1000  

                        $( "#verAntiguos" ).prop( "checked", true );
                        $( "#verAntiguos" ).prop( "checked", false );
                        
                    });
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

