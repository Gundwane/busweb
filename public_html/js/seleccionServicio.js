$(function(){
    var data = JSON.parse(sessionStorage.getItem('data'));
    var ciudadOrigen = data[0];
    var ciudadDestino = data[1];
    var fechaIda = data[2];
    var fechaVuelta = data[3];
    var radio = data[4];
    var dropdownOrigen = $("#dropdownCiudadesOrigen2");
    var dropdownDestino = $("#dropdownCiudadesDestino2");
    var botonDropdownOrigen = $("#btnDropdownOrigen2");
    var botonDropdownDestino = $("#btnDropdownDestino2");
    $('#btnDropdownOrigen2').html(ciudadOrigen);
    $('#btnDropdownDestino2').html(ciudadDestino);
    $('#datepickerOrigen2').val(fechaIda);
    $('#datepickerDestino2').val(fechaVuelta);
    
    mostrarCiudades(dropdownOrigen, dropdownDestino);
    
    $("#btnBuscarServicio").on("click", function(){
        var origen = botonDropdownOrigen.text();
        var destino = botonDropdownDestino.text();
        
        tituloTramo(origen, destino);
        enviarCiudades(origen, destino);
    });
    
    tituloTramo = function(origen, destino){
        $("#lblTramo").empty();
        $("#lblTramo").append("Desde: "+origen+" a "+destino);
    };
    
    enviarCiudades = function(origen, destino){
        var url = 'acciones.php?accion=getTramo';
        $.ajax({
            url: url,
            method: 'POST',
            dataType: 'json',
            data: {ciudadOrigen: origen, ciudadDestino: destino},
            success: function(data){
                llenarTabla(data);
            },
            error: function(){
                console.log('Error enviando ciudades');
            }
        });
    };
    
    cantidadButacas = function (data) {
        var count = 0;
        for (var i = 0; i < data.length - 1; i++) {
            if (data[i] == 0) {
                count++;
            }
        }
        return count;
    };
    
    llenarTabla = function (data) {
        var html = "", tabla = $("#bodyTablaServicio");
        var precioidavuelta;
        var butacas;
        
        tabla.empty();
        $.each(data, function (index, data) {
            butacas = cantidadButacas(data.arrayButacas);
            console.log("Butacas: "+butacas);
            
            if (radio == 2) {
                precioidavuelta = data.precio * 2;
            } else {
                precioidavuelta = "";
            }
            
            html += "<tr>" +
                    "<td>Empresa X</td>" +
                    "<td><span id=infoIcon class='glyphicon glyphicon-info-sign'></span></td>" +
                    "<td>" + data.calidadServicio + "</td>" +
                    "<td>" + data.horarioSalida + "</td>" +
                    "<td></td>" +
                    "<td>" + data.precio + "</td>" +
                    "<td>"+ precioidavuelta +"</td>" +
                    "<td>"+ butacas +"</td>" +
                    "</tr>";
        });

        tabla.append(html);
    };
    
    pruebaArray = function(){
        var matriz = [];
        
        for (i = 0; i < 4; i++) {
            matriz[i] = new Array(4);
        }
        
        matriz[0] = 0;
        matriz[1] = 1;
        matriz[2] = 1;
        matriz[3] = 0;
        
        console.log("Matriz: "+matriz);
        
        for (i = 0; i < matriz.length; i++) {
            console.log(matriz[i]);
            if (matriz[i] == 0) {
                console.log("HAY UN CERO WACHO HAY UN CEROOOOOOOOOOOOOOOOOOOOOO!");
            }else if(matriz[i] == 1){
                console.log("HAY UN UNO WACHO HAY UN UNOOOOOOOOOOOOOOOOOOOOOO!");
            }
        }
    };
    dropdownCaptura(dropdownOrigen, botonDropdownOrigen);
    dropdownCaptura(dropdownDestino, botonDropdownDestino);
    tituloTramo(ciudadOrigen, ciudadDestino);
    enviarCiudades(ciudadOrigen, ciudadDestino);
});

