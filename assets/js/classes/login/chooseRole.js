//ELEGIR ENTRE ALUMNO Y PROFESOR
import { enviarRuta } from "../../router.js";

export class ChooseRole {
    //ROL DEL USUARIO
    // 0 = NO ASIGNADO
    // 1 = PROFESOR
    // 2 = ALUMNO
    // 3 = ADMINISTRADOR
    rol=0;
    email = localStorage.getItem('email');

    chooseRoleHTML = `<h1> ¿ERES PROFESOR O ESTUDIANTE? </h1>
    <button id="rolProfesor"> PROFESOR</button>
    <button id="rolEstudiante">ESTUDIANTE</button>`;

    constructor() {
        this.crearChooseRole();
    }

    crearChooseRole() {

        document.getElementById('body').innerHTML = this.chooseRoleHTML;

        document.getElementById('rolProfesor').addEventListener('click', () =>{
            this.rol = 1;
            this.BBDDcall();
        })
        document.getElementById('rolEstudiante').addEventListener('click', () => {
            this.rol = 2;
            this.BBDDcall();
        });
    }

    crea_query_string() {
        var obj = {"rol":this.rol, "email":this.email};
        var cadena = JSON.stringify(obj);
        return cadena;
    }

    BBDDcall(){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                console.log(this.responseText);
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    //document.getElementById('datos').innerHTML = "La contraseña o el usuario introducidos son incorrectos";
                    console.log("Fallo");
                }else{
                    //ENVIAR DATOS POR PANTALLA
                    // for(var atributo in datos){
                    //     let texto = atributo +"->" +datos[atributo]+"<br>";
                    //     
                    //     document.getElementById('datos').innerHTML +=texto;
                    // }
                    localStorage.setItem("rol", this.rol);
                    console.log(datos);
                    console.log("Completado");
                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','assets/php/chooseRole.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string();
        xmlhttp.send(cadena);
    }

}