export class Footer{
    footerHTML = `<!-- FOOTER -->
        <div class="copyright">Edmundo 2023</div>`;

        constructor(){
            document.getElementById('footer').innerHTML = this.footerHTML;
        }
}