//ELEGIR CLASE AL REGISTRARSE COMO ALUMNO
import { enviarRuta } from "../../../router.js";

export class WaitSolicitud{
    aulaName = "";

    //NOMBRE
    waitSolicitudHTML = `<h1> ESPERE A QUE SU SOLICITUD SEA ACEPTADA </h1>
    <p>Su solicitud para el rol de profesor ha sido enviada para ser aceptada por un administrador</p>
    <p>Se le informará del estado de su solicitud cuanto antes</p>
    <p>Si ha elegido erroneamente la opción de comenzar como profesor, puede volver a la selección de roles aquí:</p>
    <button id="eliminarRol">Volver a la selección de roles</button>`;

    constructor() {
        document.getElementById("body").innerHTML = this.waitSolicitudHTML;
        var thisClass = this;
        $("#eliminarRol").on("click", function(){
            thisClass.BBDDcall();
        })
    }

    crea_query_string(){
        var obj = {"email":localStorage.getItem("email")};
        var cadena = JSON.stringify(obj);
        return cadena;
    }

    BBDDcall(){
        var email = localStorage.getItem("email");
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                console.log(this.responseText);
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    console.log("Fallo");
                }else{
                    console.log(datos);
                    console.log("Completado");
                    localStorage.clear();
                    enviarRuta('/');
                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','assets/php/login/borrarRol.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string();
        xmlhttp.send(cadena);
    }
    

}