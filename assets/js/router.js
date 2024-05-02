import { Home } from "./classes/home/home.js";
import { Login } from "./classes/login/login.js";
import { Register } from "./classes/login/register.js";
import { CorrectReg } from "./classes/login/correctReg.js";
import { ChooseClass } from "./classes/login/alumno/chooseClass.js";
import { CreateClass } from "./classes/login/profesor/createClass.js";
import { ChooseRole } from "./classes/login/chooseRole.js";

var indexHTML = "";
var body = document.getElementById('body');

export function enviarRuta(ruta) {
    var token = localStorage.getItem('email');
    if (token != "" && token != null && token != undefined) {
        switch (ruta) {
            case "/":
                
                //COMPROBAR QUE NO ESTAMOS EN LA PÁGINA, EVITA UN BUCLE
                if(window.location.href !=  "http://www.edmundo.com/edmundo/index.html"){
                    window.location.href = "http://www.edmundo.com/edmundo/index.html";
                }
                //COMPROBAR ROL
                let rol = localStorage.getItem('rol');
                var classCode = localStorage.getItem('lastCodAula');
                switch(rol){
                    //PROFESOR
                    case "1":
                        //COMPROBAR CLASE
                        
                        if(classCode != "" && classCode != undefined && classCode != null){
                            let home = new Home();
                        }else{
                            enviarRuta('/crearAula');
                        }
                        break;
                    //ALUMNO
                    case "2":
                        //COMPROBAR CLASE
                        if(classCode != "" && classCode != undefined && classCode != null){
                            var home = new Home();
                        }else{
                            enviarRuta('/chooseClass');
                        }
                        break;
                    //ADMIN
                    case "3":
                        break;
                    //ROL NO ASIGNADO
                    default:
                        enviarRuta('/chooseRole');
                        break;
                }
                
                break;
            case "/chooseClass":
                var chooseClass = new ChooseClass();
                break;
            case "/crearAula":
                var createClass = new CreateClass();
                break;
            case "/chooseRole":
                var chooseRole = new ChooseRole();
                break;
            case "/avisos":
                var classCode = localStorage.getItem('lastCodAula');
                if(classCode != "" && classCode != undefined && classCode != null){
                    window.location.href = "http://www.edmundo.com/edmundo/html/avisos.html";
                    
                }else{
                    enviarRuta('/');
                }
                break;
            default:
                //PAGINA DE ERROR
                break;
        }
    } else {
        switch (ruta) {
            case "/":
                let login = new Login();
                break;
            case "/register":
                let register = new Register();
                break;
            case "/correct_reg":
                let email = localStorage.getItem('email') || "";
                if (email != "" && email != undefined && email != null) {
                    let correctReg = new CorrectReg();
                } else {
                    enviarRuta('/');
                }
                break;
            default:
                //PAGINA DE ERROR
                break;
        }

    }
}
