<?php
set_time_limit(0);

require './Conexion.php';
$db = new Conexion();
$conexion = $db->getConexion();

$password = $_POST["password"];
$name = $_POST["name"];
$pass = password_hash($password, PASSWORD_BCRYPT, array('cost' => 15));

try {
    $query = "INSERT INTO usuarios (nick, password) VALUES (?, ?)";
    $statement = $conexion->prepare($query);
    $statement->bindParam(1, $name);
    $statement->bindParam(2, $pass);
    $statement->execute();

    header("Location: userCreado.html");
} catch (Exception $exc) {
    echo $exc->getTraceAsString();
}
