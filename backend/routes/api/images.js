const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Image } = require('../../db/models');

router.get('/', asyncHandler(async function(req, res) {
  const images = await Image.findAll()
  // console.log(images);
  return res.json(images);
}));

module.exports = router;
