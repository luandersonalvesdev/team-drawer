const SUCCESS = 'SUCCESS';
const CREATED = 'CREATED';
const BAD_REQUEST = 'BAD_REQUEST';
const CONFLICT = 'CONFLICT';
const UNAUTHORIZED = 'UNAUTHORIZED';
const NOT_FOUND = 'NOT_FOUND';

const httpResponseMapper = (status) => {
  switch (status) {
    case SUCCESS: return 200;
    case CREATED: return 201;
    case BAD_REQUEST: return 400;
    case CONFLICT: return 409;
    case UNAUTHORIZED: return 401;
    case NOT_FOUND: return 404;
    default: return 500;
  }
};

module.exports = {
  httpResponseMapper,
  SUCCESS,
  BAD_REQUEST,
  CONFLICT,
  UNAUTHORIZED,
  CREATED,
  NOT_FOUND,
};
