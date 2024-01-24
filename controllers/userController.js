const db = require('../db/database');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

// Endpoint de login
const loginUser = (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao realizar o login.' });
    }

    if (!row) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // Gere um token de autenticação
    const token = jwt.sign({ userId: row.username, username: row.username }, 'seuSegredoDoToken', { expiresIn: '1h' });

    // Retorne o token
    res.status(200).json({ token: token });
  });
};

const getUserByUsername = (req, res) => {
  const { username } = req.params;

  db.get('SELECT username FROM user WHERE username = ?', [username], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao obter usuário.' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const user = new UserModel(row.username);
    res.status(200).json(user);
  });
};

const getAllUsers = (req, res) => {
  db.all('SELECT username FROM user', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao obter usuários.' });
    }

    const users = rows.map(row => new UserModel(row.username));
    res.status(200).json(users);
  });
};

module.exports = { loginUser, getUserByUsername, getAllUsers };
