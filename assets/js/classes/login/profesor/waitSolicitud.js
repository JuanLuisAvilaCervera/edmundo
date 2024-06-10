//ELEGIR CLASE AL REGISTRARSE COMO ALUMNO
import { enviarRuta } from "../../../router.js";
import { HeaderSecondary } from "../../mainstructure/header-secondary.js";
import { Footer } from "../../mainstructure/footer.js";

export class WaitSolicitud{
    aulaName = "";

    //NOMBRE
    waitSolicitudHTML = `<div class="header-secondary" id="header"></div>
        <main id="main" class="main"><div class="comp-register box text-center" id="comp-register"><h3>Espere a que su solicitud sea aceptada</h3>
    <p>Su solicitud para el rol de profesor ha sido enviada para ser aceptada por un administrador</p>
    <p>Se le informará del estado de su solicitud cuanto antes</p>
    <button id="volverLogin" class="btn btn-primary">Volver a Log In</button>
    </main>
    <div class="footer-secondary" id="footer"></div>`;
    //CAMBIAR POR "CONTINUAR COMO ALUMNO";

    constructor() {
        document.getElementById("body").innerHTML = this.waitSolicitudHTML;
        let footer = new Footer();
        let header = new HeaderSecondary();
        $("#volverLogin").on("click", function(){
            localStorage.clear();
            enviarRuta('/');
        })
    }
}