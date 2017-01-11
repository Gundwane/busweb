$(function () {
    ciudadOrigen = "", ciudadDestino = "";                                           //Leí por ahí que cagan a pedo a la gente que usa variables globales. Yo todavía no le he encontrado la vuelta para este caso.
    
    var dropdownOrigen1 = $('#dropdownCiudadesOrigen');
    var btnDropdownOrigen1 = $("#btnDropdownOrigen");
    var dropdownDestino1 = $('#dropdownCiudadesDestino');
    var btnDropdownDestino1 = $("#btnDropdownDestino");
    var dropdownOrigen2 = $('#dropdownCiudadesOrigen2');
    var dropdownDestino2 = $('#dropdownCiudadesDestino2');
    
    dropdownCaptura = function (dropdown, boton, ciudad) {
        var ciudad="";
        
        dropdown.on('click', 'li', function () {
            ciudad = $(this).text();
            
            if (boton.hasClass("btn-danger")) {
                boton.switchClass("btn-danger", "btn-primary", 0);
                $("#divDanger").fadeOut();
            }
            boton.html(ciudad);
            return ciudad;
        });
    };
    
    /*$('#dropdownCiudadesOrigen').on('click', 'li', function () {                //Capturas de los Dropdown
        var btn = $("#btnDropdownOrigen");
        ciudadOrigen = $(this).text();

        if (btn.hasClass("btn-danger")) {
            btn.switchClass("btn-danger", "btn-primary", 0);
            $("#divDanger").fadeOut();
        }
        btn.html(ciudadOrigen);
    });

    $('#dropdownCiudadesDestino').on('click', 'li', function () {
        var btn = $("#btnDropdownDestino");
        ciudadDestino = $(this).text();

        if (btn.hasClass("btn-danger")) {
            btn.switchClass("btn-danger", "btn-primary", 0);
            $("#divDanger").fadeOut();
        }
        btn.html(ciudadDestino);
    });*/

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
            console.log("Submit!...!");
            
            window.location.replace('seleccionServicio.html');
            
        } else {
            console.log("Naaaaa ta re loco vo' amigo!");                        //Si no pues...no
        }
    });

    $('.datepicker').datepicker({                                               //Datepickers
        dateFormat: "dd-mm-yy",                                                 //Una funcioncita que encontré en interne'
        minDate: 0,                                                             //para tirar Datepickers re piola
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
        }else{
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
                //rellenarDropdownCiudades(data, dropdownOrigen2, dropdownDestino2);
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
    
    mensajeAlerta = function(titulo, mensaje){
        $("#divDanger").fadeIn();
        $("#strongDanger").html(titulo);
        $("#spanDanger").html(mensaje);
    };

    mostrarCiudades();
    ciudadOrigen = dropdownCaptura(dropdownOrigen1, btnDropdownOrigen1, ciudadOrigen);
    ciudadDestino = dropdownCaptura(dropdownDestino1, btnDropdownDestino1, ciudadDestino);
});


