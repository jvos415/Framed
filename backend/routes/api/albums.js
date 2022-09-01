const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const { requireAuth } = require("../../utils/auth");
const albumValidations = require("../../utils/albums");
const { Album } = require("../../db/models");

/******************************* GET ROUTE FOR ALBUMS PAGE*************************************/

router.get(
    "/",
    asyncHandler(async function (req, res) {
      const albums = await Album.findAll();
      return res.json(albums);
    })
  );

module.exports = router;  