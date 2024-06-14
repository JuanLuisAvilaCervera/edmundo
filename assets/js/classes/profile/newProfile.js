import { mainProfile } from "./mainprofile.js";
import { Footer } from "../mainstructure/footer.js";
import { Header } from "../mainstructure/header.js";


export class newProfile{
    homeHTML = ``;
    constructor(){
        var body = document.getElementById('body');
        body.innerHTML = `<div class="header-secondary" id="header"></div>
        <div class="main" id="main"></div>
        <div class="footer-secondary" id="footer"></div>`;

        $("#body").addClass('body-login');

        var header = new Header();
        var main = new mainProfile();
        var footer = new Footer();
    }
}