$(function () {
    var dropdownOrigen = $('#dropdownCiudadesOrigen');
    var btnDropdownOrigen = $("#btnDropdownOrigen");
    var dropdownDestino = $('#dropdownCiudadesDestino');
    var btnDropdownDestino = $("#btnDropdownDestino");
    var ciudadOrigen, ciudadDestino;
    var arraySession = [];

    dropdownCaptura = function (dropdown, boton) {
        var ciudad;
        dropdown.on('click', 'li', function () {
            ciudad = $(this).text();

            if (boton.hasClass("btn-danger")) {
                boton.switchClass("btn-danger", "btn-primary", 0);
                $("#divDanger").fadeOut();
            }
            boton.html(ciudad);
            if (dropdown === dropdownOrigen) {
               arraySession.splice(0,1,ciudad);
               ciudadOrigen = ciudad;
            }else {
               arraySession.splice(1,1,ciudad);
               ciudadDestino = ciudad;
            }
            return ciudad;
        });
    };

    $("#datepickerOrigen").on("click", function () {                            //Remover clases de inputs
        $(this).removeClass("redBorder");                                       //El Dropdown se pone en rojo cuando hay un error
        $("#divDanger").fadeOut();                                              //Estas dos funciones las vuelven a azul cuando clickeas
    });

    $("#datepickerDestino").on("click", function () {
        $(this).removeClass("redBorder");
        $("#divDanger").fadeOut();
    });

    $("#btnBuscar").click(function () {                                         //Boton Submit
        var inputFechaIda = new Date();
        var inputFechaVuelta = new Date();
        var fechaIda = $('#datepickerOrigen').val();
        var fechaVuelta = $('#datepickerDestino').val();
        var radioIdaVuelta = $("#divRadio input:radio:checked").val();
        inputFechaIda = $("#datepickerOrigen").datepicker("getDate");
        inputFechaVuelta = $("#datepickerDestino").datepicker("getDate");
        arraySession.splice(2, 1, fechaIda);
        arraySession.splice(3, 1, fechaVuelta);
        arraySession.splice(4, 1, radioIdaVuelta);

        var date30dias = new Date(new Date().setDate(new Date().getDate() + 30));
        date30dias.setHours(0, 0, 0, 0);

        if (validarCiudadOrigen() && validarCiudadDestino() && validarFechaIda(inputFechaIda, date30dias) && validarFechaVuelta(inputFechaVuelta, radioIdaVuelta)) {
            sessionStorage.setItem('data', JSON.stringify(arraySession));
            window.location.replace('seleccionServicio.html');
        } else {
            console.log("Error validar");
        }
    });

    $('.datepicker').datepicker({
        dateFormat: "dd-mm-yy",
        dateonly: true,
        minDate: 0,
        firstDay: 1,
        yearRange: '+0:+1',
        changeMonth: true,
        changeYear: true,
        dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
        dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        monthNames:
                ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
                    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthNamesShort:
                ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
                    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    });

    validarCiudadOrigen = function () {
        if (ciudadOrigen == null) {
            $("#btnDropdownOrigen").switchClass("btn-primary", "btn-danger", 200);
            var titulo = "Che!", mensaje = "Dejaste la ciudad de origen vacía";
            mensajeAlerta(titulo, mensaje);
            return false;
        } else {
            return true;
        }
    };

    validarCiudadDestino = function () {
        if (ciudadDestino == null) {
            $("#btnDropdownDestino").switchClass("btn-primary", "btn-danger", 200);
            var titulo = "Che!", mensaje = "La ciudad destino esta vacía :/";
            mensajeAlerta(titulo, mensaje);
            return false;
        } else {
            return true;
        }
    };

    validarFechaIda = function (fechaIda, fecha30dias) {
        if (fechaIda === null) {
            $("#datepickerOrigen").addClass("redBorder");
            var titulo = "Che!", mensaje = "Elegir fecha de salida";
            mensajeAlerta(titulo, mensaje);
            return false;
        } else if (+fechaIda > +fecha30dias) {
            var titulo = "Nope", mensaje = "No pueden pasar mas de 30 dias de la fecha de salida";
            mensajeAlerta(titulo, mensaje);
            return false;
        } else {
            return true;
        }
    };

    validarFechaVuelta = function (fechaVuelta, opcionRadio) {
        if (opcionRadio == 2) {
            if (fechaVuelta === null) {
                $("#datepickerDestino").addClass("redBorder");
                var titulo = "Che!", mensaje = "Poné fecha de vuelta";
                mensajeAlerta(titulo, mensaje);
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    };

    mostrarCiudades = function (dropdownOrigen, dropdownDestino) {
        var url = 'acciones.php?accion=ciudades';

        $.ajax({
            url: url,
            method: 'GET',
            success: function (data) {
                data = $.parseJSON(data);
                var html = "";

                $.each(data, function (index, data) {
                    html += '<li>' +
                            '<a>' + data.nombre + '</a>' +
                            '</li>';
                });

                dropdownOrigen.append(html);
                dropdownDestino.append(html);
            },
            error: function (data) {
                console.log("Error data");
                console.log(data);
            }
        });
    };

    rellenarDropdownCiudades = function (data, dropdownOrigen, dropdownDestino) {
        var html = "";

        $.each(data, function (index, data) {
            html += '<li>' +
                    '<a>' + data.nombre + '</a>' +
                    '</li>';
        });

        dropdownOrigen.append(html);
        dropdownDestino.append(html);
    };

    mensajeAlerta = function (titulo, mensaje) {
        $("#divDanger").fadeIn();
        $("#strongDanger").html(titulo);
        $("#spanDanger").html(mensaje);
    };

    mostrarCiudades(dropdownOrigen, dropdownDestino);
    dropdownCaptura(dropdownOrigen, btnDropdownOrigen);
    dropdownCaptura(dropdownDestino, btnDropdownDestino);
});
