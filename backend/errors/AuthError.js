const { AUTH_ERROR } = require('./errors');

module.exports = class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AUTH_ERROR;
  }
};
