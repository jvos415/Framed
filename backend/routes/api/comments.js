const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const commentValidations = require("../../utils/comments");
const { User, Image, Comment } = require("../../db/models");

/******************************* GET ALL COMMENTS FOR AN IMAGE *************************************/

router.get(
  "/",
  asyncHandler(async function (req, res) {
    const comments = await Comment.findAll({
      // where the imageId = comment.imageId
      where: { }
    });

    return res.json(comments);
  })
);

/******************************* POST COMMENT TO AN IMAGE *************************************/

router.post(
  "/",
  commentValidations.validateComment,
  asyncHandler(async function (req, res) {
    const imageObj = await Image.create(req.body);
    res.status(201);
    return res.json(imageObj);
  })
);

/******************************* DELETE A COMMENT ON A SPECIFIC IMAGE *************************************/

router.delete(
  "/:id(\\d+)",
  asyncHandler(async function (req, res) {
    const image = await Image.findByPk(req.params.id)
    await image.destroy(req.params.id);
    return res.json(image);
  })
);

module.exports = router;
