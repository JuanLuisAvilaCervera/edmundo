



// Array of month names


// Function to generate the calendar


export class Calendar {
    date;
    day;
    year;
    currdate;
    month;

    prenexIcons;

    calendarHTML = `<div class="calendar-container">
<header class="calendar-header">
    <p class="calendar-current-date"></p>
    <div class="calendar-navigation">
        <span id="calendar-prev" class="material-symbols-rounded">
            chevron_left
        </span>
        <span id="calendar-next" class="material-symbols-rounded">
            chevron_right
        </span>
    </div>
</header>

<div class="calendar-body">
    <ul class="calendar-weekdays">
        <li>L</li>
        <li>M</li>
        <li>X</li>
        <li>J</li>
        <li>V</li>
        <li>S</li>
        <li>D</li>
    </ul>
    <ul class="calendar-dates"></ul>
</div>
</div>`;
    months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ];

    constructor() {

        document.getElementById('calendar-section').innerHTML = this.calendarHTML;
        this.currdate = document.querySelector(".calendar-current-date");
        this.date = new Date();
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.day = document.querySelector(".calendar-dates");
        this.prenexIcons = document.querySelectorAll(".calendar-navigation span");

        this.generate();
        

        // Attach a click event listener to each icon
        this.prenexIcons.forEach(icon => {

            // When an icon is clicked
            icon.addEventListener("click", () => {

                // Check if the icon is "calendar-prev"
                // or "calendar-next"
                this.month = icon.id === "calendar-prev" ? this.month - 1 : this.month + 1;

                // Check if the month is out of range
                if (this.month < 0 || this.month > 11) {

                    // Set the date to the first day of the 
                    // month with the new year
                    this.date = new Date(this.year, this.month, new Date().getDate());

                    // Set the year to the new year
                    this.year = this.date.getFullYear();

                    // Set the month to the new month
                    this.month = this.date.getMonth();
                }

                else {

                    // Set the date to the current date
                    this.date = new Date();
                }

                // Call the manipulate function to 
                // update the calendar display
                this.generate();
            });
        });

    }
    generate() {
        

        // Get the first day of the month
        let dayone = new Date(this.year, this.month, 1).getDay();
        if (dayone == 0) {
            dayone = 6;
        } else {
            dayone--;
        }

        // Get the last date of the month
        let lastdate = new Date(this.year, this.month + 1, 0).getDate();



        // Get the day of the last date of the month
        let dayend = new Date(this.year, this.month, lastdate).getDay();
        if (dayend == 0) {
            dayend = 6;
        } else {
            dayend--;
        }

        // Get the last date of the previous month
        let monthlastdate = new Date(this.year, this.month, 0).getDate();


        // Variable to store the generated calendar HTML
        let lit = "";

        // Loop to add the last dates of the previous month
        for (let i = dayone; i > 0; i--) {
            lit +=
                `<li class="inactive">${monthlastdate - i + 1}</li>`;
        }

        // Loop to add the dates of the current month
        for (let i = 1; i <= lastdate; i++) {

            // Check if the current date is today
            let isToday = i === this.date.getDate()
                && this.month === new Date().getMonth()
                && this.year === new Date().getFullYear()
                ? "active"
                : "";


            //Comprobamos si los meses y dias son menores a 10 y le ponemos un 0 delante para que coincida el formato
            var dayComplete;
            var monthComplete;
                if(i < 10){
                    dayComplete = "0"+i;
                }else{
                    dayComplete = i;
                }

                if(this.month < 10){
                    monthComplete = "0"+(this.month+1);
                }else{
                    monthComplete = this.month;
                }
            lit += `<li class="${isToday} ${this.year}-${monthComplete}-${dayComplete}">${i}</li>`;
        }

        // Loop to add the first dates of the next month
        for (let i = dayend; i < 6; i++) {
            lit += `<li class="inactive">${i - dayend + 1}</li>`
        }

        // Update the text of the current date element 
        // with the formatted current month and year
        this.currdate.innerText = `${this.months[this.month]} ${this.year}`;

        // update the HTML of the dates element 
        // with the generated calendar
        this.day.innerHTML = lit;

        

        this.markAvisos();
    }

    //FUNCION COLOREAR DIAS CON AVISOS

    markAvisos(){
        this.BBDDcall();
    }

    BBDDcall(){
    
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
            if(this.readyState==4 && this.status==200) {
                var datos = JSON.parse(this.responseText);
                if (datos == "") {
                    console.log("Fallo");

                }else{
                    // LISTAR DIAS EN LOS QUE HAY AVISOS
                    datos.forEach( aviso =>{
                        
                        var fechaYMD = aviso['fecha'].substr(0,10);
                        $("."+fechaYMD).addClass("fechaAviso");
                    })
                }

            }
        };
        //PAGINA ENVIO PHP
        xmlhttp.open('POST','/edmundo/assets/php/avisos/callavisos.php');
        xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        let cadena = this.crea_query_string();
        xmlhttp.send(cadena);
    }

    crea_query_string(){
        var obj = {
            "email": localStorage.getItem("email")
        }
        var cadena = JSON.stringify(obj);
        return cadena;
    }

}

