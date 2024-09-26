const conn = require("../database");
const express = require("express");
const app = express();

// CREATE - AGGIUNGI UN PRODOTTO
app.post("/", (req, res) => {
  const { id_ordini, id_prodotto } = req.body;
  conn.query(
    "INSERT INTO ordine_prodotti (id_ordini,id_prodotto) VALUES (?,?) ",
    [id_ordini, id_prodotto],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, id_ordini, id_prodotto });
    }
  );
});

// READ- LEGGERE TUTTI I PRODOTTI
app.get("/ordini_prodotti", (req, res) => {
  conn.query("SELECT * FROM ordini_prodotti", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// UPDATE- Aggiornare un prodotto
app.put("/ordine_prodotti/:id", (req, res) => {
  const { id_ordini, id_prodotto } = req.body;
  conn.query(
    "UPDATE prodotti SET id_prodotto = ? WHERE id_ordini = ?",
    [id_prodotto, id_utente, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Ordine_prodotti aggiornato" });
    }
  );
});

// DELETE - ELIMINARE UN PRODOTTO
app.delete("/ordini_prodotti/:id", (req, res) => {
  conn.query(
    "DELETE FROM prodotti where id_ordini = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Ordini_prodotti eliminato" });
    }
  );
});

module.exports = app;
