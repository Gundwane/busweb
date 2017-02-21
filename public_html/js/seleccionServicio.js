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
    
    $("#btnBuscar").on("click", function(){
        var ciudadOrigenEnviar = dropdownCaptura($("#btnDropdownOrigen1"));
        //var ciudadDestino = dropdownDestino.val();
        
        alert(ciudadOrigenEnviar);
    });
    
    dropdownCaptura = function (dropdown) {
        var ciudad;
        ciudad = dropdown.text();
        console.log("Ciudad: "+ciudad);
        return ciudad;
    };
    
    cantidadButacas = function () {
        var url='acciones.php?accion=getBus';
        
        $.ajax({
            url: url,
            method: 'get',
            dataType: 'json',
            success: function(data){
                var count = 0;
                for (var i = 0; i < data.length-1; i++) {
                    if (data[i] === 0) {
                        count++;  
                    }
                }
            },
            error: function(){
                console.log("Error gettin buses, yo");
            }
        });
    };
    
    llenarTabla = function(data){
        
        var html = "", tabla = $("#bodyTablaServicio");
                $.each(data, function (index, data) {
                    html += "<tr>" + 
                            "<td>Empresa X</td>" +
                            "<td><span id=infoIcon class='glyphicon glyphicon-info-sign'></span></td>" +
                            "<td>"+ data.calidadServicio +"</td>" +
                            "<td>"+ data.horarioSalida +"</td>" +
                            "<td></td>" +
                            "<td>"+ data.precio +"</td>" +
                            "<td></td>" +
                            "<td><span></td>" +
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
    
    tramo = function(){
        var url="acciones.php?accion=tramo";
        $.ajax({
            url: url,
            method: 'get',
            dataType: 'json',
            success: function(data){
                llenarTabla(data);
            },
            error: function(){
                console.log("Error getin tramo");
            }
        });
    };
    
    //pruebaArray();
    //tablaServicios();
    //cantidadButacas();
    tramo();
});

