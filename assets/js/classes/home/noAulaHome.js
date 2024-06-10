
import { enviarRuta } from "../../router.js";

export class NoAulaHome{
    mainHTML = `<!-- MAIN -->
            <!-- NUEVA CLASE -->
            <div class="comp-register box text-center" id="comp-register"><h3>Únete a tu primera clase</h3>
                <p>Aún no te has unido a ningun aula</p>
                <p>Introduce un código de aula para unirse</p>
                <div class="d-flex flex-row">
                    <input type="text" id="classCode" maxlength = 6 class="form-control" placeholder="A1B2C3">
                    <button id="enviarCode" class="btn btn-primary">Unirse</button>
                </div>
            </div>`;
    
    constructor(){
        document.getElementById('main').innerHTML = this.mainHTML;

        var thisClass = this;
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
                    alert("El código de aula no pertenece a ningún aula existente");
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
}