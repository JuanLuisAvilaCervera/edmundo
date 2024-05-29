
import { enviarRuta } from "../../router.js";

var bodyHTML = `<h1>Registro Completo</h1>
<br>Se ha enviado un correo de confirmación, por favor revise la carpeta de 'Correo no deseado' si no encuentra el mensaje
 <button id='volverLogin'>Volver al Login</button>`;

document.getElementById('body').innerHTML = bodyHTML;
localStorage.clear();
document.getElementById('volverLogin').addEventListener('click', function(){
    
    enviarRuta('/');
})
