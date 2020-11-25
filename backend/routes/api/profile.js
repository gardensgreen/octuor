const express = require("express");
const asyncHandler = require("express-async-handler");

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
    asyncHandler(async (req, res, next) => {
        const userId = parseInt(req.params.id, 10);
        const songs = await Song.findAll({
            where: {
                userId: userId,
            },
            include: User,
        });

        if (!songs) return next(profileNotFoundError);

        res.json(songs);
    })
);

module.exports = router;
