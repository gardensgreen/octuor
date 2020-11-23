const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Song } = require("../../db/models");

const router = express.Router();

const songNotFoundError = (id) => {
    const err = Error(`Song with id of ${id} could not be found.`);
    err.title = "Song not found.";
    err.status = 404;
    return err;
};

router.post(
    "/",
    requireAuth,
    singleMulterUpload("audio"),
    asyncHandler(async (req, res) => {
        console.log(req.body);
        const songData = req.body;
        songData.audio = await singlePublicFileUpload(req.file);
        const song = new Song(songData);
        await song.save();
        res.json(song);
    })
);

router.put(
    "/",
    requireAuth,
    singleMulterUpload("image"),
    asyncHandler(async (req, res, next) => {
        const songData = req.body;
        songData.artwork = await singlePublicFileUpload(req.file);
        const song = await db.Song.findByPk(songId);

        if (song) {
            await song.update({
                title: songData.title,
                artwork: songData.content,
            });
        } else {
            next(songNotFoundError(songId));
        }
        res.json(song);
    })
);

module.exports = router;
