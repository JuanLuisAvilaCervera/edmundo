import { Header } from "../mainstructure/header.js";
import { Footer } from "../mainstructure/footer.js";
import { MainMisAulas } from "./mainMisAulas.js";

export class HomeMisAulas{
    homeHTML = ``;
    constructor(){
        var body = document.getElementById('body');
        body.innerHTML = `<div class="header-secondary" id="header"></div>
        <div class="main body-login" id="main"></div>
        <div class="footer-secondary" id="footer"></div>`;

        var header = new Header();
        var main = new MainMisAulas();
        var footer = new Footer();
    }
}