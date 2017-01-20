/* global ciudad */

$(function(){
    var ciudades = JSON.parse(sessionStorage.getItem('ciudades'));
    var ciudadOrigen = ciudades[0];
    var ciudadDestino = ciudades[1];
    
    $('#btnDropdownOrigen2').html(ciudadOrigen);
    $('#btnDropdownDestino2').html(ciudadDestino);
});

