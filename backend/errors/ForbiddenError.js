const { FORBIDDEN_ERROR } = require('./errors');

module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_ERROR;
  }
};
