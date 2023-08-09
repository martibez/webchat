function bloquearTrocaUser() {
  // Função para bloquear ou habilitar o campo de entrada com base em seu valor
  const input = document.getElementById("usuario");
  input.disabled = input.value !== "";
}

$(document).ready(function () {
  bloquearTrocaUser(); // Bloquear ou habilitar o campo de entrada com base em seu valor

  var socket = io("192.168.5.156:5000"); // Criar uma conexão de socket com o servidor

  socket.on("connect", function () {
    // Quando o socket se conecta ao servidor
  });

  socket.on("message", function (data) {
    $("#chat-container").append($("<p>").text(data)); // Anexar a mensagem recebida ao contêiner de bate-papo
    $("#chat-container").scrollTop($("#chat-container")[0].scrollHeight); // Rolagem até a parte inferior do contêiner de bate-papo para mostrar a mensagem mais recente
  });

  $("#botao").on("click", function () {
    // Criar uma mensagem com os valores de entrada do usuário, enviar a mensagem quando o botão é clicado e limpar após envio
    var message = $("#usuario").val() + ": " + $("#mensagem").val();
    socket.send(message);
    $("#mensagem").val("");
  });

  $("#mensagem").on("keypress", function (event) {
    // Criar uma mensagem com os valores de entrada do usuário e da mensagem e quando uma tecla Enter for pressionada, enviar a mensagem para o servidor
    if (event.key === "Enter") {
      var message = $("#usuario").val() + ": " + $("#mensagem").val();
      socket.send(message);
      $("#mensagem").val("");
    }
  });
});
