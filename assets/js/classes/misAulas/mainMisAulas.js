import { enviarRuta } from "../../router.js";
import { Home } from "../home/home.js";

export class MainMisAulas{
    classCode ="";
    mainHTML =`
        <div class="row w-100 main-row">    
            <!-- POSTS -->
            <div class="join-create">
                <h1>Mis Aulas</h1>
                <div class="d-flex flex-row bg-light rounded ps-3" >
                    <div class="join-aula w-100 " id="join-aula">
                        <div class=" d-flex flex-row align-items-center justify-content-center ">
                            <div class="me-1"><label for="classCode" style="font-size:18px">Introduce un código de aula para unirse: </label></div>
                                
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <input type="text" id="classCode" maxlength = 6 class="rounded-start border border-secondary bg-white me-0" placeholder="A1B2C3">
                                    <button id="enviarCode" class="btn btn-primary">Unirse</button>
                                </div>
                                <div class="create-aula-div" id="create-aula-div">
                                    <button id="create-aula" class="btn btn-secondary">Crear Clase</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="aula-list" class="row"></div>
                </div>
                
            </div>`;

    

    constructor(){

        document.getElementById("main").innerHTML = this.mainHTML;

        if(document.getElementById('classCode') != undefined && document.getElementById('enviarCode') != undefined){
            var thisClass = this;
                document.getElementById('classCode').addEventListener('input', () =>{
                    thisClass.comprobar();
                })
        }
        var rol = localStorage.getItem('rol');
        var solicitud = localStorage.getItem('solicitud');

        if(rol != "1" || solicitud != "2"){
            $("#create-aula-div").hide();
        }

        document.getElementById('enviarCode').addEventListener('click', () => {
            thisClass.classCode = document.getElementById('classCode').value;
            if(thisClass.classCode.length == 6){
                //COMPROBAR EN BASE DE DATOS
                thisClass.BBDDcall_joinClass();
                
            }else{
                alert("Código de aula erroneo");
                console.log(thisClass.classCode.length);
                //ERROR
            }
        });

        this.BBDDcallAulas();
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

    crea_query_string_listAulas() {
        var obj = {"email": localStorage.getItem("email")}
        var cadena = JSON.stringify(obj);
        return cadena;
    }

    BBDDcallAulas(){
        var xmlhttp = new XMLHttpRequest();
        var thisClass = this; //ESTO NOS PERMITE USAR FUNCIONES DE LA CLASE DENTRO DE ONREADYSTATECHANGE
        xmlhttp.onreadystatechange= function() {
            if(this.readyState==4 && this.status==200) {
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    let home = new Home();
                }else{
                    var rowHTML = `<div class="row">[COLUMNAS]</div>`;

                    var aulaHTML =
                    `<div class="col-6">
                        <div class="container aula" id="[CODAULA]">
                            <div class="row">
                                <div class="class-image col-4">[IMGAULA]</div>
                                <div class="class-info col-8">
                                    <div class="row alignt-items-center" style="height: 30px;">
                                        <div class="col-12 pl-2"><h5 class="aula-name m-0" style="height: 20px;">[AULA-NAME]</h5></div>
                                    </div>
                                    <div class="row"  style="max-height: 50px;">
                                        <span class="aula-profesor m-0"  style="height: 20px;">Docente: <br> [AULA-PROFESOR]</span>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 d-flex align-items-center"><span class="currentCodAula">Código de Aula: [CODAULA]</span><button class="copy btn btn-secondary" id="[CODAULA]"><ion-icon name="copy-outline" id="[CODAULA]"></ion-icon></button></div>
                            </div>
                        </div>
                    </div>`;
                    var aulaList = document.getElementById('aula-list');
                    aulaList.innerHTML = "";
                    datos.forEach((aula) =>{
                        localStorage.setItem("creator", aula['idCreator']);
                                //TODO: TRAER DATOS DEL PROFESOR CREADOR DE LA CLASE
                        var currentAula = aulaHTML.replace('[AULA-NAME]',aula['nombre'])
                                                    .replace('[AULA-PROFESOR]', aula['creator'] + " " + aula['surCreator'])
                                                    .replaceAll('[CODAULA]', aula['codAula']);
                        var imgAula = aula ['imagenAula'];

                        if(imgAula == "" || imgAula == null || imgAula == undefined){
                            currentAula = currentAula.replace('[IMGAULA]', `<img style="height: 75px; width: 75px;" src='http://www.edmundo.com/edmundo/assets/files/aulas/aulapfp.png'/>`);
                        }else{
                            currentAula = currentAula.replace('[IMGAULA]', `<img style="height: 75px; width: 75px;" src='http://www.edmundo.com/edmundo/assets/files/aulas/`+imgAula+`'/>`);
                        }
                        aulaList.innerHTML += currentAula;
                    });


                    $(".aula").on("click", function(event){
                        thisClass.updateCurrentClass($(this).attr("id"));
                    });

                    

                    $(".copy").on("click", (e) => {
                        
                        if(e && e.stopPropagation) e.stopPropagation();
                        // // navigator.clipboard.writeText(localStorage.getItem("lastCodAula"));

                        const textArea = document.createElement("textarea");
                        textArea.value = e.target.getAttribute("id");
                            
                        // // Move textarea out of the viewport so it's not visible
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
                    localStorage.setItem("creator", datos['idCreator']);
                    enviarRuta("/");
                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','http://www.edmundo.com/edmundo/assets/php/joinAula/classCode.php');
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