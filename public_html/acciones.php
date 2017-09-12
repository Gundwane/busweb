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

    case 'condiciones':
        $resultado = $querys->getCondiciones();
        break;

    case 'precioTramo':
        $resultado = $querys->preciocalidad();
        break;

    case 'insertPasajero':
        $resultado = $querys->insertPasajero();
        break;

    case 'insertTitular':
        $resultado = $querys->insertTitular();
        break;

    case 'updateButacas':
        $resultado = $querys->updateButacas();
        break;

    case 'test':
        $resultado = $querys->getBus();
        break;

    case 'insertTicket':
        $resultado = $querys->insertTicket();
        break;

    default:
        $resultado = "No se encontró la accion";
}

echo json_encode($resultado);
