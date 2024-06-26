export class newAviso{

    newAvisoButtonHTML = `
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newAviso">
    Añadir Evento
    </button>

    <!-- Modal -->
    <div class="modal fade" id="newAviso" tabindex="-1" aria-labelledby="newAvisoLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="newAvisoLabel">Añadir nuevo evento</h1>
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
                        <div class="col-3"><label for="titulo">Título:</label></div>
                        <div class="col-7">
                            <input type="text" id="titulo" class="form-control">
                        </div>
                    </div>

                    <div>
                        <label for="texto">Descripción: </label>
                        <textarea id="texto" class="form-control"></textarea>
                    </div>
                    <div>
                        <label for="tarea">Marcar como tarea (permitir entrega de archivos)</label>
                        <input type="checkbox" id="tarea" class="form-check-input">
                    </div>
                    <div id="atrasada"style="display:none">
                        <label for="atrasadaCheck">¿Permitir entrega posterior a la fecha de la tarea?</label>
                        <input type="checkbox" id="atrasadaCheck"  class="form-check-input"></div>
                    <div>
                    <div class="row">
                        <div class="col-6"><label>Selecciona fecha del evento: </label></div>
                        <div class="col-6">
                            <input type="text" id="datepicker" class="form-control"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6"><label>Selecciona hora de finalización: </label></div>
                        <div class="col-6">
                            <input type="text" id="hourpicker" class="form-control"/>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" id="sendAviso">Crear Aviso</button>
                </div>
            </div>
        </div>
    </div>
    `;

    constructor(){
        document.getElementById("nuevoAvisoDiv").innerHTML = this.newAvisoButtonHTML;

        this.BBDDcallAulas();

        $(function(){
            $('#datepicker').datepicker({dateFormat: "dd-mm-yy"});
        });
        $(function(){
            $('#hourpicker').clockTimePicker({});
        })

        let thisClass = this;
        $("#tarea").change(function() {
            if(this.checked) {
                $("#atrasada").show();
            }else{
                $("#atrasada").hide();
                $("#atrasadaCheck").prop("checked", false);
            }
        });
        $("#sendAviso").on("click", function(){
            thisClass.sendAvisos();
        });

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

    sendAvisos(){
        var titulo = $("#titulo").val();
        var fecha = $("#datepicker").val();
        var hora = $("#hourpicker").val();
        var idAula =$("#elegirAula").children(":selected").attr("id");

        if(titulo != "" && fecha != "" && hora != "" && idAula != undefined){
            if(this.comprobar_fecha(fecha)){
                this.BBDDcall(); 
            }else{
                alert("La fecha no es válida, es la fecha actual o anterior a esta");
            }
        }else{
            //AÑADIR AVISO DE ERROR
            alert("Hay datos obligatorios sin rellenar");
        }

        //RELOAD PAGE AT THE END
    }

    crea_query_string() {
        // var obj = {"codAula": this.classCode , "email": localStorage.getItem("email")};
        var titulo = $("#titulo").val();
        var fecha = $("#datepicker").val();
        var texto = $("#texto").val();
        var tarea = $("#tarea").is(":checked");
        var atrasada = $("#atrasadaCheck").is(":checked");
        var hora = $("#hourpicker").val();
        var idAula =$("#elegirAula").children(":selected").attr("id");

        var dia = fecha.substring(0,2);
        var mes = fecha.substring(3,5);
        var anno = fecha.substring(6,10);

        //DATETIME EN MYSQL TIENE "YYYY-MM-DD" COMO FORMATO
        var chosendate = anno + "-"+ mes + "-" + dia;

        //CONVERTIR STRINGFECHA Y STRINGHORA EN FECHA
        var fulldate = chosendate + " " + hora + ":00";

        var obj = {
            "text":texto,
            "idAula": idAula,
            "titulo":titulo,
            "tarea":tarea,
            "fecha":fulldate,
            "hora":hora,
            "atrasada":atrasada
        }
        var cadena = JSON.stringify(obj);
        return cadena;
    }

    BBDDcall(){

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
        xmlhttp.open('POST','../assets/php/avisos/sendavisos.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string();
        xmlhttp.send(cadena);
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
                    console.log(datos);
                    //AÑADIR OPTIONS A SELECT

                    var aulaSelect = document.getElementById('elegirAula');
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
        let cadena = this.crea_query_string_aula();
        xmlhttp.send(cadena);
    }

    crea_query_string_aula(){
        var obj = {
            "email": localStorage.getItem("email")
        }
        var cadena = JSON.stringify(obj);
        return cadena;
    }
}