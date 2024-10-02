const express = require('express');
const db = require('./db');
const router = express.Router();

// Registro de usuário
router.post('/register', (req, res) => {
  const { name, email } = req.body;
  const date = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  if (!name || !email) {
    return res.status(400).json({ message: "Nome e email são obrigatórios." });
  }

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    db.serialize(() => {
      db.run('BEGIN TRANSACTION');

      db.run(`INSERT INTO users (name, email) VALUES (?, ?)`, [name, email], function(err) {
        if (err) {
          db.run('ROLLBACK');
          return res.status(500).json({ error: err.message });
        }
        const userId = this.lastID;

        db.run(`INSERT INTO consent_history (user_id, date) VALUES (?, ?)`, [userId, date], (err) => {
          if (err) {
            db.run('ROLLBACK');
            return res.status(500).json({ error: err.message });
          }

          db.run('COMMIT', (err) => {
            if (err) {
              return res.status(500).json({ error: 'Erro ao confirmar a transação.' });
            }
            res.status(201).json({ id: userId, name, email });
          });
        });
      });
    });
  });
});

// Obter dados do usuário
router.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  console.log("Buscando usuário com ID:", userId); // Log para depuração
  db.get(`SELECT * FROM users WHERE id = ?`, [userId], (err, row) => {
    if (err) {
      console.error("Erro ao buscar usuário:", err.message); // Log para depuração
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Usuário não encontrado' }); // Se não encontrar o usuário
    }
    res.json(row);
  });
});

// Listar todos os usuários
router.get('/users', (req, res) => {
  db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Atualizar dados do usuário
router.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Nome e email são obrigatórios." });
  }

  db.run(`UPDATE users SET name = ?, email = ? WHERE id = ?`, [name, email, userId], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ id: userId, name, email });
  });
});

// Excluir usuário e seus dados associados
router.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  db.serialize(() => {
    db.run('BEGIN TRANSACTION');

    db.run(`DELETE FROM users WHERE id = ?`, [userId], (err) => {
      if (err) {
        db.run('ROLLBACK');
        return res.status(500).json({ error: err.message });
      }
      db.run(`DELETE FROM consent_history WHERE user_id = ?`, [userId], (err) => {
        if (err) {
          db.run('ROLLBACK');
          return res.status(500).json({ error: err.message });
        }
        db.run(`DELETE FROM termo WHERE user_id = ?`, [userId], (err) => {
          if (err) {
            db.run('ROLLBACK');
            return res.status(500).json({ error: err.message });
          }
          db.run('COMMIT', (err) => {
            if (err) {
              return res.status(500).json({ error: 'Erro ao confirmar a transação.' });
            }
            res.status(200).json({ message: 'Conta excluída com sucesso' });
          });
        });
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

// Criar termo de consentimento
router.post('/termo', (req, res) => {
  const { user_id, message, link } = req.body;

  if (!user_id || !message || !link) {
    return res.status(400).json({ message: "user_id, message e link são obrigatórios." });
  }

  db.run(`INSERT INTO termo (user_id, message, link) VALUES (?, ?, ?)`, [user_id, message, link], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, user_id, message, link });
  });
});

// Obter termos de consentimento
router.get('/users/:id/termo', (req, res) => {
  const userId = req.params.id;
  db.all(`SELECT * FROM termo WHERE user_id = ?`, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Aceitar novos termos
router.post('/aceitar-novos-termos', (req, res) => {
  const { user_id } = req.body; // Você pode usar um middleware para obter o ID do usuário autenticado

  if (!user_id) {
    return res.status(400).json({ message: "user_id é obrigatório." });
  }

  // Atualiza o estado de aceitação dos termos
  db.run(`UPDATE users SET acceptedTerms = true WHERE id = ?`, [user_id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Adiciona um novo registro no histórico de consentimento
    const date = new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    db.run(`INSERT INTO consent_history (user_id, date) VALUES (?, ?)`, [user_id, date], (err) => {
      if (err) {
        db.run('ROLLBACK');
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Termos aceitos com sucesso e histórico atualizado.' });
    });
  });
});

module.exports = router;