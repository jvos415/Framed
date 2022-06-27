const { check } = require('express-validator');
const { handleValidationErrors } = require('./validation');

const imageUrl = check('imageUrl')
  .notEmpty()
  .withMessage('Image Url cannot be empty')
  .isURL({ require_protocol: false, require_host: false });
const title = check('title')
  .notEmpty()
  .withMessage('Image title cannot be empty')

exports.validateAddPhoto = [
  imageUrl,
  title,
  handleValidationErrors
];

exports.validateUpdatePhoto = [
  imageUrl,
  title,
  handleValidationErrors
];
