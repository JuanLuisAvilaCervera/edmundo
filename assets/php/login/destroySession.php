<?php
session_start();
if (isset($_SESSION['token'])) {
    $client->revokeToken($_SESSION['token']);
    $client->revokeToken($_SESSION['token2']);
}
session_destroy();

echo json_encode("completado");

?>