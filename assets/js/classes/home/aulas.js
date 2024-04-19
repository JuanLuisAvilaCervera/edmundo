
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

        this.BBDDcall();
        
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
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    console.log("Fallo");
                }else{
                    console.log(datos);
                    console.log("Completado");
                    // datos.forEach(aula => {
                    //     var aulaSectionHTML = "";
                    //     var aulaList = [];
                    //     if(aula['codAula' == localStorage.getItem("currentCodAula")]){
                    //         //TODO: TRAER DATOS DEL PROFESOR CREADOR DE LA CLASE
                    //         aulaSectionHTML += this.currentAulaHTML.replace('[AULA-NAME]',aula['name'])
                    //                                                 .replace('[AULA-PROFESOR]', aula['idCreator'])
                    //                                                 .replace('[CODAULA]', aula['codAula]']);
                    //     }else{
                    //         aulaList.push(aulaHTML.replace('[ID]', aula['idAula'])
                    //                                 .replace('[AULA-NAME]', aula['name'])
                    //                                 .replace('[AULA-PROFESOR]', aula['idCreator']));
                    //     }
                    // });
                    // aulaSectionHTML+= this.joinAulaHTML;
                    // aulaList.forEach(aula =>{
                    //     aulaSectionHTML+= aula;
                    // });

                    
                    // document.getElementById('aula-section').innerHTML = aulaSectionHTML;
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