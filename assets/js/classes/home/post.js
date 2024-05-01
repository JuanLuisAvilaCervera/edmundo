import { enviarRuta } from "../../router.js";

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

    textareaPost = "";
    
    textPost = "";


    constructor() {


        //INICIO DE LA PÁGINA, LISTAR POSTS

        this.BBDDcallListPosts();

        this.textPost = document.getElementById('text-post');

        document.getElementById('send-post').addEventListener('click', () => {
            this.textareaPost = this.textPost.value;
            if (this.textareaPost != "") {

                // LLAMADA A BASE DE DATOS, 
                this.BBDDcallSendPost();


                this.textareaPost= "";
                this.textPost.value = "";
            }
            
        })

        this.textPost.addEventListener('input' , () =>{
            document.getElementById('current').innerHTML = this.textPost.value.length;
            if(this.textPost.value.length >= 300){
                this.textPost.value = this.textPost.value.substr(0,299);
                document.getElementById('current').innerHTML = 300;
            }
        })
    }


    crea_query_string_send() {
        // var obj = {"codAula": this.classCode , "email": localStorage.getItem("email")};
        var obj = {
            "text":this.textareaPost,
            "email": localStorage.getItem("email"),
            "codAula": localStorage.getItem("lastCodAula")
        }
        var cadena = JSON.stringify(obj);
        return cadena;
    }
    crea_query_string_list() {
        // var obj = {"codAula": this.classCode , "email": localStorage.getItem("email")};
        var obj = {
            "codAula": localStorage.getItem("lastCodAula")
        }
        var cadena = JSON.stringify(obj);
        return cadena;
    }

    BBDDcallSendPost(){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                var datos = JSON.parse(this.responseText);
                
                if (datos == "") {
                    console.log("Fallo");
                }else{
                    console.log(datos);
                    console.log("Completado");
                    //REFRESCAR PÁGINA
                    enviarRuta("/");
                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','assets/php/posts/sendPosts.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string_send();
        xmlhttp.send(cadena);
    }

    BBDDcallListPosts(){
        var postHTML = 
        `<div class="post" id="[ID]">
        <div class="main-post">
            <textarea class="form-control text-post" disabled>
                [CONTENIDO]
            </textarea>
        </div>
    </div>`;

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                console.log(this.responseText);
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    console.log("Fallo");

                }else{
                    console.log(datos);
                    console.log("completado");
                    var postList = document.getElementById('post-list');
                    datos.forEach(post => {
                        var newPost = postHTML;
                        newPost = newPost.replace('[CONTENIDO]' , post['texto'])
                                        .replace('[ID]', post['idPost']);
                        postList.innerHTML += newPost;
                    });
                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','assets/php/posts/callPosts.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string_list();
        xmlhttp.send(cadena);
    }
}
