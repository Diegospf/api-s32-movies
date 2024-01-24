// /backend/src/controllers/weekController.js

const db = require('../db/database');
const WeekModel = require('../models/WeekModel');

// Criar semana com filmes
const createWeek = (req, res) => {
  const { name, movies, year, user_id } = req.body;

  const stmt = db.prepare('INSERT INTO week (name, movies, year, user_id) VALUES (?, ?, ?, ?)');
  stmt.run(name, movies, year, user_id, function (err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao criar semana com filmes.' });
    }

    const weekId = this.lastID;
    const newWeek = new WeekModel(weekId, name, movies, year, user_id);

    res.status(201).json(newWeek);
  });

  stmt.finalize();
};

// Obter todas as semanas com filmes
const getAllWeeks = (req, res) => {
  // Modifique a consulta SQL para incluir a cláusula ORDER BY
  db.all('SELECT * FROM week ORDER BY year DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao obter semanas com filmes.' });
    }

    const weeks = rows.map(row => new WeekModel(row.id, row.name, row.movies, row.year, row.user_id));
    res.status(200).json(weeks);
  });
};

// Obter semanas com filmes por username
const getWeeksByUsername = (req, res) => {
  const { username } = req.params;

  db.all(
    `SELECT w.*
     FROM week w
     INNER JOIN mylist ml ON w.id = ml.movie_id
     INNER JOIN user u ON ml.user_id = u.id
     WHERE u.username = ?`,
    [username],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao obter semanas com filmes por username.' });
      }

      const weeks = rows.map(row => new WeekModel(row.id, row.name, row.movies, row.year, row.user_id));
      res.status(200).json(weeks);
    }
  );
};

// Obter semanas com filmes por ano
const getWeeksByYear = (req, res) => {
  const { year } = req.params;

  db.all(
    `SELECT * FROM week WHERE year = ?`,
    [year],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao obter semanas com filmes por ano.' });
      }

      const weeks = rows.map(row => new WeekModel(row.id, row.name, row.movies, row.year, row.user_id));
      res.status(200).json(weeks);
    }
  );
};

const removeWeek = (req, res) => {
  const { week_id } = req.params;

  db.run('DELETE FROM week WHERE id = ?', [week_id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao remover semana com filmes.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Semana não encontrada.' });
    }

    res.status(200).json({ message: 'Semana removida com sucesso.' });
  });
};

module.exports = { createWeek, getAllWeeks, getWeeksByUsername, getWeeksByYear, removeWeek };
