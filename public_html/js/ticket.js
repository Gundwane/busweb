$(function(){
  $('#btnBuscar').click(function(){
    var url = 'acciones.php?accion=getTicket';
    var dni = $('#btnDni').text();
    var numeroDni = $('#txtNumero').val();
    var email = $('#txtEmail').val();

    $.ajax({
      url: url,
      method: 'POST',
      dataType: 'JSON',
      data: {numeroDni: numeroDni, email: email},
      success: function(data){
        console.log(data);
        if (data.length === 0) {
          mensajeAlerta(null, 'No podemos encontrar un ticket con esos datos. Revisalos!');
        }else {
          mostrarTicket(data);
        }
      },
      error: function(){

      }
    })
  });

  mostrarTicket = function(data){
    $('#tbody').empty();
    var id = 0, html = '';
    $.each(data, function(index, value){
      id++;
      html += "<div class='ticketDiv'>" +
        "<span id='nombresp'>Nombre:"+ value.pnombre +"</span><span id='apellidosp'>Apellido:"+ value.apellido +"</span><span id='dnisp'>Dni:"+ value.dni +"</span>" +
        "<span id='origensp'>De:"+ value.conombre +"</span><span id='destinosp'>A:"+ value.cdnombre +"</span><span id='horariosp'>A las:"+ value.horarioSalida +"</span>" +
        "<span id='costosp'>Costo:"+ value.precio +"</span><span id='butacasp'>Nº de butaca:"+ value.numeroButaca +"</span>" +
      "</div>";
      /*html += "<tr>" +
              "<td>"+ id +"</td>" +
              "<td>"+ value.pnombre +"</td>" +
              "<td>"+ value.apellido +"</td>" +
              "<td>"+ value.dni +"</td>" +
              "<td>"+ value.conombre +"</td>" +
              "<td>"+ value.cdnombre +"</td>" +
              "<td>"+ value.precio +"</td>" +
              "<td>"+ value.horarioSalida +"</td>" +
              "<td>"+ value.numeroButaca +"</td>" +
              "</tr>";*/
    });
    $('#ticketsDiv').append(html);
    //$('#tbody').append(html);
  }
})
