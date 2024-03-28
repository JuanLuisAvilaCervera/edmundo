//ELEGIR CLASE AL REGISTRARSE COMO ALUMNO
import { enviarRuta } from "../../../router.js";

export class CreateCalss {
    
    aulaName = "";

    //NOMBRE
    createClassHTML = `<h1> CREA TU PRIMERA CLASE </h1>
    <input type="text" id="aulaName">
    <button id="enviarName">Crear clase</button>`;

    constructor() {
        this.crearCreateClass();
    }

    crearCreateClass() {

        document.getElementById('body').innerHTML = this.createClassHTML;
        document.getElementById('enviarName').addEventListener('click', () => {
            this.aulaName = document.getElementById('aulaName').value;
            if(this.aulaName != ""){
                //COMPROBAR EN BASE DE DATOS
                this.BBDDcall();
            }else{
                //ERROR
            }
        });
    }

    crea_query_string() {
        var obj = {"aulaName": this.aulaName};
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
                    localStorage.setItem("lastCodAula", datos["code"]);
                    enviarRuta('/');
                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','assets/php/createAula.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string();
        xmlhttp.send(cadena);
    }

}