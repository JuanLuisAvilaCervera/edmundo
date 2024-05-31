
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
    <link rel="stylesheet" href="../assets/css/datepicker.css">

    
    
</head>
<body id="body" class="body">
    <!-- CONTENIDO DE LA PÁGINA -->
    <!-- <div id="registroGoogle"> -->
    <?php
require_once "../vendor/autoload.php";
require_once "../assets/php/BBDD/m_consultas.php";
require_once "../assets/php/archivos/subirPerfiles.php";
require_once "../assets/php/correo/modelo.php";

//Iniciar conf.
$clienteID = '57706156024-qjb9jctu619eavgmidvat70i3dkfd736.apps.googleusercontent.com';
$clientSecret = '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';
$redirectURI = 'http://www.edmundo.com/edmundo/html/login.php';

$client = new Google_Client();
$client->setClientId($clienteID);
$client->setClientSecret($clientSecret);
$client->setRedirectUri($redirectURI);
$client->addScope("email");
$client->addScope("profile");

if (isset($_POST['desconectar'])) {
    session_start();
    echo "Desconectado";
    unset($_REQUEST['code']);
    unset($_SESSION['token']);
    unset($_SESSION['userData']);
    $client->revokeToken($_SESSION['token']);
    $client->revokeToken($_SESSION['token2']);
    $client->revokeToken($_SESSION['userData']);
    session_destroy();
    header('Location: login.php');

}

if (isset($_REQUEST['code'])) {

    //Pillar desde Google los datos necesarios
	$token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
	$client->setAccessToken($token['access_token']);
	//conseguir info del perfil (es mediante objetos, -> para acceder a los atributos/métodos/etc...)
	$google_oauth = new Google_Service_OAuth2($client);
	$google_account_info = $google_oauth->userinfo->get();
	$email = $google_account_info->email;
	$name = $google_account_info->name;
	$nombre = $google_account_info->givenName;
	$apellidos = $google_account_info->familyName;
	$foto = $google_account_info->picture;

    $consulta = select("usuario where email = '".$email."'");
    if($fi = $consulta->fetch(PDO::FETCH_ASSOC)){
            //Añadir a localStorage

            echo "<script>
            localStorage.setItem('verified','".$fi['verificado']."');
            localStorage.setItem('rol', '".$fi['rol']."');
            localStorage.setItem('lastCodAula', '".$fi['lastCodAula']."');
            localStorage.setItem('solicitud', '".$fi['solicitud']."');
            </script>";
            
    }else{
        $campos = array();
        array_push( $campos,0, $nombre, $apellidos , $email,  "",0, "",0,$foto,0);
        $consulta2 = insert("usuario", $campos);
        if($consulta2 == 1){
              subirPerfil($foto);
        }
        

        $message = "Este correo sirve para que valides tu cuenta de correo electronico 
                  <br> para validarlo pincha en el siguiente enlace:
                  <br> <a href='http://www.edmundo.com/edmundo/html/verRegistro.php?c=$email'>http://www.edmundo.com/edmundo/html/verRegistro.php</a>";
        (mandaCorreo($email, $message));
    
    }
    echo "<script>
        localStorage.setItem('email','".$email."');
        </script>";


    //Mostrar info. del usuario loggeado
	// echo "Logueado" . "<br>";
	// echo "Correo: " . $email . "<br>";
	// echo "Nombre completo: " . $name . "<br>";
	// echo "Nombre: " . $nombre . "<br>";
	// echo "Apellidos: " . $apellidos . "<br>";
	// echo "<img src='" . $foto . "' alt='Foto'>";
    // echo "<form action='' method='post'><input type='submit' class='desconectar' name='desconectar' id='desconectar'/></form>";
    


    // //Guardar en sesión los datos que nos ha dado la API OAuth 2.0 de Google
	$_SESSION['usuario'] = $email;
	$_SESSION['token'] = $token['access_token'];
	$_SESSION['token2'] = $client->getRefreshToken();

}else{
    echo "<a href='".$client->createAuthUrl()."' id='botonLogin'>LOGIN IN GOOGLE</a> ";
    // header( "Location: $client->createAuthUrl()" );
}

?>
<!-- JS -->
<script src="http://www.edmundo.com/edmundo/assets/js/classes/login/crearLogin.js" type="module"></script>
</body>
</html>