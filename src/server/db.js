const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    acceptedTerms BOOLEAN DEFAULT true
  )`, (err) => {
    if (err) {
      console.error("Erro ao criar tabela users:", err.message);
    }
  });

  db.run(`CREATE TABLE IF NOT EXISTS consent_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    date TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`, (err) => {
    if (err) {
      console.error("Erro ao criar tabela consent_history:", err.message);
    }
  });

  db.run(`CREATE TABLE IF NOT EXISTS termo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    message TEXT,
    link TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`, (err) => {
    if (err) {
      console.error("Erro ao criar tabela termo:", err.message);
    }
  });
});

module.exports = db;
