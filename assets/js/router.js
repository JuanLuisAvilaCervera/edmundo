import { Home } from "./classes/home/home.js";
import { Login } from "./classes/login/login.js";
import { Register } from "./classes/login/register.js";
import { CorrectReg } from "./classes/login/correctReg.js";
import { ChooseClass } from "./classes/login/chooseClass.js";
import { ChooseRole } from "./classes/login/chooseRole.js";

var indexHTML = "";
var body = document.getElementById('body');

export function enviarRuta(ruta) {
    var token = localStorage.getItem('email');
    if (token != "" && token != null && token != undefined) {
        switch (ruta) {
            case "/":
                //COMPROBAR ROL
                let rol = localStorage.getItem('rol');
                let classCode = localStorage.getItem('lastCodeAula');
                console.log("ROL: " + rol);
                switch(rol){
                    //PROFESOR
                    case "1":
                        //COMPROBAR CLASE
                        
                        if(classCode != "" && classCode != undefined && classCode != null){
                            let home = new Home();
                        }else{
                            //enviarRuta('/crearAula');
                        }
                        break;
                    //ALUMNO
                    case "2":
                        //COMPROBAR CLASE
                        if(classCode != "" && classCode != undefined && classCode != null){
                            let home = new Home();
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
                let chooseClass = new ChooseClass();
                break;
            case "/chooseRole":
                let chooseRole = new ChooseRole();
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
