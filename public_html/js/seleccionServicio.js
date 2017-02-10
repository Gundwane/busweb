/* global ciudad */

$(function(){
    var data = JSON.parse(sessionStorage.getItem('data'));
    var ciudadOrigen = data[0];
    var ciudadDestino = data[1];
    var fechaIda = data[2];
    var fechaVuelta = data[3];
    var dropdownOrigen = $("#dropdownCiudadesOrigen2");
    var dropdownDestino = $("#dropdownCiudadesDestino2");
    $('#btnDropdownOrigen2').html(ciudadOrigen);
    $('#btnDropdownDestino2').html(ciudadDestino);
    $('#datepickerOrigen2').val(fechaIda);
    $('#datepickerDestino2').val(fechaVuelta);
    
    mostrarCiudades(dropdownOrigen, dropdownDestino);
    
    $("#lblTramo").append("Desde: "+ciudadOrigen+" a "+ciudadDestino);
    
    
});

