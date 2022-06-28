const { check } = require('express-validator');
const { handleValidationErrors } = require('./validation');

const comment = check('comment')
  .notEmpty()
  .withMessage('Comments cannot be empty')

exports.validateComment = [
  comment,
  handleValidationErrors
];
