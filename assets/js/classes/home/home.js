import { MainHome } from "./mainHome.js";
import { Footer } from "../mainstructure/footer.js";
import { Header } from "../mainstructure/header.js";


export class Home{
    homeHTML = ``;
    constructor(){
        var body = document.getElementById('body');
        body.innerHTML = `<div class="header" id="header"></div>
        <div class="main" id="main"></div>
        <div class="footer" id="footer"></div>`;

        var header = new Header();
        var main = new MainHome();
        var footer = new Footer();
    }
}

