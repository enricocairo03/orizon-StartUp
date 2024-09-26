const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "orizon",
});

// Connessione al databse

conn.connect((err) => {
  if (err) {
    console.error("Errore di connesione al Database", err);
    throw err;
  }
  console.log("Connesione al Database eseguita");
});

module.exports = conn;
