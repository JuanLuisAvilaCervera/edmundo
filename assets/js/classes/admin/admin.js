import { enviarRuta } from "../../router.js";
import { Footer } from "../mainstructure/footer.js";
import { HeaderSecondary } from "../mainstructure/header-secondary.js";
import { MainAdmin } from "./mainAdmin.js";


    document.addEventListener('DOMContentLoaded', () => {
        if(localStorage.getItem("rol") == "3"){
            var body = document.getElementById('body');
            body.innerHTML = `<div class="header" id="header"></div>
            <div class="main" id="main"></div>
            <div class="footer" id="footer"></div>`;

            var header = new HeaderSecondary();
            var footer = new Footer();
            var admin = new MainAdmin();
        }else{
            enviarRuta("/");
        }
        
    })