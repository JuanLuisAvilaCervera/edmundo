import { enviarRuta } from "../../router.js";
import { Footer } from "../mainstructure/footer.js";
import { Header } from "../mainstructure/header.js";
import { MainAvisos } from "./mainAvisos.js";


    document.addEventListener('DOMContentLoaded', () => {
        var body = document.getElementById('body');
        body.innerHTML = `<div class="header" id="header"></div>
        <div class="main" id="main"></div>
        <div class="footer" id="footer"></div>`;

        var header = new Header();
        var footer = new Footer();
        var avisos = new MainAvisos();
    })