
import { Post } from "./post.js"
import { Calendar } from "./calendar.js";
import { Aulas } from "./aulas.js";

export class MainHome{
    mainHTML = `<!-- MAIN -->
        <div class="row w-100">
                
            <!-- POSTS -->
            <div class="post-section col-xl-8 "); background-size:cover">
                
                <h1>Blog</h1>
                <div id="write-post-section" class="write-post-section">
                    <textarea name="" id="text-post" class="text-post form-control" placeholder="Haz un comentario a tu clase..."></textarea>
                    <div id="the-count">
                        <span id="current">0</span>
                        <span id="maximum">/ 300</span>
                    </div>
                    <button name="send" id="send-post" class="btn btn-primary">Enviar</button>
                </div>
                <div id="post-list" class="post-list container">
                    <!-- LISTA DE POSTS-->
                </div>
            </div>
            <!-- CALENDARIO -->
            <div class="col-xl-4">
                <h3>Mi Aula</h3>
                <div id="mainAula-section" class="aula-section w-100"></div>
                <h3>Tareas y Eventos</h3>
                <div class="calendar-section " id="calendar-section"></div>
            
            </div>
            
        </div>`;
    
    constructor(){
        document.getElementById('main').innerHTML = this.mainHTML;
        var aulas = new Aulas();
        var post = new Post();
        var calendar = new Calendar();
    }
}