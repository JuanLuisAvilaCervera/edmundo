
import { enviarRuta } from "../../router.js";

var bodyHTML = `<div class="comp-register box text-center" id="comp-register"><h1>Edmundo</h1><h3>Registro Completo</h3>
<p>Se ha enviado un correo de confirmación </p><p>Por favor revise la carpeta de 'Correo no deseado' si no encuentra el mensaje</p>
 <button id='volverLogin' class='btn btn-primary'>Volver al Login</button>
 </div>
 
 <div class="footer-secondary" id="footer"><div class="copyright">Edmundo 2024</div></div>`;

document.getElementById('body').innerHTML = bodyHTML;
localStorage.clear();
document.getElementById('volverLogin').addEventListener('click', function(){
    
    enviarRuta('/');
})
