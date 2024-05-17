<?php
require_once "c:/xampp/htdocs/edmundo/vendor/autoload.php";

//Iniciar conf.
$clienteID = '57706156024-qjb9jctu619eavgmidvat70i3dkfd736.apps.googleusercontent.com';
$clientSecret = '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';
$redirectURI = 'http://www.edmundo.com/edmundo/assets/php/Login/oauth.php';

$client = new Google_Client();
$client->setClientId($clienteID);
$client->setClientSecret($clientSecret);
$client->setRedirectUri($redirectURI);
$client->addScope("email");
$client->addScope("profile");

if (isset($_POST['desconectar'])) {
	if (isset($_SESSION['token'])) {
		$client->revokeToken($_SESSION['token']);
		$client->revokeToken($_SESSION['token2']);
		session_destroy();
		header('Location: index.php');
	}
}

if (isset($_REQUEST['code'])) {

    //Pillar desde Google los datos necesarios
	$token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    print_r($token);
	$client->setAccessToken($token['access_token']);
	//conseguir info del perfil (es mediante objetos, -> para acceder a los atributos/métodos/etc...)
	$google_oauth = new Google_Service_OAuth2($client);
	$google_account_info = $google_oauth->userinfo->get();
	$email = $google_account_info->email;
	$name = $google_account_info->name;
	$nombre = $google_account_info->givenName;
	$apellidos = $google_account_info->familyName;
	$foto = $google_account_info->picture;

    //Mostrar info. del usuario loggeado
	// echo "Logueado" . "<br>";
	// echo "Correo: " . $email . "<br>";
	// echo "Nombre completo: " . $name . "<br>";
	// echo "Nombre: " . $nombre . "<br>";
	// echo "Apellidos: " . $apellidos . "<br>";
	// echo "<img src='" . $foto . "' alt='Foto'>";

    //Guardar en sesión los datos que nos ha dado la API OAuth 2.0 de Google
	$_SESSION['usuario'] = $email;
	$_SESSION['token'] = $token['access_token'];
	$_SESSION['token2'] = $client->getRefreshToken();
}else{
    // echo "<a href='".$client->createAuthUrl()."'>LOGIN IN GOOGLE</a> ";
    header( "Location: $client->createAuthUrl()" );
}

?>