<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edmundo</title>

    <!-- JQUERY -->
    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/ui/1.13.3/jquery-ui.js"></script>
    <script src="../jquery-clock-timepicker.js"></script>
    <!-- BOOTSTRAP -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>

    <!-- CSS EXTERNO -->
    <link rel="stylesheet" href= "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.3/themes/base/jquery-ui.css">
    <!-- CSS -->
    <link rel="stylesheet" href="../assets/css/index.css">
    <link rel="stylesheet" href="../assets/css/login.css">
    <link rel="stylesheet" href="../assets/css/datepicker.css">

    <!-- JS -->
    <script src="../assets/js/classes/login/verRegistro.js" type="module"></script>
</head>
<body id="body" class="body-login">

<?php
require_once "../assets/php/BBDD/m_consultas.php";
if (isset($_GET["c"])){
    $correo = $_GET["c"];
    $consulta = select("usuario where email = '$correo'");

    if ($fi = $consulta->fetch(PDO::FETCH_ASSOC)){
        if ($fi["verificado"]==0){
            $campos = array('verificado' => 1);
            update("usuario", "email = '". $correo."'", $campos);
            $mensaje =  "Tu cuenta ha sido verificada con exito";
        }else{
            $mensaje =  "Esta cuenta ya fue verificada anteriormente";
        }
        
    }else{
        //DEVOLVER ERROR
        $mensaje =  "No existe un usuario con este email";
    }

    $bodyHTML = "<div class='box text-center rounded'>
    <div class='row mb-3'><h1>Edmundo</h1><h5>Verificación por correo electrónico</h5></div>
    <div class='row mb-3'><div class='col-12'>$mensaje</div></div>
    <div class='row'><a href='http://www.edmundo.com/edmundo' class='btn btn-primary'>Volver a inicio</a></div>
        
    </div>";
    echo $bodyHTML;
}

?>
    <!-- CONTENIDO DE LA PÁGINA -->
    <div class="footer-secondary" id="footer"><div class="copyright">Edmundo 2024</div></div>
</body>
</html>