
import { Post } from "./post.js"
import { Calendar } from "./calendar.js";
import { Aulas } from "./aulas.js";

export class MainHome{
    mainHTML = `<!-- MAIN -->
        <div class="row w-100 main-row">
                
            <!-- POSTS -->
            <div class="post-section col-xl-8 "); background-size:cover">
                
                <h1>Blog</h1>
                <div id="write-post-section" class="write-post-section d-flex flex-row">
                    <textarea name="" id="text-post" class="text-post form-control" 
                    style="border-radius: 5px 0px 0px 5px" placeholder="Haz un comentario a tu clase..."></textarea>
                    
                    <button name="send" id="send-post" class="btn btn-secondary d-flex justify-content-center align-items-center" 
                    style="border-radius: 0px 5px 5px 0px"><ion-icon name="send-outline"></ion-icon></button>
                </div>
                <div id="the-count">
                    <span id="current">0</span>
                    <span id="maximum">/ 300</span>
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