// /backend/src/controllers/mylistController.js

const db = require('../db/database');
const MyListModel = require('../models/MyListModel');

// Criar item na lista do usuário
const addItemToList = (req, res) => {
  const { user_id, movie_id } = req.body;

  const stmt = db.prepare('INSERT INTO mylist (user_id, movie_id) VALUES (?, ?)');
  stmt.run(user_id, movie_id, function (err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao adicionar item à lista.' });
    }

    const itemId = this.lastID;
    const newItem = new MyListModel(itemId, user_id, movie_id);

    res.status(201).json(newItem);
  });

  stmt.finalize();
};

// Remover item da lista do usuário
const removeItemFromList = (req, res) => {
  const { user_id, movie_id } = req.params;

  db.run('DELETE FROM mylist WHERE user_id = ? AND movie_id = ?', [user_id, movie_id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao remover item da lista.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Item não encontrado na lista.' });
    }

    res.status(200).json({ message: 'Item removido com sucesso.' });
  });
};

// Obter todos os itens da lista de um usuário
const getItemsByUser = (req, res) => {
  const { user_id } = req.params;

  db.all('SELECT * FROM mylist WHERE user_id = ?', [user_id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao obter itens da lista.' });
    }

    const items = rows.map(row => new MyListModel(row.id, row.user_id, row.movie_id));
    res.status(200).json(items);
  });
};

const checkItemInList = (req, res) => {
  const { user_id, movie_id } = req.params;

  db.get('SELECT * FROM mylist WHERE user_id = ? AND movie_id = ?', [user_id, movie_id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao verificar item na lista.' });
    }

    if (row) {
      return res.status(200).json({ isInList: true });
    } else {
      return res.status(200).json({ isInList: false });
    }
  });
};

module.exports = { addItemToList, removeItemFromList, getItemsByUser, checkItemInList };
