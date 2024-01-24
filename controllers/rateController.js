// /backend/src/controllers/rateController.js

const db = require('../db/database');
const RateModel = require('../models/RateModel');

// Avaliar um filme por um usuário
const rateMovie = (req, res) => {
  const { user_id, movie_id, rate } = req.body;

  // Verifica se já existe uma avaliação para esse usuário e filme
  db.get('SELECT * FROM rate WHERE user_id = ? AND movie_id = ?', [user_id, movie_id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao verificar a avaliação existente.' });
    }

    if (row) {
      // Se já existe, atualiza a avaliação
      db.run('UPDATE rate SET rate = ? WHERE user_id = ? AND movie_id = ?', [rate, user_id, movie_id], (updateErr) => {
        if (updateErr) {
          return res.status(500).json({ error: 'Erro ao atualizar a avaliação existente.' });
        }

        // Retorna a avaliação atualizada
        const updatedRating = { user_id, movie_id, rate };
        res.status(200).json(updatedRating);
      });
    } else {
      // Se não existe, cria uma nova avaliação
      db.run('INSERT INTO rate (user_id, movie_id, rate) VALUES (?, ?, ?)', [user_id, movie_id, rate], function (insertErr) {
        if (insertErr) {
          return res.status(500).json({ error: 'Erro ao criar uma nova avaliação.' });
        }

        // Retorna a nova avaliação
        const rateId = this.lastID;
        const newRating = { user_id, movie_id, rate };
        res.status(201).json(newRating);
      });
    }
  });
};

// Obter todas as avaliações de um usuário
const getRatingsByUser = (req, res) => {
  const { user_id } = req.params;

  db.all('SELECT * FROM rate WHERE user_id = ?', [user_id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao obter avaliações.' });
    }

    const ratings = rows.map(row => new RateModel(row.id, row.user_id, row.movie_id, row.rate));
    res.status(200).json(ratings);
  });
};

// Obter a avaliação de um filme por um usuário
const getRatingByMovieAndUser = (req, res) => {
  const { user_id, movie_id } = req.params;

  db.get('SELECT * FROM rate WHERE user_id = ? AND movie_id = ?', [user_id, movie_id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao obter avaliação do filme.' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Avaliação não encontrada.' });
    }

    const rating = new RateModel(row.id, row.user_id, row.movie_id, row.rate);
    res.status(200).json(rating);
  });
};

// Obter todas as avaliações de um filme
const getRatingsByMovie = (req, res) => {
  const { movie_id } = req.params;

  db.all('SELECT * FROM rate WHERE movie_id = ?', [movie_id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao obter avaliações do filme.' });
    }

    const ratings = rows.map(row => new RateModel(row.id, row.user_id, row.movie_id, row.rate));
    res.status(200).json(ratings);
  });
};

module.exports = { rateMovie, getRatingsByUser, getRatingByMovieAndUser, getRatingsByMovie };
