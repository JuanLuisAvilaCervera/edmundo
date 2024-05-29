import { Login } from "./login.js";
import { enviarRuta } from "../../router.js";

var email = localStorage.getItem('email');
console.log(email);
if(email != "" && email != null && email != undefined){
    enviarRuta("/");
}else{
    var login = new Login();
}

