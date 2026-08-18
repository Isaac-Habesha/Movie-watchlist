const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
};

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);

  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};
