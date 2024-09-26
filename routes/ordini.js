const conn = require("../database");
const express = require("express");
const app = express();

// CREATE - AGGIUNGI UN ORDINE
app.post("/ordini", (req, res) => {
  const { id_ordini } = req.body;
  const { data_inserimento } = req.body;
  conn.query(
    "INSERT INTO ordini (id_ordini,data_inserimento) VALUES (?,?) ",
    [id_ordini, data_inserimento],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(201)
        .json({ id: result.insertId, id_ordini, data_inserimento });
    }
  );
});

// READ- LEGGERE TUTTI GLI ORDINI CON PRODOTTI E UTENTI ASSOCIATI
app.get("/ordini", (req, res) => {
  const query = `
    SELECT o.id_ordini, o.data_inserimento, 
    GROUP_CONCAT(DISTINCT p.nome) AS prodotti, 
    GROUP_CONCAT(DISTINCT u.nome) AS utenti 
    FROM ordini o 
    LEFT JOIN ordini_prodotti op ON o.id_ordini = op.id_ordini 
    LEFT JOIN prodotti p ON op.id_prodotto = p.id_prodotto 
    LEFT JOIN ordine_utenti ou ON o.id_ordini = ou.id_ordini 
    LEFT JOIN utenti u ON ou.id_utente = u.id_utenti 
    GROUP BY o.id_ordini, o.data_inserimento
  `;

  conn.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// UPDATE - AGGIORNARE UN ORDINE
app.put("/ordini/:id", (req, res) => {
  const { id_ordini } = req.body;
  const { data_inserimento } = req.body;
  conn.query(
    "UPDATE ordini SET id_ordini = ? WHERE id_ordini = ?",
    [id_ordini, data_inserimento, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Ordine aggiornato" });
    }
  );
});

// DELETE - ELIMINARE UN ORDINE
app.delete("/ordini/:id", (req, res) => {
  conn.query(
    "DELETE FROM ordini where id_ordini = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Ordine eliminato" });
    }
  );
});

module.exports = app;
