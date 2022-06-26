const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const imageValidations = require('../../validations/images');
const { User, Image } = require('../../db/models');

router.get('/', asyncHandler(async function(req, res) {
  const images = await Image.findAll()
  // console.log(images);
  return res.json(images);
}));

router.post(
  '/',
  imageValidations.validateAddPhoto,
  asyncHandler(async function (req, res) {
    const id = await Image.create(req.body);
    return res.redirect(`${req.baseUrl}/${id}`);
  })
);

module.exports = router;
