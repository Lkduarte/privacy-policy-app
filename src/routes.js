const express = require('express');
const db = require('./db');
const router = express.Router();

// Registro de usuário
router.post('/register', (req, res) => {
  const { name, email } = req.body;
  const date = new Date().toISOString();
  db.run(`INSERT INTO users (name, email) VALUES (?, ?)`, [name, email], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const userId = this.lastID;
    db.run(`INSERT INTO consent_history (user_id, date) VALUES (?, ?)`, [userId, date], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: userId, name, email });
    });
  });
});

// Obter dados do usuário
router.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  db.get(`SELECT * FROM users WHERE id = ?`, [userId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

// Atualizar dados do usuário
router.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  db.run(`UPDATE users SET name = ?, email = ? WHERE id = ?`, [name, email, userId], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ id: userId, name, email });
  });
});

// Excluir usuário
router.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  db.run(`DELETE FROM users WHERE id = ?`, [userId], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    db.run(`DELETE FROM consent_history WHERE user_id = ?`, [userId], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      db.run(`DELETE FROM termo WHERE user_id = ?`, [userId], (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Conta excluída com sucesso' });
      });
    });
  });
});

// Obter histórico de consentimento
router.get('/users/:id/consent-history', (req, res) => {
  const userId = req.params.id;
  db.all(`SELECT * FROM consent_history WHERE user_id = ?`, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Obter notificações
router.get('/users/:id/termo', (req, res) => {
  const userId = req.params.id;
  db.all(`SELECT * FROM termo WHERE user_id = ?`, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;
