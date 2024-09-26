const conn = require("../database");
const express = require("express");
const app = express();

// CREATE - AGGIUNGI UN PRODOTTO
app.post("/utenti", (req, res) => {
  const { id_utenti } = req.body;
  const { nome } = req.body;
  const { cognome } = req.body;
  const { email } = req.body;
  conn.query(
    "INSERT INTO utenti (id_utenti,nome,cognome,email) VALUES (?,?,?,?) ",
    [id_utenti, nome, cognome, email],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(201)
        .json({ id: result.insertId, id_ordini, data_inserimento });
    }
  );
});

// READ - Ottenere tutti gli utenti
app.get("/utenti", (req, res) => {
  conn.query("SELECT * FROM utenti", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// UPDATE - Aggiornare un utente
app.put("/utenti/:id", (req, res) => {
  const { nome, cognome, email } = req.body;
  conn.query(
    "UPDATE utenti SET nome = ?, cognome = ?, email = ? WHERE id_utenti = ?",
    [nome, cognome, email, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Utente aggiornato" });
    }
  );
});

// DELETE - Eliminare un utente
app.delete("/utenti/:id", (req, res) => {
  conn.query(
    "DELETE FROM utenti WHERE id_utenti = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Utente eliminato" });
    }
  );
});

module.exports = app;
