const { check } = require("express-validator");
const { handleValidationErrors } = require("./validation");

const regex = new RegExp(".*(jpe?g|png)$");

const imageUrl = check("imageUrl")
  .notEmpty()
  .withMessage("Image Url cannot be empty")
  .isLength({ min: 4 })
  .withMessage("Image Url cannot be less than 4 characters")
  .isLength({ max: 250 })
  .withMessage("Image Url cannot be greater than 250 characters")
  // .isURL({ require_protocol: false, require_host: false });
  .custom((url) => {
    let urlString = url.toString();
    if (regex.test(urlString)) {
      return true;
    } else {
      return false;
    }
  })
  .withMessage(
    "Please provide a valid image url file. The file must end with jpeg, jpg or png"
  );
const title = check("title")
  .notEmpty()
  .withMessage("Image title cannot be empty")
  .isLength({ min: 1 })
  .withMessage("Image title cannot be less than 1 character")
  .isLength({ max: 40 })
  .withMessage("Image title cannot be greater than 40 characters");
const description = check("description")
  .isLength({ max: 150 })
  .withMessage("Description cannot be more than 150 characters long");

exports.validateAddPhoto = [
  imageUrl,
  title,
  description,
  handleValidationErrors,
];

exports.validateUpdatePhoto = [
  imageUrl,
  title,
  description,
  handleValidationErrors,
];

// .*(jpe?g|png|gif|bmp)$
