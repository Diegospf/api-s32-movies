// /backend/src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rotas para usuários
router.get('/', userController.getAllUsers);
router.post('/login', userController.loginUser);
router.get('/:username', userController.getUserByUsername);
module.exports = router;