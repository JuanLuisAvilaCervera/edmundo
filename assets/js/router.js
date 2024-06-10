import { Home } from "./classes/home/home.js";
import { Register } from "./classes/login/register.js";
import { ChooseClass } from "./classes/login/alumno/chooseClass.js";
import { CreateClass } from "./classes/login/profesor/createClass.js";
import { ChooseRole } from "./classes/login/chooseRole.js";
import { WaitSolicitud } from "./classes/login/profesor/waitSolicitud.js";
import { solicitud } from "./classes/login/profesor/solicitud.js";
import { HomeAvisos } from "./classes/avisos/homeavisos.js";
import { HomeTareas } from "./classes/tareas/homeTareas.js";

var indexHTML = "";
var body = document.getElementById('body');

export function enviarRuta(ruta) {
    var email = localStorage.getItem('email');
    var verified = localStorage.getItem('verified');
    if (email != "" && email != null && email != undefined && verified != "" && verified != null && verified != undefined && verified != "0") {
        switch (ruta) {
            case "/":
                
                //COMPROBAR QUE NO ESTAMOS EN LA PÁGINA, EVITA UN BUCLE
                if(window.location.href !=  "http://www.edmundo.com/edmundo/index.html"){
                    window.location.href = "http://www.edmundo.com/edmundo/index.html";
                }
                //COMPROBAR ROL
                let rol = localStorage.getItem('rol');
                let getSolicitud = localStorage.getItem('solicitud');
                var classCode = localStorage.getItem('lastCodAula');
                switch(rol){
                    //PROFESOR
                    case "1":
                        switch(getSolicitud){
                            case "1":
                                //CREAR CLASE SOLICITUD
                                var waitsolicitud = new WaitSolicitud();
                                break;
                            case "2":
                                //COMPROBAR CLASE
                                if(classCode != "" && classCode != undefined && classCode != null){
                                    var home = new Home();
                                }else{
                                    enviarRuta('/crearAula');
                                }
                                break;
                            default:
                                //CREAR CLASE SOLICITUD
                                localStorage.setItem('solicitud', "1");
                                solicitud();
                                break;
                        }
                        break;
                    //ALUMNO
                    case "2":
                        var home = new Home();
                        break;
                    //ADMIN
                    case "3":
                        //AÑADIR CONTRASEÑA PARA CONTROLAR EL ACCESO
                        window.location.href = "http://www.edmundo.com/edmundo/html/admin.html";
                       
                        break;
                    //ROL NO ASIGNADO
                    default:
                        enviarRuta('/chooseRole');
                        break;
                }
                
                break;
            // case "/chooseClass":
            //     var chooseClass = new ChooseClass();
            //     break;
            case "/crearAula":
                if(window.location.href !=  "http://www.edmundo.com/edmundo/html/createAulas.html"){
                    window.location.href = "http://www.edmundo.com/edmundo/html/createAulas.html";
                }
                var createClass = new CreateClass();
                break;
            case "/chooseRole":
                var chooseRole = new ChooseRole();
                break;
            case "/avisos":
                var classCode = localStorage.getItem('lastCodAula');
                if(classCode != "" && classCode != undefined && classCode != null){
                    if(window.location.href !=  "http://www.edmundo.com/edmundo/html/avisos.html"){
                        window.location.href = "http://www.edmundo.com/edmundo/html/avisos.html";
                    }
                    let avisos = new HomeAvisos();
                }else{
                    enviarRuta('/');
                }
                break;
            case "/tareas":
            var classCode = localStorage.getItem('lastCodAula');
            var tarea = localStorage.getItem('tarea');
            if(classCode != "" && classCode != undefined && classCode != null && tarea != "" && tarea != undefined && tarea != null){
                if(window.location.href !=  "http://www.edmundo.com/edmundo/html/tareas.html"){
                    window.location.href = "http://www.edmundo.com/edmundo/html/tareas.html";
                }
                let tareas = new HomeTareas();
            }else{
                enviarRuta('/avisos');
            }
            break;
            default:
                //PAGINA DE ERROR
                break;
        }
    } else {

        
        if(email != "" && email != null && email != undefined){
            window.location.href = "http://www.edmundo.com/edmundo/html/notVerified.html";
        }else
        switch (ruta) {
            case "/":
                window.location.href = "http://www.edmundo.com/edmundo/html/login.php";
                break;
            case "/register":
                let register = new Register();
                break;
            default:
                //PAGINA DE ERROR
                enviarRuta('/');
                break;
        }

    }
}
