<?php
set_time_limit(0);
/*Toda esta gilada la usé para crear un usuario. Podría haberlo puesto directamente en la base de datos, si...
...pero quería meterle un buen pass.*/

require './Conexion.php';
$db = new Conexion();
$conexion = $db->getConexion();

$password = $_POST["password"];
$name = $_POST["name"];
$pass = password_hash($password, PASSWORD_BCRYPT, array('cost' => 15));         //Funcion que te genera un password re pro loco

try {
    $query = "INSERT INTO usuarios (nick, password) VALUES (?, ?)";
    $statement = $conexion->prepare($query);
    $statement->bindParam(1, $name);
    $statement->bindParam(2, $pass);
    $statement->execute();

    echo "Usuario creado : )";
    //header("Location: login.html");
} catch (Exception $exc) {
    echo $exc->getTraceAsString();
}
