import { enviarRuta } from "../../router.js";

export class CorrectReg {
    correo = "";
    password = "";

    correctHTML = `<h1> Registro Completado </h1>
    <p>Se ha registrado correctamente, ya puede loggearse <button id="volverLogin">Volver a Log In</button></p>`;

    constructor() {
        this.createCorrectReg();
    }

    createCorrectReg() {

        document.getElementById('body').innerHTML = this.correctHTML;

        document.getElementById('volverLogin').addEventListener('click', () => {
            enviarRuta('/');
        });
    }


}