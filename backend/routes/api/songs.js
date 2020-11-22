const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Song } = require("../../db/models");

const router = express.Router();

router.post(
    "/",
    requireAuth,
    singleMulterUpload("audio"),
    asyncHandler(async (req, res) => {
        const songData = req.body;
        songData.audio = await singlePublicFileUpload(req.file);
        const song = new Song(songData);
        await song.save();
        res.json(song);
    })
);

module.exports = router;
