export function enviarArchivos(tareaID) {
    let formTarea = document.querySelector('#formTarea');
    let archivo = new FormData(formTarea);

    let email = localStorage.getItem("email");
    archivo.append('ajax', 1);
    archivo.append("idTarea", tareaID);
    archivo.append("email", email)
    let xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            window.location.reload();
            let foto = JSON.parse(this.response);
            console.log(foto);
        }
        
    };
    xmlhttp.open('POST','../assets/php/archivos/subirTareas.php',true);
    xmlhttp.send(archivo);
}

export function enviarPerfil(){
    let formPerfil = document.querySelector('#formPerfil');
    let archivo = new FormData(formPerfil);

    let email = localStorage.getItem("email");
    archivo.append('ajax', 1);
    archivo.append("email", email)
    let xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            window.location.reload();
            let foto = JSON.parse(this.response);
            console.log(foto);
        }
        
    };
    xmlhttp.open('POST','../assets/php/archivos/subirPerfil.php',true);
    xmlhttp.send(archivo);

}

export function enviarClase(){
    let formPerfil = document.querySelector('#formClase');
    let archivo = new FormData(formPerfil);

    let codAula = localStorage.getItem("lastCodAula");
    archivo.append('ajax', 1);
    archivo.append("codAula", codAula)
    let xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            window.location.reload();
            let foto = JSON.parse(this.response);
            console.log(foto);
        }
        
    };
    xmlhttp.open('POST','../assets/php/archivos/subirClase.php',true);
    xmlhttp.send(archivo);
}