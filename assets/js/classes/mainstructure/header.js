export class Header {
    headerHTML = `
    <div class="row">
        <!-- LOGO -->
        <div class="col-3">
            <img src="" alt="" style="width: 100px; height: 100px;">
        </div>
        <!--  MENU -->
        <div class="col-6 d-flex flex-row align-items-center">
            <div class="row">
                <div class="col-2">SAMPLE SECTION</div>
                <div class="col-2">SAMPLE SECTION</div>
                <div class="col-2">SAMPLE SECTION</div>
                <div class="col-2">SAMPLE SECTION</div>
                <div class="col-2">SAMPLE SECTION</div>
                <div class="col-2">SAMPLE SECTION</div>
            </div>
        </div>
        <div class="col-3">
            <button id="logOff">Cerrar Sesion</button>
        </div>

    </div>`;

    constructor(){
        document.getElementById('header').innerHTML = this.headerHTML;
        document.getElementById('logOff').addEventListener('click', () =>{
            localStorage.clear();
            window.location.reload();
        })
    }
}