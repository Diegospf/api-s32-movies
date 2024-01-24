// /backend/src/routes/mylistRoutes.js

const express = require('express');
const router = express.Router();
const mylistController = require('../controllers/mylistController');

// Rota para adicionar item à lista do usuário
router.post('/', mylistController.addItemToList);

// Rota para obter todos os itens da lista de um usuário
router.get('/:user_id', mylistController.getItemsByUser);

// Rota para remover item da lista do usuário
router.delete('/:user_id/:movie_id', mylistController.removeItemFromList);

// Rota para verificar se um filme está na lista de um usuário
router.get('/check/:user_id/:movie_id', mylistController.checkItemInList);

module.exports = router;
