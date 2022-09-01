const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const { requireAuth } = require("../../utils/auth");
const albumValidations = require("../../utils/albums");
const { User, Album } = require("../../db/models");

/******************************* GET ROUTE FOR ALBUMS PAGE*************************************/

router.get(
    "/my-albums/:userId(\\d+)", requireAuth,
    asyncHandler(async function (req, res) {
      const user = await User.findByPk(req.params.userId);
      const albums = await Album.findAll({
        where: {
            userId: user.id
          }
      });
      return res.json(albums);
    })
  );

/******************************* POST ROUTE TO ALBUMS PAGE *************************************/

router.post(
    "/",
    albumValidations.validateAlbum, requireAuth,
    asyncHandler(async function (req, res) {
      const albumObj = await Album.create(req.body);
      res.status(201);
      return res.json(albumObj);
    })
  );

/******************************* GET SINGLE ALBUM DETAILS *************************************/

router.get(
    "/:id(\\d+)",
    requireAuth,
    asyncHandler(async function (req, res) {
      const albumId = await Album.findByPk(req.params.id);
      return res.json(albumId);
    })
  );  

/******************************* UPDATE AN ALBUM  *************************************/

router.put(
    "/:id(\\d+)",
    albumValidations.validateAlbum, requireAuth,
    asyncHandler(async function (req, res) {
      const album = await Album.findByPk(req.params.id)
      await album.update(req.body);
      return res.json(album);
    })
  );
  
  /******************************* DELETE SINGLE IMAGE ROUTE *************************************/
  
  router.delete(
    "/:id(\\d+)", requireAuth,
    asyncHandler(async function (req, res) {
      const album = await Album.findByPk(req.params.id)
      await album.destroy();
      return res.json(album);
    })
  );  

module.exports = router;  