const { CONFLICTING_REQUEST } = require('./errors');

module.exports = class ConflictingRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICTING_REQUEST;
  }
};
