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
        mostrarTicket(data);
      },
      error: function(){
        console.log('Error gettin da tickets');
      }
    })
  });

  mostrarTicket = function(data){
    $('#tbody').empty();
    var id = 0, html = '';
    $.each(data, function(index, value){
      id++;
      html += "<tr>" +
              "<td>"+ id +"</td>" +
              "<td>"+ value.pnombre +"</td>" +
              "<td>"+ value.apellido +"</td>" +
              "<td>"+ value.dni +"</td>" +
              "<td>"+ value.conombre +"</td>" +
              "<td>"+ value.cdnombre +"</td>" +
              "<td>"+ value.precio +"</td>" +
              "<td>"+ value.horarioSalida +"</td>" +
              "<td>"+ value.numeroButaca +"</td>" +
              "</tr>";
    });

    $('#tbody').append(html);
  }
})
