const { check } = require('express-validator');
const { handleValidationErrors } = require('./validation');

const title = check("title")
  .notEmpty()
  .withMessage("Album title cannot be empty")
  .isLength({ min: 1 })
  .withMessage("Album title cannot be less than 1 character")
  .isLength({ max: 20 })
  .withMessage("Album title cannot be greater than 20 characters");

exports.validateAlbum = [
  title,
  handleValidationErrors
];