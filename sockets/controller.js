const TicketControl = require("../models/ticketControl");
const tickerControl = new TicketControl();

const socketController = (socket) => {
  // console.log(tickerControl.ultimo);
  socket.emit("ultimo-ticket", tickerControl.ultimo);

  socket.emit("tickets", tickerControl.tickesLenght());

  socket.on("siguiente-ticket", (payload, callback) => {
    const siguiente = tickerControl.siguiente();
    callback(siguiente);

    // TODO: Notificar hay un nuevo ticket de asignar
    socket.broadcast.emit("tickets", tickerControl.tickesLenght());


  });

  socket.on("atender-ticket", ({ escritorio }, callback) => {
    if (!escritorio) {
      return callback({
        ok: false,
        msg: "El escritorio es Obligatorio!!",
      });
    }
    const ticket = tickerControl.atenderTicket(escritorio);

    // TODO: Actualizar cambio den los ultimos 4
    socket.broadcast.emit("estado-actual", tickerControl.ultimos4);
    socket.broadcast.emit("tickets", tickerControl.tickesLenght());

    if (!ticket) {
      return callback({
        ok: false,
        msg: "No hay Tickets pendientes!!",
      });
    } else {
      return callback({
        ok: true,
        ticket,
      });
    }
  });
};

module.exports = {
  socketController,
};
