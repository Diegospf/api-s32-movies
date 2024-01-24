// /backend/src/routes/weekRoutes.js

const express = require('express');
const router = express.Router();
const weekController = require('../controllers/weekController');

// Rotas para semanas com filmes
router.post('/', weekController.createWeek);
router.get('/', weekController.getAllWeeks);
router.get('/:username', weekController.getWeeksByUsername);
router.get('/year/:year', weekController.getWeeksByYear);
router.delete('/:week_id', weekController.removeWeek);

module.exports = router;
