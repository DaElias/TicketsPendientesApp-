//* Refencias
const lblEscritorio = document.getElementById("lblEscritorio");
const btnAtenderTicket = document.getElementById("btnAtenderTicket");
const smallAtender = document.getElementById("smallAtender");
const divAlerta = document.getElementById("divAlerta");
const lblPendientes = document.getElementById("lblPendientes");
//** Solo funciona en Chrome */
const serchParams = new URLSearchParams(window.location.search);
const socket = io();
divAlerta.style.display = "none";
// emitirTicketsFaltantes();

if (!serchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El campo Escritorio es importante!!");
}

const escritorio = serchParams.get("escritorio");
lblEscritorio.innerText = escritorio;

socket.on("connect", () => {
  btnAtenderTicket.disabled = false;
});

socket.on("disconnect", () => {
  btnAtenderTicket.disabled = true;
});

socket.on("ultimo-ticket", (ticketUltimo) => {
  //   console.log(ticketUltimo);
});

btnAtenderTicket.addEventListener("click", () => {
  // emitirTicketsFaltantes();
  if (lblPendientes.innerText != 0) {
    lblPendientes.innerText -= 1;
  }

  socket.emit("atender-ticket", { escritorio }, ({ ok, ticket, msg }) => {
    if (!ok) {
      smallAtender.innerText = "Nadie";
      return (divAlerta.style.display = "");
    }
    smallAtender.innerText = "Ticket " + ticket.numero;
  });
});

socket.on("tickets", (payload) => {
  if (payload == 0) {
    lblPendientes.innerText = "";
  } else {
    lblPendientes.innerText = payload;
  }
});

// function emitirTicketsFaltantes() {
//   socket.on("tickets", (payload) => {
//     if (payload == 0) {
//       lblPendientes.innerText = "";
//     } else {
//       lblPendientes.innerText = payload;
//     }
//   });
// }
