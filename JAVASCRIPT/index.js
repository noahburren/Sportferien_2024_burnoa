// index.js
const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "deinPasswort",
  database: "deineDatenbank",
});

db.connect((err) => {
  if (err) {
    console.error("Verbindung zur Datenbank fehlgeschlagen: " + err.stack);
    return;
  }
  console.log("Verbunden mit der MySQL-Datenbank als ID " + db.threadId);
});

app.get("/", (req, res) => {
  res.send("Hallo, dies ist dein Baseball Performance Tracker Backend!");
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
