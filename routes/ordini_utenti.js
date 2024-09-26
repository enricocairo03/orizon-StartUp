const conn = require("../database");
const express = require("express");
const app = express();

// CREATE - AGGIUNGI UN PRODOTTO
app.post("/ordine_utenti", (req, res) => {
  const { id_ordini, id_utente } = req.body;
  conn.query(
    "INSERT INTO ordine_utenti (id_ordini,id_utente) VALUES (?,?) ",
    [id_ordini, id_utente],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, id_ordini, id_utente });
    }
  );
});

// READ- LEGGERE TUTTI I PRODOTTI
app.get("/ordine_utenti", (req, res) => {
  conn.query("SELECT * FROM ordine_utenti", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// UPDATE- Aggiornare un prodotto
app.put("/ordine_utenti/:id", (req, res) => {
  const { id_ordini, id_utente } = req.body;
  conn.query(
    "UPDATE ordine_utenti SET id_utente = ? WHERE id_ordini = ?",
    [id_ordini, id_utente, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Ordine_utenti aggiornato" });
    }
  );
});

// DELETE - ELIMINARE UN PRODOTTO
app.delete("/ordine_utenti/:id", (req, res) => {
  conn.query(
    "DELETE FROM ordine_utenti where id_ordini = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Ordine_utenti eliminato" });
    }
  );
});

module.exports = app;
