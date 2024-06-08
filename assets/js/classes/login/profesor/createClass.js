//ELEGIR CLASE AL REGISTRARSE COMO ALUMNO
import { enviarRuta } from "../../../router.js";
import { Footer } from "../../mainstructure/footer.js";
import { HeaderSecondary } from "../../mainstructure/header-secondary.js";

export class CreateClass {
    
    aulaName = "";

    //NOMBRE
    createClassHTML = `<div class="header" id="header"></div>
<main id="main" class="main"><div class="comp-register box text-center" id="comp-register"><h1> CREA UNA CLASE </h1>
<div class="row"><div class="col-2 d-flex align-items-center"><label for="aulaName">Nombre</label></div><div class="col-10"><input type="text" id="aulaName" class="form-control"></div></div>
    <button id="enviarName" class="btn btn-primary">Crear clase</button></div></main>
 <div class="footer" id="footer"></div>`;

    constructor() {
        document.getElementById('body').innerHTML = this.createClassHTML;
        let footer = new Footer();
        let header = new HeaderSecondary();
        this.crearCreateClass();
    }

    crearCreateClass() {

        
        document.getElementById('enviarName').addEventListener('click', () => {
            this.aulaName = document.getElementById('aulaName').value;
            if(this.aulaName != ""){
                //COMPROBAR EN BASE DE DATOS
                this.BBDDcall();
            }else{
                alert("Nombre vacio");
                $("#aulaName").css("border", "solid 1px red");
            }
        });
    }

    crea_query_string() {
        var obj = {"aulaName": this.aulaName, "email":localStorage.getItem("email")};
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
                    localStorage.setItem("lastCodAula", datos['codAula']);
                    enviarRuta('/');
                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','assets/php/joinAula/createAula.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string();
        xmlhttp.send(cadena);
    }

}