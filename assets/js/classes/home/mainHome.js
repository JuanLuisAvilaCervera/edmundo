
import { Post } from "./post.js"
import { Calendar } from "./calendar.js";
import { Aulas } from "./aulas.js";

export class MainHome{
    mainHTML = `<!-- MAIN -->
        <div class="row">
            <!-- CLASES -->
            <div id="aula-section" class="aula-section col-xl-3">

            </div>
            <!-- POSTS -->
            <div class="post-section col-xl-6">
                <!-- PLANTILLA POST + COMENTARIO-->
                <div class="post-selection">
                    <div class="post-selection-buttons">
                        <button class="btn btn-secondary">Más Recientes</button>
                        <button class="btn btn-secondary">Más Antiguos</button>
                        <button class="btn btn-secondary">Favoritos</button>
                    </div>
                    <div class="post-selection-hr"></div>
                </div>
                <div id="write-post-section" class="write-post-section">
                    <textarea name="" id="text-post" class="text-post form-control" placeholder="Haz un comentario a tu clase..."></textarea>
                    <div id="the-count">
                        <span id="current">0</span>
                        <span id="maximum">/ 300</span>
                    </div>
                    <button name="send" id="send-post" class="btn btn-primary">Confirmar</button>
                </div>
                <div id="post-list" class="post-list">
                    <!-- LISTA DE POSTS-->
                </div>
            </div>
            <!-- CALENDARIO -->
            <div class="calendar-section col-xl-3" id="calendar-section"></div>
        </div>`;
    
    constructor(){
        document.getElementById('main').innerHTML = this.mainHTML;
        var aulas = new Aulas();
        var post = new Post();
        var calendar = new Calendar();
    }
}