const express = require('express');
const router = express.Router();
const rateController = require('../controllers/rateController');

router.post('/', rateController.rateMovie);
router.get('/:user_id', rateController.getRatingsByUser);
router.get('/movie/:movie_id', rateController.getRatingsByMovie);
router.get('/:user_id/:movie_id', rateController.getRatingByMovieAndUser);

module.exports = router;
