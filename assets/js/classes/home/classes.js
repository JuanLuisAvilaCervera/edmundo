
export class Classes{
    classesHTML = `<div class="container class-list" id="class-list">
    <div class="class-active" id="class-active">
        <div class="class-image"></div>
        <div> Hola, esto es una clase nueva</div>
    </div>
    </div>`;
    constructor(){
        document.getElementById('class-section').innerHTML = this.classesHTML;
    }
}