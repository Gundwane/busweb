$(function(){
    var data = JSON.parse(sessionStorage.getItem('data'));
    var ciudadOrigen = data[0];
    var ciudadDestino = data[1];
    var fechaIda = data[2];
    var fechaVuelta = data[3];
    var radioIdaVuelta = data[4];
    var dropdownOrigen = $("#dropdownCiudadesOrigen2");
    var dropdownDestino = $("#dropdownCiudadesDestino2");
    var botonDropdownOrigen = $("#btnDropdownOrigen2");
    var botonDropdownDestino = $("#btnDropdownDestino2");
    $('#btnDropdownOrigen2').html(ciudadOrigen);
    $('#btnDropdownDestino2').html(ciudadDestino);
    $('#datepickerOrigen2').val(fechaIda);
    $('#datepickerDestino2').val(fechaVuelta);


    mostrarCiudades(dropdownOrigen, dropdownDestino);

    $("#btnBuscarServicio").on("click", function(event){
        event.preventDefault();
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
      var arrayCountButacas = new Object();
      var countSCSS = 0;
      var countSC = 0;
      var countC = 0;

        for (var i = 0; i < data.length; i++) {
            if (data[i] == 'SCSS') {
                countSCSS++;
            }else if (data[i] == 'SC') {
                countSC++;
            }else if (data[i] == 'C') {
                countC++;
            }
        }
        countSCSS > 0 ? arrayCountButacas["SemiSS"] = countSCSS : arrayCountButacas["SemiSS"] = null;
        countSC > 0 ? arrayCountButacas["SemiC"] = countSCSS : arrayCountButacas["SemiC"] = null;
        countC > 0 ? arrayCountButacas["Cama"] = countSCSS : arrayCountButacas["Cama"] = null;

        return arrayCountButacas;
    };

    getPrecios = function()
    {
      const deferred = $.Deferred();
      var url='acciones.php?accion=getPrecio';
      $.ajax({
        url: url,
        method: 'GET',
        async: false,
        success: function(data){
          deferred.resolve($.parseJSON(data));
        },
        error: function(){
          console.log("Error gettin the calidades");
        }
      })
      return deferred.promise();
    }

    llenarTabla = function (data) {
        var html = "", tabla = $("#bodyTablaServicio");
        var butacas;
        var precios, precioSS, precioSC, precioC;
        getPrecios().then(function(val){
          precios = val;
        });

        tabla.empty();
        $.each(data, function (index, value) {
            butacas = cantidadButacas(value.arrayAsientos);
            if ((precios[0].calidad === Object.keys(butacas)[0]) && (butacas["SemiSS"] != null)) {
              precioSS = value.precio;
            }else {
              precioSS = "";
            }

            if ((precios[1].calidad === Object.keys(butacas)[1]) && (butacas["SemiC"] != null)){
              precioSC = parseInt(value.precio) + parseInt(value.precio * (precios[1].multiplicador/100));
            }else {
              precioSC = "";
            }

            if ((precios[2].calidad === Object.keys(butacas)[2]) && (butacas["Cama"] != null)) {
              precioC = parseInt(value.precio) + parseInt(value.precio * (precios[2].multiplicador/100));
            }else {
              precioC = "";
            }

            html += "<tr>" +
                    "<td>" + value.nombreEmpresa + "</td>" +
                    "<td><span id=infoIcon class='glyphicon glyphicon-info-sign'></span></td>" +
                    "<td>" +
                      (butacas["SemiSS"] > 0 ? "Semicama sin servicio: " + butacas["SemiSS"] : "") + "<br>" +
                      (butacas["SemiC"] > 0 ? "Semicama con servicio: " + butacas["SemiC"] : "") + "<br>" +
                      (butacas["Cama"] > 0 ? "Cama: " + butacas["Cama"] : "") +
                    "</td>" +
                    "<td>" + value.horarioSalida + "</td>" +
                    "<td>" + value.horarioLlegada + "</td>" +
                    "<td>" +
                      (precioSS !== "" ? "$"+precioSS : "") + "<br>" +
                      (precioSC !== "" ? "$"+precioSC : "") + "<br>" +
                      (precioC !== "" ? "$"+precioC : "") +
                    "</td>" +
                    "<td>" +
                      ((radioIdaVuelta > 1) && (precioSS !== "") ? precioSS * 2 : "") + "<br>" +
                      ((radioIdaVuelta > 1) && (precioSC !== "") ? precioSC * 2 : "") + "<br>" +
                      ((radioIdaVuelta > 1) && (precioC !== "") ? precioC * 2 : "") +
                    "</td>" +
                    "</tr>";
        });

        tabla.append(html);
    };

    dropdownCaptura(dropdownOrigen, botonDropdownOrigen);
    dropdownCaptura(dropdownDestino, botonDropdownDestino);
    tituloTramo(ciudadOrigen, ciudadDestino);
    enviarCiudades(ciudadOrigen, ciudadDestino);
});
