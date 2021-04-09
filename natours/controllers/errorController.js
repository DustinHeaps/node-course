const AppError = require('../utils/appError');

const devErrorMessage = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const prodErrorMessage = (err, res) => {
  // an error on something we made - safe
  if (err.isCustomError) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming error - unsafe
  } else {
    // 1. log error
    console.error('ERROR', err);

    // 2. send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

handleMongooseCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`
  return new AppError(message, 404)
}
handleDuplicateFieldError = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}, please use another value`;
  return new AppError(message, 400);
}

const handleValidationError = err => {
  const errors = Object.values(err.errors).map(el => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    devErrorMessage(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = {...err};
    if (error.name === 'CastError') error = handleMongooseCastError(error)
    if (error.code === 11000) error = handleDuplicateFieldError(error)
    if (error.name === 'ValidationError') error = handleValidationError(error);
    prodErrorMessage(error, res);
  }
};
