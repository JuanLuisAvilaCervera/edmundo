import { enviarRuta } from "../../router.js";

export class mainProfile{

    mainHTML = `<div class="comp-register box text-center" id="comp-register"><h3>Registro Completo</h3>
    <p>Se ha enviado un correo de confirmación </p><p>Por favor revise la carpeta de 'Correo no deseado' si no encuentra el mensaje</p>
     <button id='volverLogin' class='btn btn-primary'>Volver al Login</button>
     </div>`;

    constructor(){
        document.getElementById("main").innerHTML = this.mainHTML;
    }
}