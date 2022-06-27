const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const imageValidations = require('../../utils/images');
const { User, Image } = require('../../db/models');

/******************************* GET ROUTE FOR SPLASH PAGE*************************************/

router.get('/', asyncHandler(async function(req, res) {
  const images = await Image.findAll()
  // console.log(images);
  return res.json(images);
}));

/******************************* POST ROUTE TO SPLASH PAGE *************************************/

router.post(
  '/',
  imageValidations.validateAddPhoto,
  asyncHandler(async function (req, res) {
    const imageObj = await Image.create(req.body);
    res.status(201)
    return res.json(imageObj);
  })
);

/******************************* GET SINGLE IMAGE AND DETAILS *************************************/

router.get('/:id', asyncHandler(async function(req, res) {
  /* if (!User.id) {
    return res.redirect(`/signup`);
  } */
  const image = await Image.findByPk(req.params.id);
  return res.json(image);
}));

/******************************* UPDATE A SINGLE IMAGE AND DETAILS *************************************/

router.put(
  '/:id',
  imageValidations.validateUpdatePhoto,
  asyncHandler(async function (req, res) {
    /* if (!User.id) {
    return res.redirect(`/signup`);
  } */
    const image = await Image.update(req.body);
    return res.json(image);
  })
);

/******************************* DELETE SINGLE IMAGE ROUTE *************************************/

router.delete('/:id', asyncHandler(async function(req, res) {
  /* if (!User.id) {
    return res.redirect(`/signup`);
  } */
  const imageId = await image.destroy(req.params.id);
  return res.json({ imageId });
}));

module.exports = router;
