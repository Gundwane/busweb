<?php
require './Querys.php';
$querys = new Querys();
$accion = $_GET['accion'];
$resultado = '';

switch ($accion){
    case 'ciudades':
       $resultado = $querys->ciudades();
    break;

    case 'tablaServicio':
        $resultado = $querys->tablaServicio();
        break;

    case 'getBus':
        $resultado = $querys->getBus();
        break;

    case 'getTramo':
        $resultado = $querys->getTramo();
        break;

    case 'getPrecio':
        $resultado = $querys->getPrecio();
        break;

    case 'getBusPorTramo':
        $resultado = $querys->getBusPorTramo();
        break;

    default:
        $resultado = "No se encontró la accion";
}

echo json_encode($resultado);
