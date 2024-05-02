

export class newAviso{

    newAvisoButtonHTML = `
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newAviso">
    Añadir Evento
    </button>

    <!-- Modal -->
    <div class="modal fade" id="newAviso" tabindex="-1" aria-labelledby="newAvisoLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="newAvisoLabel">Añadir nuevo evento</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            ...
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" id="confirmar">Confirmar</button>
        </div>
        </div>
    </div>
    </div>
    `;

    constructor(){
        document.getElementById("anadir-aviso-section").innerHTML = this.newAvisoButtonHTML;

    }
}