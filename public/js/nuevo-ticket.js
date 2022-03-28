// referencias
const lblNuevoTicket = document.getElementById("lblNuevoTicket");
const btnCrear = document.getElementById("btnCrear");
const socket = io();

socket.on("connect", () => {
  btnCrear.disabled = false;
});

socket.on("disconnect", () => {
  btnCrear.disabled = true;
});

socket.on("ultimo-ticket", (ticketUltimo) => {
  //   console.log(ticketUltimo);
  lblNuevoTicket.innerText = "Ticket: " + ticketUltimo;
});

btnCrear.addEventListener("click", () => {
  socket.emit("siguiente-ticket", null, (ticket) => {
    // console.log("Desde el server", ticket);
    lblNuevoTicket.innerText = ticket;
  });



});
