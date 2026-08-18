const movies = [
  {
    id: 1,
    title: 'Inception',
    genre: ['Sci-Fi', 'Action'],
    year: 2010,
    rating: 8.8,
    director: 'Christopher Nolan',
    description: 'A thief steals information by entering dreams.'
  },
  {
    id: 2,
    title: 'The Matrix',
    genre: ['Sci-Fi', 'Action'],
    year: 1999,
    rating: 8.7,
    director: 'The Wachowskis',
    description: 'A hacker learns the truth about reality.'
  }
];

const getAllMovies = (req, res) => {
  const { genre, year, ratingMin, ratingMax, q } = req.query;

  let filteredMovies = [...movies];

  if (genre) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.genre.some((item) => item.toLowerCase() === String(genre).toLowerCase())
    );
  }

  if (year) {
    filteredMovies = filteredMovies.filter((movie) => String(movie.year) === String(year));
  }

  if (ratingMin) {
    filteredMovies = filteredMovies.filter((movie) => Number(movie.rating) >= Number(ratingMin));
  }

  if (ratingMax) {
    filteredMovies = filteredMovies.filter((movie) => Number(movie.rating) <= Number(ratingMax));
  }

  if (q) {
    const query = String(q).toLowerCase();
    filteredMovies = filteredMovies.filter((movie) =>
      movie.title.toLowerCase().includes(query) || movie.director.toLowerCase().includes(query)
    );
  }

  return res.status(200).json({
    success: true,
    data: {
      count: filteredMovies.length,
      movies: filteredMovies
    }
  });
};

const getMovieById = (req, res) => {
  const movieId = Number(req.params.id);

  if (!Number.isInteger(movieId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid movie ID'
    });
  }

  const movie = movies.find((item) => item.id === movieId);

  if (!movie) {
    return res.status(404).json({
      success: false,
      message: 'Movie not found'
    });
  }

  return res.status(200).json({
    success: true,
    data: movie
  });
};

const createMovie = (req, res) => {
  const { title, genre, year, rating, director, description } = req.body;

  if (!title || !Array.isArray(genre) || !year || !rating || !director || !description) {
    return res.status(400).json({
      success: false,
      message: 'Invalid movie data'
    });
  }

  const nextId = movies.length ? movies[movies.length - 1].id + 1 : 1;

  const newMovie = {
    id: nextId,
    title,
    genre,
    year: Number(year),
    rating: Number(rating),
    director,
    description
  };

  movies.push(newMovie);

  return res.status(201).json({
    success: true,
    data: newMovie
  });
};

const updateMovie = (req, res) => {
  const movieId = Number(req.params.id);

  if (!Number.isInteger(movieId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid movie ID'
    });
  }

  const movieIndex = movies.findIndex((movie) => movie.id === movieId);

  if (movieIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Movie not found'
    });
  }

  const { title, genre, year, rating, director, description } = req.body;

  if (!title || !Array.isArray(genre) || !year || !rating || !director || !description) {
    return res.status(400).json({
      success: false,
      message: 'Invalid movie data'
    });
  }

  movies[movieIndex] = {
    ...movies[movieIndex],
    title,
    genre,
    year: Number(year),
    rating: Number(rating),
    director,
    description
  };

  return res.status(200).json({
    success: true,
    data: movies[movieIndex]
  });
};

const deleteMovie = (req, res) => {
  const movieId = Number(req.params.id);

  if (!Number.isInteger(movieId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid movie ID'
    });
  }

  const movieIndex = movies.findIndex((movie) => movie.id === movieId);

  if (movieIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Movie not found'
    });
  }

  movies.splice(movieIndex, 1);

  return res.status(204).send();
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};
