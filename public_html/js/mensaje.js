$(function(){
  mensajeAlerta = function (titulo, mensaje) {
        $("#divDanger").fadeIn();
        $("#strongDanger").html(titulo);
        $("#spanDanger").html(mensaje);
    };
  $(document).click(function(){
    $("#divDanger").fadeOut();
  });
})
