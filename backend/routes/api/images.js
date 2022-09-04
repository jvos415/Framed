const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3");
const { requireAuth } = require("../../utils/auth");
const imageValidations = require("../../utils/images");
const commentValidations = require("../../utils/comments");
const { User, Image, Comment } = require("../../db/models");

/******************************* GET ROUTE IMGAES *************************************/

router.get(
  "/",
  asyncHandler(async function (req, res) {
    const images = await Image.findAll();
    return res.json(images);
  })
);

/******************************* POST ROUTE FOR IMAGES*************************************/

router.post(
  "/",
  imageValidations.validateAddPhoto,
  requireAuth,
  asyncHandler(async function (req, res) {
    const imageObj = await Image.create(req.body);
    res.status(201);
    return res.json(imageObj);
  })
);

/******************************* GET SINGLE IMAGE AND DETAILS *************************************/

router.get(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async function (req, res) {
    const imageId = await Image.findByPk(req.params.id, { include: User });
    return res.json(imageId);
  })
);

/******************************* UPDATE A SINGLE IMAGE AND DETAILS *************************************/

router.put(
  "/:id(\\d+)",
  imageValidations.validateUpdatePhoto,
  requireAuth,
  asyncHandler(async function (req, res) {
    const image = await Image.findByPk(req.params.id);
    await image.update(req.body);
    return res.json(image);
  })
);

/******************************* DELETE SINGLE IMAGE ROUTE *************************************/

router.delete(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async function (req, res) {
    const image = await Image.findByPk(req.params.id);
    await image.destroy();
    return res.json(image);
  })
);

/******************************* GET ROUTE FOR COMMENTS *************************************/

router.get(
  "/:imageId/comments",
  asyncHandler(async function (req, res) {
    const image = await Image.findByPk(req.params.imageId);
    const comments = await Comment.findAll({
      where: {
        imageId: image.id,
      },
      include: User,
    });

    return res.json(comments);
  })
);

/******************************* POST ROUTE FOR COMMENT *************************************/

router.post(
  "/:imageId/comments",
  commentValidations.validateComment,
  requireAuth,
  asyncHandler(async function (req, res) {
    const commentObj = await Comment.create(req.body);
    res.status(201);
    return res.json(commentObj);
  })
);

/******************************* UPDATE A COMMENT *************************************/

router.put(
  "/comments/:commentId(\\d+)",
  commentValidations.validateComment,
  requireAuth,
  asyncHandler(async function (req, res) {
    const comment = await Comment.findByPk(req.params.commentId);
    await comment.update(req.body);
    return res.json(comment);
  })
);

/******************************* DELETE SINGLE COMMENT *************************************/

router.delete(
  "/comments/:commentId(\\d+)",
  requireAuth,
  asyncHandler(async function (req, res) {
    const comment = await Comment.findByPk(req.params.commentId);
    await comment.destroy();
    return res.json(comment);
  })
);

module.exports = router;
