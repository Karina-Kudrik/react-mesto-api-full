const { SERVER_ERROR } = require('./errors');

module.exports.handleErrors = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === SERVER_ERROR ? 'На сервере произошла ошибка' : message,
    });
  next();
};
