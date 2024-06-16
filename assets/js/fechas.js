export function YMDtoDMY(fechaYMD){

    var fechaDMY = fechaYMD.substr(8,2)+"-"+fechaYMD.substr(5,2)+"-"+fechaYMD.substr(0,4)+ " "+fechaYMD.substr(11);
    return fechaDMY;
}

export function DMYtoYMD(fechaDMY){
    var fechaYMD = fechaDMY.substr(7,4)+"-"+fechaDMY.substr(4,2)+"-"+fechaDMY.substr(1,2) + " "+ fechaDMY.substr(12,5);
    return fechaYMD;
}