// /backend/src/routes/s32listRoutes.js

const express = require('express');
const router = express.Router();
const s32listController = require('../controllers/s32listController');

// Rota para adicionar filme à lista S32
router.post('/', s32listController.addMovieToList);

// Rota para obter todos os filmes da lista S32
router.get('/', s32listController.getAllMovies);

// Rota para remover filme da lista S32
router.delete('/:movie_id', s32listController.removeMovieFromList);

// Rota para verificar se um filme está na lista S32
router.get('/check/:movie_id', s32listController.checkMovieInList);

module.exports = router;
