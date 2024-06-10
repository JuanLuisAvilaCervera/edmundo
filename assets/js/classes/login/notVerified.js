
import { enviarRuta } from "../../router.js";
import { Footer } from "../mainstructure/footer.js";
import { HeaderSecondary } from "../mainstructure/header-secondary.js";

var bodyHTML = `<div class="header-secondary" id="header"></div>
<main id="main" class="main"><div class="comp-register box text-center" id="comp-register"><h3>Registro Completo</h3>
<p>Se ha enviado un correo de confirmación </p><p>Por favor revise la carpeta de 'Correo no deseado' si no encuentra el mensaje</p>
 <button id='volverLogin' class='btn btn-primary'>Volver al Login</button>
 </div></main>


 <div class="footer-secondary" id="footer"></div>`;

document.getElementById('body').innerHTML = bodyHTML;
$("#body").addClass("body-login");
let footer = new Footer();
let header = new HeaderSecondary();
localStorage.clear();
document.getElementById('volverLogin').addEventListener('click', function(){
    
    enviarRuta('/');
})
