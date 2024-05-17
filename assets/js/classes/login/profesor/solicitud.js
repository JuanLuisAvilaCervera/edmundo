//ELEGIR CLASE AL REGISTRARSE COMO ALUMNO
import { enviarRuta } from "../../../router.js";

export function solicitud(){
    var email = localStorage.getItem('email');

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
                    enviarRuta('/');
                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','assets/php/login/solicitud.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = crea_query_string();
        xmlhttp.send(cadena);
}

function crea_query_string(){
    var obj = {"email":localStorage.getItem("email")};
        var cadena = JSON.stringify(obj);
        return cadena;
}

