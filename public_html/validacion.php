<?php
session_start();

//$_SESSION['ciudadOrigen'] = $_POST['ciudadOrigenSession'];
$date = $_POST['ciudadOrigenSession'];
echo $date->var;

$message = "Yep!";
echo "<script type='text/javascript'>alert('$message');</script>";