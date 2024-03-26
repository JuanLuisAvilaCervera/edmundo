//ELEGIR CLASE AL REGISTRARSE COMO ALUMNO
import { enviarRuta } from "../../router.js";

export class ChooseClass {
    correo = "";
    password = "";

    chooseClassHTML = `<h1> ELEGIR CLASE </h1>
    <input type="text" id="classCode" maxlength = 6>
    <button id="enviarCode">Unirse a Clase</button>`;

    constructor() {
        this.crearChooseClass();
    }

    crearChooseClass() {

        document.getElementById('body').innerHTML = this.chooseClassHTML;

        document.getElementById('classCode').addEventListener('input', () =>{
            this.comprobar();
        })
        document.getElementById('enviarCode').addEventListener('click', () => {
            let classCode = document.getElementById('classCode').value;
            if(classCode != "" && classCode.length == 6){
                localStorage.setItem('classCode', classCode);
                enviarRuta('/');
            }else{
                //ERROR
            }
            
        });
    }

    comprobar(){
        let charList = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 1 2 3 4 5 6 7 8 9 0';
        charList = charList.split(" ");
        let input = document.getElementById('classCode');
        let value = input.value;
        value = value.toUpperCase();
        for(let i = 0 ; i < value.length ; i++){
            if(!charList.includes(value[i])){
                value = value.replace(value[i] , "");
            }
        }
        input.value = value;
        
    }

}