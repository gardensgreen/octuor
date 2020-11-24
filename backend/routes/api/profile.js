const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Song } = require("../../db/models");

const router = express.Router();

const profileNotFoundError = (id) => {
    const err = Error(`Song with id of ${id} could not be found.`);
    err.title = "Song not found.";
    err.status = 404;
    return err;
};

router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const userId = parseInt(req.params.id, 10);
        const songs = await Song.findAll({
            where: {
                userId: userId,
            },
            include: User,
        });

        res.json(songs);
    })
);

module.exports = router;
