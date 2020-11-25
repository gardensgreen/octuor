const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Song } = require("../../db/models");

const router = express.Router();

const songNotFoundError = (id) => {
    const err = Error(`Song with id of ${id} could not be found.`);
    err.title = "Song not found.";
    err.status = 404;
    return err;
};

const notValidMP3 = () => {
    const err = Error(`Song must be of type mp3.`);
    err.title = "Invalid File Type for song.";
    err.status = 400;
    return err;
};

const notValidPic = () => {
    const err = Error(`Supported file types for artwork: png/jpeg`);
    err.title = "Invalid File Type for artwork.";
    err.status = 400;
    return err;
};

router.post(
    "/",
    requireAuth,
    singleMulterUpload("audio"),
    asyncHandler(async (req, res, next) => {
        console.log(req.file.mimetype);
        if (req.file.mimetype !== "audio/mpeg") {
            return next(notValidMP3());
        }
        const songData = req.body;
        songData.audio = await singlePublicFileUpload(req.file);
        const song = new Song(songData);
        await song.save();
        res.json(song);
    })
);

router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const songId = parseInt(req.params.id, 10);
        const song = await Song.findByPk(songId);

        res.json(song);
    })
);

router.get(
    "/",
    asyncHandler(async (req, res) => {
        const songs = await Song.findAll({
            order: [["createdAt", "DESC"]],
            include: User,
            limit: 6,
        });
        res.json(songs);
    })
);

router.put(
    "/:id",
    requireAuth,
    singleMulterUpload("artwork"),
    asyncHandler(async (req, res, next) => {
        const songId = parseInt(req.params.id, 10);
        const songData = req.body;

        const song = await Song.findByPk(songId);

        if (song) {
            if (req.file) {
                songData.artwork = await singlePublicFileUpload(req.file);
                if (
                    req.file.mimetype !== "image/jpeg" &&
                    req.file.mimetype !== "image/png"
                ) {
                    return next(notValidPic());
                }
            }
            await song.update({
                title: songData.title,
                artwork: songData.artwork,
            });
        } else {
            next(songNotFoundError(songId));
        }
        res.json(song);
    })
);

module.exports = router;
