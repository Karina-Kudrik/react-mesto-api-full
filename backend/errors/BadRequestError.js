const { BAD_REQUEST } = require('./errors');

module.exports = class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
};
