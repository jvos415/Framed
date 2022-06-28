const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const imageValidations = require("../../utils/images");
const { User, Image, Comment } = require("../../db/models");

/******************************* GET ROUTE FOR SPLASH PAGE*************************************/

router.get(
  "/",
  asyncHandler(async function (req, res) {
    const images = await Image.findAll();
    return res.json(images);
  })
);

/******************************* POST ROUTE TO SPLASH PAGE *************************************/

router.post(
  "/",
  imageValidations.validateAddPhoto,
  asyncHandler(async function (req, res) {
    const imageObj = await Image.create(req.body);
    res.status(201);
    return res.json(imageObj);
  })
);

/******************************* GET SINGLE IMAGE AND DETAILS *************************************/

router.get(
  "/:id",
  asyncHandler(async function (req, res) {
    const imageId = await Image.findByPk(req.params.id);
    return res.json(imageId);
  })
);

/******************************* UPDATE A SINGLE IMAGE AND DETAILS *************************************/

router.put(
  "/:id",
  imageValidations.validateUpdatePhoto,
  asyncHandler(async function (req, res) {
    const image = await Image.findByPk(req.params.id)
    await image.update(req.body);
    return res.json(image);
  })
);

/******************************* DELETE SINGLE IMAGE ROUTE *************************************/

router.delete(
  "/:id(\\d+)",
  asyncHandler(async function (req, res) {
    const image = await Image.findByPk(req.params.id)
    await image.destroy(req.params.id);
    return res.json(image);
  })
);

module.exports = router;
