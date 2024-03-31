
//ATTACHED PREVIEW TO FILES
{/*
<div class="attached-preview-list">
    <div class="attached-preview">
        <div class="attached-preview-image">
            <img src="" alt="">
        </div>
        <div class="attached-preview-text">
        </div>
    </div>
</div>
*/}


//COMMENTS
{/* 
<div class="comment-section">
    <div class="comment-list">
        <div class="comment"></div>
    </div>
</div>
*/}


export class Post {
    postList = [];

    postHTML = `
<div class="post" id="[ID]">
    <div class="main-post">
        <textarea class="form-control text-post" disabled>
            [CONTENIDO]
        </textarea>
    </div>
</div>`;

    constructor() {
        var postListDiv = document.getElementById('post-list');
        var textPost = document.getElementById('text-post');

        document.getElementById('send-post').addEventListener('click', () => {
            var textareaPost = document.getElementById('text-post');
            var newPost = this.postHTML;
            if (textareaPost.value != "") {
                newPost = newPost.replace('[CONTENIDO]' , textareaPost.value);

                // LLAMADA A BASE DE DATOS, 
                this.BBDDcallSendPost();


                // this.postList.push(newPost);
                // postListDiv.innerHTML = "";
                // this.postList.forEach( post =>{
                //     postListDiv.innerHTML += post;
                // });
            }
            textareaPost.value = "";
        })

        textPost.addEventListener('input' , () =>{
            document.getElementById('current').innerHTML = textPost.value.length;
            if(textPost.value.length >= 300){
                textPost.value = textPost.value.substr(0,299);
                document.getElementById('current').innerHTML = 300;
            }
        })
    }

    crea_query_string() {
        var obj = {"codAula": this.classCode , "email": localStorage.getItem("email")};
        var cadena = JSON.stringify(obj);
        return cadena;
    }

    BBDDcallSendPost(){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                console.log(this.responseText);
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    //document.getElementById('datos').innerHTML = "La contraseña o el usuario introducidos son incorrectos";
                    console.log("Fallo");
                }else{
                    console.log(datos);
                    console.log("Completado");
                    localStorage.setItem("lastCodAula", this.classCode);
                    enviarRuta('/');
                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','assets/php/posts/classCode.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string();
        xmlhttp.send(cadena);
    }
}
