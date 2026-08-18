const express = require('express');
const { validateApiKey } = require('../middleware/auth');
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movieController');

const router = express.Router();

router.get('/', getAllMovies);
router.get('/search', getAllMovies);
router.get('/:id', getMovieById);

router.post('/', validateApiKey, createMovie);
router.put('/:id', validateApiKey, updateMovie);
router.delete('/:id', validateApiKey, deleteMovie);

module.exports = router;
