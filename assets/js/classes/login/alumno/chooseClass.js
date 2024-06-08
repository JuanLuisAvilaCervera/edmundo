//ELEGIR CLASE AL REGISTRARSE COMO ALUMNO
import { enviarRuta } from "../../../router.js";
import { Footer } from "../../mainstructure/footer.js";
import { HeaderSecondary } from "../../mainstructure/header-secondary.js";

export class ChooseClass {
    
    classCode = "";

    chooseClassHTML = `
    
    
    
    <div class="header-secondary" id="header"></div>
<main id="main" class="main"><div class="comp-register box text-center" id="comp-register"><h1> ELEGIR CLASE </h1>
<div class="row"><div class="col-4 d-flex align-items-center"><label for="classCode">Código de clase</label></div>
<div class="col-8"><input type="text" id="classCode" maxlength = 6 class="w-100 form-control"></div></div>
    <button id="enviarCode" class="btn btn-primary">Unirse a Clase</button></div></main>
 <div class="footer-secondary" id="footer"></div>`;

    constructor() {
        document.getElementById('body').innerHTML = this.chooseClassHTML;
        $("#body").addClass("body-login");

        let header = new HeaderSecondary();
        let footer = new Footer();
        this.crearChooseClass();
    }

    crearChooseClass() {

        
        document.getElementById('classCode').addEventListener('input', () =>{
            this.comprobar();
        })
        document.getElementById('enviarCode').addEventListener('click', () => {
            this.classCode = document.getElementById('classCode').value;
            console.log(this.classCode);
            if(this.classCode.length == 6){
                
                //COMPROBAR EN BASE DE DATOS
                this.BBDDcall();
                // localStorage.setItem('classCode', classCode);
                
            }else{
                console.log("error: classcode empty or length > or < to 6");
                console.log(this.classCode.length);
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
        var obj = {"codAula": this.classCode , "email": localStorage.getItem("email")};
        var cadena = JSON.stringify(obj);
        return cadena;
    }

    BBDDcall(){
        var thisClass = this;
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
                    localStorage.setItem("lastCodAula", thisClass.classCode);
                    enviarRuta('/');
                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','assets/php/joinAula/classCode.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string();
        xmlhttp.send(cadena);
    }

}