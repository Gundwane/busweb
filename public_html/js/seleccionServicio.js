/* global ciudad */

$(function(){
    var ciudades = JSON.parse(sessionStorage.getItem('ciudades'));
    var ciudadOrigen = ciudades[0];
    var ciudadDestino = ciudades[1];
    var dropdownOrigen = $("#dropdownCiudadesOrigen2");
    var dropdownDestino = $("#dropdownCiudadesDestino2");
    
    $('#btnDropdownOrigen2').html(ciudadOrigen);
    $('#btnDropdownDestino2').html(ciudadDestino);
    
    mostrarCiudades(dropdownOrigen, dropdownDestino);
    
    
});

