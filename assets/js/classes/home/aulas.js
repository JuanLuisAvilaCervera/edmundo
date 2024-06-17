import { enviarRuta } from "../../router.js";
import { solicitud } from "../login/profesor/solicitud.js";
import { Home } from "./home.js";

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
                    let home = new Home();
                }else{
                    var aulaListHTML =
                    `<div class="container aula-list" id="aula-list">
                        [LISTA-AULAS]
                    </div>`;
                    var currentAulaHTML =
                    `<div class="aula-active" id="[CODAULA]">
                        <div class="row">
                            <div class="class-image col-4">[IMGAULA]</div>
                            <div class="class-info col-8">
                                <div class="row d-flex justify-content-end" style="height: 30px;">
                                    <button id="confAula" class="btn btn-secondary p-1 d-flex align-items-center" style="height: 30px; width:30px;">
                                        <ion-icon name="cog-outline"></ion-icon>
                                    </button>
                                </div>
                                <div class="row"  style="max-height: 70px;">
                                    <span class="aula-name m-0" style="height: 20px;">[AULA-NAME]</span>
                                    <span class="aula-profesor m-0"  style="height: 20px;">[AULA-PROFESOR]</span>
                                    <span class="rolAula m-0"  style="height: 20px;">[ROLAULA]</span>
                                </div>
                                
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12"><p class="currentCodAula">Código de Aula: [CODAULA]</p></div>
                            <button id="copy">[]]</button>
                        </div>
                    </div>`;

                    var joinAulaHTML =
                    `<div class="join-aula" id="join-aula">
                        <label for="classCode">Introduce un código de aula para unirse:</label>
                        <div class="d-flex flex-row">
                            <div class="btn-group" role="group" aria-label="Basic example">
                            <input type="text" id="classCode" maxlength = 6 class="rounded-start border border-secondary bg-white me-0" placeholder="A1B2C3">
                            <button id="enviarCode" class="btn btn-primary">Unirse</button>
                            </div>
                        </div>
                    </div>`;

                    var createAulaHTML = 
                    `<div class="create-aula-div" id="create-aula-div">
                            <button id="create-aula" class="btn btn-secondary">Crear Clase</button>
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
                        datos.forEach(aula => {
                            //CURRENT AULA
                            if(aula['codAula'] == localStorage.getItem("lastCodAula")){

                                localStorage.setItem("creator", aula['idCreator']);
                                //TODO: TRAER DATOS DEL PROFESOR CREADOR DE LA CLASE
                                var currentAula = currentAulaHTML.replace('[AULA-NAME]',aula['nombre'])
                                                            .replace('[AULA-PROFESOR]', aula['creator'] + " " + aula['surCreator'])
                                                            .replaceAll('[CODAULA]', aula['codAula']);
                                if(aula['idCreator'] == localStorage.getItem("idUsuario")){
                                    currentAula = currentAula.replace('[ROLAULA]', "Docente")
                                }else{
                                    currentAula = currentAula.replace('[ROLAULA]', "Estudiante")
                                }
                                

                                var imgAula = aula ['imagenAula'];

                                if(imgAula == "" || imgAula == null || imgAula == undefined){
                                    currentAula = currentAula.replace('[IMGAULA]', `<img style="height: 75px; width: 75px;" src='http://www.edmundo.com/edmundo/assets/files/aulas/edmundo.png'/>`);
                                }else{
                                    currentAula = currentAula.replace('[IMGAULA]', `<img style="height: 75px; width: 75px;" src='http://www.edmundo.com/edmundo/assets/files/aulas/`+imgAula+`'/>`);
                                }
                                aulaSectionHTML += aulaListHTML.replace('[LISTA-AULAS]', currentAula);
                            }else{
                                //OTRAS AULAS
                                aulaList.push(aulaHTML.replaceAll('[ID]', aula['codAula'])
                                                        .replace('[AULA-NAME]', aula['nombre'])
                                                        .replace('[AULA-PROFESOR]',aula['creator'] + " " + aula['surCreator']));
                            }
                        });
                            
                    

                    var rol = localStorage.getItem("rol");
                    var solicitud = localStorage.getItem("solicitud");
                    aulaSectionHTML+= joinAulaHTML;
                    if(rol == "1" && solicitud == "2"){
                        aulaSectionHTML+= createAulaHTML;
                    }
                    
                     //AÑADIR EL RESTO DE AULAS
                    aulaList.forEach(aula =>{
                        aulaSectionHTML+= aula;
                    });
                    
                    //AÑADIR HTML A LA PÁGINA
                    document.getElementById('aula-section').innerHTML = aulaSectionHTML;

                    // BOTON PARA UNIRSE A UNA CLASE NUEVA O CREAR CLASE NUEVA
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
                                enviarRuta("/");
                                
                            }else{
                                alert("Código de aula erroneo");
                                console.log(thisClass.classCode.length);
                                //ERROR
                            }
                        });
                    }
                    
                    if(document.getElementById('create-aula') != undefined){
                        document.getElementById('create-aula').addEventListener("click", ()=>{
                            enviarRuta("/crearAula");
                        })
                    }

                    //PARA CAMBIAR DE CLASE AL CLICAR EN LA LISTA
                    

                    $("#confAula").on('click', (e) =>{
                        if(e && e.stopPropagation) e.stopPropagation();
                        enviarRuta('/aulas');
                    })

                    $(".aula-active").on("click", function(event){
                        thisClass.updateCurrentClass($(this).attr("id"));
                    })

                    $(".aula-inactive").on("click", function(event){
                        thisClass.updateCurrentClass($(this).attr("id"));
                    })
                    $("#copy").on("click", (e) => {
                        if(e && e.stopPropagation) e.stopPropagation();
                        // navigator.clipboard.writeText(localStorage.getItem("lastCodAula"));

                        const textArea = document.createElement("textarea");
                        textArea.value = localStorage.getItem("lastCodAula");
                            
                        // Move textarea out of the viewport so it's not visible
                        textArea.style.position = "absolute";
                        textArea.style.left = "-999999px";
                            
                        document.body.prepend(textArea);
                        textArea.select();

                        try {
                            document.execCommand('copy');
                        } catch (error) {
                            console.error(error);
                        } finally {
                            textArea.remove();
                        }
                        
                        alert("Código de aula copiado a portapapeles");
                    });
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
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    //document.getElementById('datos').innerHTML = "La contraseña o el usuario introducidos son incorrectos";
                    alert("El código de aula no pertenece a ningún aula existente");
                }else{
                    localStorage.setItem("lastCodAula", thisClass.classCode);
                    localStorage.setItem("creator", datos['creator']);
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
                    var datos = JSON.parse(this.responseText);
                    
                    if (datos == "") {
                        //ERROR IMPROBABLE
                    }else{
    
                        localStorage.setItem('lastCodAula', newCodAula );
                        //REFRESCAR PÁGINA
                        enviarRuta("/");
                    }
    
                }
            };
            //PAGINA ENVIO PHP
            xmlhttp.open('POST','http://www.edmundo.com/edmundo/assets/php/aulas/updateAula.php');
            xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
            var obj = {"codAula": newCodAula, "email": localStorage.getItem("email")};
            var cadena = JSON.stringify(obj);
            xmlhttp.send(cadena);
        }else{
            enviarRuta("/");
        }
        
    }
}