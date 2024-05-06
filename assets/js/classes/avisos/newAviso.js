

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
        <div> <label for="titulo">Título</label><input type="text" id="titulo"></div>
        <div><textarea id="texto"></textarea></div>
        <div><label for="tarea">¿Permitir entrega de archivos como tareas?</label><input type="checkbox" id="tarea"></div>
        <div>
            <div id="datepick">
            <label>Selecciona fecha: </label>
            <input type="text" id="datepicker"/>
            </div>
        </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" id="sendAviso">Confirmar</button>
        </div>
        </div>
    </div>
    </div>
    `;

    constructor(){
        document.getElementById("anadir-aviso-section").innerHTML = this.newAvisoButtonHTML;

        $(function(){
            $('#datepicker').datepicker();
        });

        let thisClass = this;
        
        $("#sendAviso").on("click", function(){
            
            thisClass.sendAvisos();

        });

    }

    sendAvisos(){
        var titulo = $("#titulo").val();
        var fecha = $("#datepicker").val();
        var texto = $("#texto").val();
        var tarea = $("#tarea").is(":checked");

        if(titulo != "" && fecha != ""){
            this.BBDDcall();
            // console.log("Titulo"+titulo);
            // console.log("Texto "+texto);
            // console.log("Tarea "+tarea);
            // console.log("Fecha "+fecha);
        }else{
            //AÑADIR AVISO DE ERROR
            alert("Hay datos obligatorios sin rellenar");
        }

        //RELOAD PAGE AT THE END
    }

    crea_query_string() {
        // var obj = {"codAula": this.classCode , "email": localStorage.getItem("email")};
        var obj = {
            "text":this.textareaPost,
            "email": localStorage.getItem("email"),
            "codAula": localStorage.getItem("lastCodAula")
        }
        var cadena = JSON.stringify(obj);
        return cadena;
    }

    BBDDcall(){

        var titulo = $("#titulo").val();
        var fecha = $("#datepicker").val();
        var texto = $("#texto").val();
        var tarea = $("#tarea").is(":checked");

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
        xmlhttp.open('POST','assets/php/avisos/sendavisos.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string();
        xmlhttp.send(cadena);
    }
}