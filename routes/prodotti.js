const conn = require("../database");
const express = require("express");
const app = express();

// CREATE - AGGIUNGI UN PRODOTTO
app.post("/prodotti", (req, res) => {
  const { id_prodotto } = req.body;
  const { nome } = req.body;
  conn.query(
    "INSERT INTO prodotti (id_prodotto,nome) VALUES (?,?) ",
    [id_prodotto, nome],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, id_prodotto, nome });
    }
  );
});

// READ- LEGGERE TUTTI I PRODOTTI
app.get("/prodotti", (req, res) => {
  conn.query("SELECT * FROM prodotti", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// UPDATE- Aggiornare un prodotto
app.put("/prodotti/:id_prodotto", (req, res) => {
  const { id_prodotto } = req.body;
  const { nome } = req.body;
  conn.query(
    "UPDATE prodotti SET nome = ? WHERE id_prodotto = ?",
    [id_prodotto, nome, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Prodotto aggiornato" });
    }
  );
});

// DELETE - ELIMINARE UN PRODOTTO
app.delete("/prodotti/:id_prodotto", (req, res) => {
  conn.query(
    "DELETE FROM prodotti where id_prodotto = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Prodotto eliminato" });
    }
  );
});

module.exports = app;
