$(function () {
    var dropdownOrigen1 = $('#dropdownCiudadesOrigen');
    var btnDropdownOrigen1 = $("#btnDropdownOrigen");
    var dropdownDestino1 = $('#dropdownCiudadesDestino');
    var btnDropdownDestino1 = $("#btnDropdownDestino");
    var array = [];

    dropdownCaptura = function (dropdown, boton) {
        var ciudad;
        dropdown.on('click', 'li', function () {
            ciudad = $(this).text();
            if (boton.hasClass("btn-danger")) {
                boton.switchClass("btn-danger", "btn-primary", 0);
                $("#divDanger").fadeOut();
            }
            boton.html(ciudad);
            if (dropdown === dropdownOrigen1) {
               array.splice(0,1,ciudad); 
            }else { 
               array.splice(1,1,ciudad);
            }
            sessionStorage.setItem('ciudades', JSON.stringify(array));
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
        var radioIdaVuelta = $("#divRadio input:radio:checked").val();
        inputFechaIda = $("#datepickerOrigen").datepicker("getDate");
        inputFechaVuelta = $("#datepickerDestino").datepicker("getDate");

        var date30dias = new Date(new Date().setDate(new Date().getDate() + 30));
        date30dias.setHours(0, 0, 0, 0);

        if (validarCiudadOrigen() && validarCiudadDestino() && validarFechaIda(inputFechaIda, date30dias) && validarFechaVuelta(inputFechaVuelta, radioIdaVuelta)) {
            console.log('Ciudad Origen: '+ciudadOrigen);
            window.location.replace('seleccionServicio.html');
        } else {
            console.log("Naaaaa ta re loco vo' amigo!");                        //Si no pues...no
        }
    });

    $('.datepicker').datepicker({//Datepickers
        dateFormat: "dd-mm-yy", //Una funcioncita que encontré en interne'
        minDate: 0, //para tirar Datepickers re piola
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
        if (ciudadOrigen === "") {
            $("#btnDropdownOrigen").switchClass("btn-primary", "btn-danger", 200);
            var titulo = "Che!", mensaje = "Dejaste la ciudad de origen vacía";
            mensajeAlerta(titulo, mensaje);
            return false;
        } else {
            return true;
        }
    };

    validarCiudadDestino = function () {
        if (ciudadDestino === "") {
            $("#btnDropdownDestino").switchClass("btn-primary", "btn-danger", 200);
            var titulo = "Che!", mensaje = "Dejaste la ciudad de destino vacía pelotudo";
            mensajeAlerta(titulo, mensaje);
            return false;
        } else {
            return true;
        }
    };

    validarFechaIda = function (fechaIda, fecha30dias) {
        if (fechaIda === null) {
            $("#datepickerOrigen").addClass("redBorder");
            var titulo = "Che!", mensaje = "Elegí fecha de salida gil";
            mensajeAlerta(titulo, mensaje);
            return false;
        } else if (+fechaIda > +fecha30dias) {
            var titulo = "Nope", mensaje = "No pueden pasar mas de 30 dias de la fecha de salida, compadre";
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
                var titulo = "Che!", mensaje = "Poné fecha de vuelta la concha de tu madre.";
                mensajeAlerta(titulo, mensaje);
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    };

    mostrarCiudades = function () {
        var url = 'acciones.php?accion=ciudades';

        $.ajax({
            url: url,
            method: 'GET',
            success: function (data) {
                data = $.parseJSON(data);
                rellenarDropdownCiudades(data, dropdownOrigen1, dropdownDestino1);
            },
            error: function (data) {
                console.log("Error in da data nigga");
                console.log(data);
            }
        });
    };

    rellenarDropdownCiudades = function (data, dropdownOrigen, dropdownDestino) {
        var html = "";

        $.each(data, function (index, data) {
            html += '<li>' +
                    '<a href="#">' + data.nombre + '</a>' +
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

    mostrarCiudades();
    dropdownCaptura(dropdownOrigen1, btnDropdownOrigen1);
    dropdownCaptura(dropdownDestino1, btnDropdownDestino1);
});


