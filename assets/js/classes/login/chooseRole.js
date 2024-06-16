//ELEGIR ENTRE ALUMNO Y PROFESOR
import { enviarRuta } from "../../router.js";
import { Footer } from "../mainstructure/footer.js";

export class ChooseRole {
    //ROL DEL USUARIO
    // 0 = NO ASIGNADO
    // 1 = PROFESOR
    // 2 = ALUMNO
    // 3 = ADMINISTRADOR
    rol=0;
    email = localStorage.getItem('email');

    chooseRoleHTML = `
        <main id="main" class="main"><div class="comp-register box text-center" id="comp-register"><h3>¿Cómo quieres iniciar?</h3>
        <div class="row h-100">
            <div id="rolEstudiante" class="col-6 rolbutton">
                <div class="row">
                    <div class="col-12 d-flex align-items-center justify-content-center"><h2>Estudiante</h2></div>
                    <div class="col-12"><img src="http://www.edmundo.com/edmundo/assets/files/logos/edestudiante.png" alt="estudiante"/></div>
                </div>
            </div>
            <div id="rolDocente" class="col-6 rolbutton">
                <div class="row">
                    <div class="col-12 d-flex align-items-center justify-content-center"><h2>Docente</h2></div>
                    <div class="col-12"><img src="http://www.edmundo.com/edmundo/assets/files/logos/eddocente.png" alt="docente"/></div>
                </div>
            </div>
        </div>
        
        <button id='volverLogin' class='btn btn-primary'>Volver al Login</button>
        </div></main>
        <div class="footer-secondary" id="footer"></div>`;

    constructor() {
        document.getElementById('body').innerHTML = this.chooseRoleHTML;
        $("#body").addClass("body-login");
        let footer = new Footer();
        this.crearChooseRole();
        
    }

    crearChooseRole() {

        

        document.getElementById('rolDocente').addEventListener('click', () =>{
            this.rol = 1;
            this.BBDDcall();
        })
        document.getElementById('rolEstudiante').addEventListener('click', () => {
            this.rol = 2;
            this.BBDDcall();
        });
    }

    crea_query_string() {
        var obj = {"rol":this.rol, "email":this.email};
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
                    //ENVIAR DATOS POR PANTALLA
                    // 
                    //console.log(datos);
                    localStorage.setItem("rol", datos["rol"]);
                    console.log("Completado");
                    enviarRuta('/');
                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','http://www.edmundo.com/edmundo/assets/php/login/chooseRole.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string();
        xmlhttp.send(cadena);
    }

}