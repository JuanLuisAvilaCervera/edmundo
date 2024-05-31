//ELEGIR CLASE AL REGISTRARSE COMO ALUMNO
import { enviarRuta } from "../../../router.js";

export class WaitSolicitud{
    aulaName = "";

    //NOMBRE
    waitSolicitudHTML = `<h1> ESPERE A QUE SU SOLICITUD SEA ACEPTADA </h1>
    <p>Su solicitud para el rol de profesor ha sido enviada para ser aceptada por un administrador</p>
    <p>Se le informará del estado de su solicitud cuanto antes</p>
    <button id="volverLogin">Volver a Log In</button>`;
    //CAMBIAR POR "CONTINUAR COMO ALUMNO";

    constructor() {
        document.getElementById("body").innerHTML = this.waitSolicitudHTML;
        $("#volverLogin").on("click", function(){
            localStorage.clear();
            enviarRuta('/');
        })
    }
}