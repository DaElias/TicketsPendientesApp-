const path = require("path");
const fs = require("fs");

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimos4 = [];

    this.init();
  }

  get toJson() {
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimo4: this.ultimos4,
    };
  }

  init() {
    const { hoy, tickets, ultimo, ultimo4 } = require("../db/data.json");
    // console.log(data);
    if (hoy === this.hoy) {
      this.tickets = tickets;
      this.ultimo = ultimo;
      this.ultimos4 = ultimo4;
    } else {
      //otro dia
      this.guardarDb();
    }
  }
  //grabar datos en la db
  guardarDb() {
    const dbpath = path.join(__dirname, "../db/data.json");
    fs.writeFileSync(dbpath, JSON.stringify(this.toJson));
  }

  siguiente() {
    this.ultimo += 1;
    const ticket = new Ticket(this.ultimo, null);

    this.tickets.push(ticket);

    this.guardarDb();
    return "Ticket: " + ticket.numero;
  }

  atenderTicket(escritorio) {
    //No hay tickets

    if (this.tickets.length === 0) {
      return null;
    }
    // *remueve el primer elemento del array y lo retorna
    const ticket = this.tickets.shift();

    ticket.escritorio = escritorio;

    this.ultimos4.unshift(ticket); //añade elemento nuevo al array desde le incio

    if (this.ultimos4.length > 4) {
      // this.ultimos4 = this.ultimos4.filter((date, index) => {
      //   return index < 4;
      // });
      this.ultimos4.slice(-1, 1); //elimina el ultimo elemento del array
      // console.log(this.ultimos4);

      // const nuevosUltimos = [
      //   this.ultimos4[0],
      //   this.ultimos4[1],
      //   this.ultimos4[2],
      //   this.ultimos4[3],
      // ];
      // this.ultimos4 = nuevosUltimos;
    }
    this.guardarDb();

    return ticket;
  }

  tickesLenght() {
    return this.tickets.length;
  }
}

module.exports = TicketControl;
