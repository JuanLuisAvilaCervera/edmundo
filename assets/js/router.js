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
                if(rol != 0){
                    //COMPROBAR CLASE
                    let classCode = localStorage.getItem('classCode');
                    if(classCode != "" && classCode != undefined && classCode != null){
                        let home = new Home();
                    }else{
                        enviarRuta('/chooseClass');
                    }
                }else{
                    enviarRuta('/chooseRole');
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
