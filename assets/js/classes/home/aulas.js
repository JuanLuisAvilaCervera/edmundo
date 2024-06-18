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
                    `<div class="aula-active container" id="[CODAULA]">
                        <div class="row">
                            <div class="class-image col-4">[IMGAULA]</div>
                            <div class="class-info col-8">
                                <div class="row alignt-items-center" style="height: 30px;">
                                    <div class="col-10 pl-2"><h5 class="aula-name m-0" style="height: 20px;">[AULA-NAME]</h5></div>
                                    <div class="col-2 p-0 d-flex justify-content-start">
                                        <button id="confAula" class="btn btn-secondary p-1 d-flex align-items-center align-self-end" style="height: 30px; width:30px;">
                                            <ion-icon name="cog-outline"></ion-icon>
                                        </button>
                                    </div>
                                    
                                    
                                </div>
                                <div class="row"  style="max-height: 50px;">
                                    <span class="aula-profesor m-0"  style="height: 20px;">Docente: <br> [AULA-PROFESOR]</span>
                                </div>
                                
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 d-flex align-items-center"><span class="currentCodAula">Código de Aula: [CODAULA]</span><button id="copy" class="btn btn-secondary"><ion-icon name="copy-outline"></ion-icon></button></div>
                        </div>
                    </div>`;

                    // var joinAulaHTML =
                    // `<div class="join-aula" id="join-aula">
                    //     <label for="classCode">Introduce un código de aula para unirse:</label>
                    //     <div class="d-flex flex-row">
                    //         <div class="btn-group" role="group" aria-label="Basic example">
                    //         <input type="text" id="classCode" maxlength = 6 class="rounded-start border border-secondary bg-white me-0" placeholder="A1B2C3">
                    //         <button id="enviarCode" class="btn btn-primary">Unirse</button>
                    //         </div>
                    //     </div>
                    // </div>`;

                    // var createAulaHTML = 
                    // `<div class="create-aula-div" id="create-aula-div">
                    //         <button id="create-aula" class="btn btn-secondary">Crear Clase</button>
                    // </div>`;

                    // var aulaHTML =
                    // `<div class="aula-inactive" id="[ID]">
                    //     <div>
                    //         <span class="aula-name">[AULA-NAME]</span>
                    //         <span class="aula-profesor">[AULA-PROFESOR]</span>
                    //     </div>
                    // </div>`;

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
                                // if(aula['idCreator'] == localStorage.getItem("idUsuario")){
                                //     currentAula = currentAula.replace('[ROLAULA]', "Docente")
                                // }else{
                                //     currentAula = currentAula.replace('[ROLAULA]', "Estudiante")
                                // }
                                

                                var imgAula = aula ['imagenAula'];

                                if(imgAula == "" || imgAula == null || imgAula == undefined){
                                    currentAula = currentAula.replace('[IMGAULA]', `<img style="height: 75px; width: 75px;" src='http://www.edmundo.com/edmundo/assets/files/aulas/aulapfp.png'/>`);
                                }else{
                                    currentAula = currentAula.replace('[IMGAULA]', `<img style="height: 75px; width: 75px;" src='http://www.edmundo.com/edmundo/assets/files/aulas/`+imgAula+`'/>`);
                                }
                                var mainAula = document.getElementById('mainAula-section')
                                mainAula.innerHTML = aulaListHTML.replace('[LISTA-AULAS]', currentAula);

                                $("#mainAula-section").on("click", () =>{
                                    enviarRuta("/misAulas");
                                })
                            }
                            // else{
                            //     //OTRAS AULAS
                            //     aulaList.push(aulaHTML.replaceAll('[ID]', aula['codAula'])
                            //                             .replace('[AULA-NAME]', aula['nombre'])
                            //                             .replace('[AULA-PROFESOR]',aula['creator'] + " " + aula['surCreator']));
                            // }
                        });
                            
                    

                    var rol = localStorage.getItem("rol");
                    var solicitud = localStorage.getItem("solicitud");
                    // aulaSectionHTML+= joinAulaHTML;
                    // if(rol == "1" && solicitud == "2"){
                    //     aulaSectionHTML+= createAulaHTML;
                    // }
                    
                     //AÑADIR EL RESTO DE AULAS
                    // aulaList.forEach(aula =>{
                    //     aulaSectionHTML+= aula;
                    // });
                    
                    //AÑADIR HTML A LA PÁGINA
                    // document.getElementById('aula-section').innerHTML = aulaSectionHTML;

                    // BOTON PARA UNIRSE A UNA CLASE NUEVA O CREAR CLASE NUEVA
                    // if(document.getElementById('classCode') != undefined && document.getElementById('enviarCode') != undefined){
                    //     document.getElementById('classCode').addEventListener('input', () =>{
                    //         thisClass.comprobar();
                    //     })
    
                        // document.getElementById('enviarCode').addEventListener('click', () => {
                        //     thisClass.classCode = document.getElementById('classCode').value;
                        //     console.log(thisClass.classCode);
                        //     if(thisClass.classCode.length == 6){
                        //         //COMPROBAR EN BASE DE DATOS
                        //         thisClass.BBDDcall_joinClass();
                        //         enviarRuta("/");
                                
                        //     }else{
                        //         alert("Código de aula erroneo");
                        //         console.log(thisClass.classCode.length);
                        //         //ERROR
                        //     }
                        // });
                    // }
                    
                    // if(document.getElementById('create-aula') != undefined){
                    //     document.getElementById('create-aula').addEventListener("click", ()=>{
                    //         enviarRuta("/crearAula");
                    //     })
                    // }

                    //PARA CAMBIAR DE CLASE AL CLICAR EN LA LISTA
                    

                    $("#confAula").on('click', (e) =>{
                        if(e && e.stopPropagation) e.stopPropagation();
                        enviarRuta('/aulas');
                    })

                    // $(".aula-active").on("click", function(event){
                    //     thisClass.updateCurrentClass($(this).attr("id"));
                    // })

                    // $(".aula-inactive").on("click", function(event){
                    //     thisClass.updateCurrentClass($(this).attr("id"));
                    // })
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