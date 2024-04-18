
export class Aulas{
    aulaListHTML = `<div class="container aula-list" id="aula-list">
                    [LISTA-AULAS]
                    </div>`;
    currentAulaHTML = `<div class="aula-active" id="aula-active">
        <div class="aula-image"></div>
        <div class="container">
            <div class="row">
                <div class=col-6><p class="aula-name">[AULA-NAME]</p>
                <p class="aula-profesor">[AULA-PROFESOR]</p></div>
                <div class=col-6><p class="currentCodAula">[CODAULA]</p></div>
            </div>
        </div>
    </div>`;

    joinAulaHTML = `<div class="join-aula" id="join-aula">
        <div>
            <p class="aula-name">Unirse a un aula</p>
        </div>
    </div>`;

    aulaHTML = `<div class="aula[ID]" id="aula[ID]">
        <div>
            <p class="aula-name">[AULA-NAME]</p>
            <p class="aula-profesor">[AULA-PROFESOR]</p>
        </div>
    </div>`
    

    constructor(){

        //Variable STRING donde añadiremos todos los datos
        var aulaSectionHTML = "";



        //TODO: Llamada a BBDD, traer todas las clases del usuario
        //TODO: Identificar currentAula, replace currentAulaHTML con sus datos, añadir a aulaListHTML
        //TODO: Añadir joinAulaHTML a aulaListHTML
        //TODO: ordenar alfabéticamente, foreach replace en aulaHTML y añadir a aulaListHTML (excepto currentAula)
        
        document.getElementById('aula-section').innerHTML = aulaSectionHTML;
    }


    crea_query_string() {

        var obj = {"email": localStorage.getItem("email")}
        var cadena = JSON.stringify(obj);
        return cadena;
    }


    BBDDcall(){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                console.log(this.responseText);
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    console.log("Fallo");
                }else{
                    console.log(datos);
                    console.log("Completado");
                    //REFRESCAR PÁGINA
                    enviarRuta("/");
                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','assets/php/aulas/listAulas.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string();
        xmlhttp.send(cadena);
    }
}