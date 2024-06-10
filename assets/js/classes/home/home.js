import { MainHome } from "./mainHome.js";
import { Footer } from "../mainstructure/footer.js";
import { Header } from "../mainstructure/header.js";
import { HeaderSecondary } from "../mainstructure/header-secondary.js";
import { NoAulaHome } from "./noAulaHome.js";


export class Home{
    homeHTML = ``;
    constructor(){
        var body = document.getElementById('body');
        var classCode = localStorage.getItem("lastCodAula");
        $("#body").removeClass('body-login');
            

        if(classCode != "" && classCode != undefined && classCode != null){
            body.innerHTML = `<div class="header" id="header"></div>
                <div class="main" id="main"></div>
                <div class="footer" id="footer"></div>`;
            var header = new Header();
            var main = new MainHome();
            var footer = new Footer();
        }else{
            body.innerHTML = `<div class="header-secondary" id="header"></div>
                <div class="main" id="main"></div>
                <div class="footer-secondary" id="footer"></div>`;
                $("#body").addClass('body-login');
            var header = new HeaderSecondary();
            var main = new NoAulaHome();
            var footer = new Footer();
        }

        
    }
}

