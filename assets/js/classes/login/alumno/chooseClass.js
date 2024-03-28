//ELEGIR CLASE AL REGISTRARSE COMO ALUMNO
import { enviarRuta } from "../../../router.js";

export class ChooseClass {
    
    classCode = "";

    chooseClassHTML = `<h1> ELEGIR CLASE </h1>
    <input type="text" id="classCode" maxlength = 6>
    <button id="enviarCode">Unirse a Clase</button>`;

    constructor() {
        this.crearChooseClass();
    }

    crearChooseClass() {

        document.getElementById('body').innerHTML = this.chooseClassHTML;

        document.getElementById('classCode').addEventListener('input', () =>{
            this.comprobar();
        })
        document.getElementById('enviarCode').addEventListener('click', () => {
            this.classCode = document.getElementById('classCode').value;
            if(classCode != "" && classCode.length == 6){
                
                //COMPROBAR EN BASE DE DATOS
                this.BBDDcall();
                // localStorage.setItem('classCode', classCode);
                
            }else{
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

    crea_query_string() {
        var obj = {"codAula": this.classCode};
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
                    //document.getElementById('datos').innerHTML = "La contraseña o el usuario introducidos son incorrectos";
                    console.log("Fallo");
                }else{
                    console.log(datos);
                    console.log("Completado");
                    localStorage.setItem("lastCodAula", this.classCode);
                    enviarRuta('/');
                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','assets/php/classCode.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string();
        xmlhttp.send(cadena);
    }

}