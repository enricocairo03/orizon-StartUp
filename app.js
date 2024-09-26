const express = require("express");
const prodotti = require("./routes/prodotti");
const utenti = require("./routes/utenti");
const ordini = require("./routes/ordini");

const app = express();

// Middleware per il parsing JSON
app.use(express.json());

// Rotte CRUD
app.use(prodotti);
app.use(utenti);
app.use(ordini);

// Avvio del server
app.listen(3000, () => {
  console.log("Server in ascolto sulla porta 3000");
});
