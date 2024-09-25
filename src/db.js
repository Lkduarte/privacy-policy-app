const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
  )`);

  db.run(`CREATE TABLE consent_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    date TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);

  db.run(`CREATE TABLE termo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    message TEXT,
    link TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);
});

module.exports = db;
