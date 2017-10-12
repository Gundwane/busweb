$(function(){
  mensajeAlerta = function (titulo, mensaje) {
        $("#divDanger").fadeIn();
        $("#strongDanger").html(titulo);
        $("#spanDanger").html(mensaje);
  };

  $('#divDanger').on('click', function(){
    $("#divDanger").fadeOut();
  });
})
