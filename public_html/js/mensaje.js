$(function(){
  mensajeAlerta = function (titulo, mensaje) {
    $("#divDanger").fadeIn().focus();
    $("#strongDanger").html(titulo);
    $("#spanDanger").html(mensaje);
  };

  $('#divDanger').on('click', function(){
    $("#divDanger").fadeOut();
  });
})
