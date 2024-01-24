// /backend/src/controllers/s32listController.js

const db = require('../db/database');
const S32ListModel = require('../models/S32ListModel');

// Adicionar filme à lista S32
const addMovieToList = (req, res) => {
  const { movie_id } = req.body;

  const stmt = db.prepare('INSERT INTO s32list (movie_id) VALUES (?)');
  stmt.run(movie_id, function (err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao adicionar filme à lista S32.' });
    }

    const listId = this.lastID;
    const newMovie = new S32ListModel(listId, movie_id);

    res.status(201).json(newMovie);
  });

  stmt.finalize();
};

// Obter todos os filmes da lista S32
const getAllMovies = (req, res) => {
  db.all('SELECT * FROM s32list', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao obter filmes da lista S32.' });
    }

    const movies = rows.map(row => new S32ListModel(row.id, row.movie_id));
    res.status(200).json(movies);
  });
};

// Remover filme da lista S32
const removeMovieFromList = (req, res) => {
  const { movie_id } = req.params;

  db.run('DELETE FROM s32list WHERE movie_id = ?', [movie_id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao remover filme da lista S32.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Filme não encontrado na lista S32.' });
    }

    res.status(200).json({ message: 'Filme removido com sucesso.' });
  });
};

// Verificar se um filme está na lista S32
const checkMovieInList = (req, res) => {
  const { movie_id } = req.params;

  db.get('SELECT * FROM s32list WHERE movie_id = ?', [movie_id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao verificar filme na lista S32.' });
    }

    if (row) {
      return res.status(200).json({ isInList: true });
    } else {
      return res.status(200).json({ isInList: false });
    }
  });
};

module.exports = { addMovieToList, getAllMovies, removeMovieFromList, checkMovieInList };
