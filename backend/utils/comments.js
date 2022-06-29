const { check } = require('express-validator');
const { handleValidationErrors } = require('./validation');

const comment = check('comment')
  .notEmpty()
  .withMessage('Comments cannot be empty')
  .isLength({ max: 100 })
  .withMessage("Comments cannot be greater than 100 characters")

exports.validateComment = [
  comment,
  handleValidationErrors
];
