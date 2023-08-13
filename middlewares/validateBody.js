const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const funs = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return funs;
};

module.exports = validateBody;
