import { MainAvisos } from "./mainAvisos.js";
import { Footer } from "../mainstructure/footer.js";
import { Header } from "../mainstructure/header.js";


export class HomeAvisos{
    homeHTML = ``;
    constructor(){
        var body = document.getElementById('body');
        body.innerHTML = `<div class="header-secondary" id="header"></div>
        <div class="main body-login" id="main"></div>
        <div class="footer-secondary" id="footer"></div>`;

        var header = new Header();
        var main = new MainAvisos();
        var footer = new Footer();
    }
}