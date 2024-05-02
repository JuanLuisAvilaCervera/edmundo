import { enviarRuta } from "../../router.js";

export class Aulas{

    classCode = "";

    
    constructor(){
        this.listarAulas();
    }

    listarAulas(){
        this.BBDDcall_ListAulas();
    }


    crea_query_string_listAulas() {
        var obj = {"email": localStorage.getItem("email")}
        var cadena = JSON.stringify(obj);
        return cadena;
    }


    BBDDcall_ListAulas(){
        var xmlhttp = new XMLHttpRequest();
        var thisClass = this; //ESTO NOS PERMITE USAR FUNCIONES DE LA CLASE DENTRO DE ONREADYSTATECHANGE
        xmlhttp.onreadystatechange= function() {
            if(this.readyState==4 && this.status==200) {
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    console.log("Fallo");
                }else{
                    console.log(datos);
                    console.log("Completado");

                    var aulaListHTML =
                    `<div class="container aula-list" id="aula-list">
                        [LISTA-AULAS]
                    </div>`;
                    var currentAulaHTML =
                    `<div class="aula-active" id="[CODAULA]">
                        <div class="aula-image"></div>
                        <div class="container">
                            <div class="row">
                                <div class=col-6><p class="aula-name">[AULA-NAME]</p>
                                <p class="aula-profesor">[AULA-PROFESOR]</p></div>
                                <div class=col-6><p class="currentCodAula">[CODAULA]</p></div>
                            </div>
                        </div>
                    </div>`;

                    var joinAulaHTML =
                    `<div class="join-aula" id="join-aula">
                        <div>
                            <input type="text" id="classCode" maxlength = 6>
                            <button id="enviarCode">Unirse a Clase</button>
                        </div>
                    </div>`;

                    var createAulaHTML = 
                    `<div class="create-aula-div" id="create-aula">
                            <button id="create-aula">Crear Clase</button>
                    </div>`;

                    var aulaHTML =
                    `<div class="aula-inactive" id="[ID]">
                        <div>
                            <span class="aula-name">[AULA-NAME]</span>
                            <span class="aula-profesor">[AULA-PROFESOR]</span>
                        </div>
                    </div>`;

                    var aulaSectionHTML = "";
                    var aulaList = [];
                    if(datos.length > 1){
                        datos.forEach(aula => {
                            //CURRENT AULA
                                if(aula['codAula'] == localStorage.getItem("lastCodAula")){
                                    //TODO: TRAER DATOS DEL PROFESOR CREADOR DE LA CLASE
                                    var currentAula = currentAulaHTML.replace('[AULA-NAME]',aula['nombre'])
                                                                .replace('[AULA-PROFESOR]', aula['idCreator'])
                                                                .replaceAll('[CODAULA]', aula['codAula']);
                                    aulaSectionHTML += aulaListHTML.replace('[LISTA-AULAS]', currentAula);
                                }else{
                                    //OTRAS AULAS
                                    aulaList.push(aulaHTML.replaceAll('[ID]', aula['codAula'])
                                                            .replace('[AULA-NAME]', aula['nombre'])
                                                            .replace('[AULA-PROFESOR]', aula['idCreator']));
                                }
                            });
                            
                    }else{
                        //EN EL CASO DE SOLO TRAER UNA CLASE (POSIBLES FALLOS DEBIDO A FETCHALL)
                        var newAula = currentAulaHTML.replace('[AULA-NAME]',datos['nombre'])
                                                                .replace('[AULA-PROFESOR]', datos['idCreator'])
                                                                .replace('[CODAULA]', datos['codAula']);
                        aulaSectionHTML += aulaListHTML.replace('[LISTA-AULAS]', newAula);
                    }

                    var rol = localStorage.getItem("rol");
                    console.log(rol);
                    switch(rol){
                        case "1":
                            aulaSectionHTML+= createAulaHTML;
                            break;
                        case "2":
                            aulaSectionHTML+= joinAulaHTML;
                            break;
                        default:
                            break;
                    }
                    
                     //AÑADIR EL RESTO DE AULAS
                    aulaList.forEach(aula =>{
                        aulaSectionHTML+= aula;
                    });
                    
                    //AÑADIR HTML A LA PÁGINA
                    document.getElementById('aula-section').innerHTML = aulaSectionHTML;

                    //BOTON PARA UNIRSE A UNA CLASE NUEVA O CREAR CLASE NUEVA
                    if(document.getElementById('classCode') != undefined && document.getElementById('enviarCode') != undefined){
                        document.getElementById('classCode').addEventListener('input', () =>{
                            thisClass.comprobar();
                        })
    
                        document.getElementById('enviarCode').addEventListener('click', () => {
                            thisClass.classCode = document.getElementById('classCode').value;
                            console.log(thisClass.classCode);
                            if(thisClass.classCode.length == 6){
                                //COMPROBAR EN BASE DE DATOS
                                thisClass.BBDDcall_joinClass();
                                localStorage.setItem('lastCodAula', thisClass.classCode);
                                enviarRuta("/");
                                
                            }else{
                                console.log("error: classcode empty or length > or < to 6");
                                console.log(thisClass.classCode.length);
                                //ERROR
                            }
                        });
                    }else if(document.getElementById('create-aula') != undefined){
                        document.getElementById('create-aula').addEventListener("click", ()=>{
                            enviarRuta("/crearAula");
                        })
                    }

                    //PARA CAMBIAR DE CLASE AL CLICAR EN LA LISTA
                    $(".aula-inactive").each(function () {
                        $(this).on("click", function(event){
                            thisClass.updateCurrentClass($(this).attr("id"));
                        })
                    });
                    $(".aula-active").on("click", function(event){
                        thisClass.updateCurrentClass($(this).attr("id"));
                    })
                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','http://www.edmundo.com/edmundo/assets/php/aulas/listAulas.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string_listAulas();
        xmlhttp.send(cadena);
    }


    comprobar(){
        let charList = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 1 2 3 4 5 6 7 8 9 0';
        charList = charList.split(" ");
        let input = document.getElementById('classCode');
        let value = input.value;
        value = value.toUpperCase();
        for(let i = 0 ; i < value.length ; i++){
            if(!charList.includes(value[i])){
                value = value.replace(value[i] , "");
            }
        }
        input.value = value;
        
    }

    crea_query_string_joinClass() {
        var obj = {"codAula": this.classCode , "email": localStorage.getItem("email")};
        var cadena = JSON.stringify(obj);
        return cadena;
    }

    BBDDcall_joinClass(){
        var xmlhttp = new XMLHttpRequest();
        var thisClass = this;
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                console.log(this.responseText);
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    //document.getElementById('datos').innerHTML = "La contraseña o el usuario introducidos son incorrectos";
                    console.log("Fallo");
                }else{
                    console.log(datos);
                    console.log("Completado");
                    localStorage.setItem("lastCodAula", thisClass.classCode);
                    thisClass.listarAulas();
                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','assets/php/joinAula/classCode.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string_joinClass();
        xmlhttp.send(cadena);
    }

    updateCurrentClass( newCodAula){
        var xmlhttp = new XMLHttpRequest();
        if(newCodAula != localStorage.getItem("lastCodAula")){
            xmlhttp.onreadystatechange=function() {
                if(this.readyState==4 && this.status==200) {
                    console.log(this.responseText);
                    var datos = JSON.parse(this.responseText);
                    
                    if (datos == "") {
                    }else{
                        console.log(datos);
                        console.log("Completado");
    
                        localStorage.setItem('lastCodAula', newCodAula );
                        //REFRESCAR PÁGINA
                        enviarRuta("/");
                    }
    
                }
            };
            //PAGINA ENVIO PHP
            xmlhttp.open('POST','assets/php/aulas/updateAula.php');
            xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
            var obj = {"codAula": newCodAula, "email": localStorage.getItem("email")};
            var cadena = JSON.stringify(obj);
            xmlhttp.send(cadena);
        }else{
            enviarRuta("/");
        }
        
    }
}