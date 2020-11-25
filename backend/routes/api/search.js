const express = require("express");
const asyncHandler = require("express-async-handler");

const { User, Song } = require("../../db/models");
const { Op } = require("sequelize");
const router = express.Router();

const profileNotFoundError = (id) => {
    const err = Error(`Song with id of ${id} could not be found.`);
    err.title = "Song not found.";
    err.status = 404;
    return err;
};

router.post(
    "/",
    asyncHandler(async (req, res) => {
        const { term } = req.body;
        let songs = await Song.findAll({
            where: {
                title: {
                    [Op.iLike]: "%" + term + "%",
                },
            },
        });

        let users = await User.findAll({
            where: {
                username: {
                    [Op.iLike]: "%" + term + "%",
                },
            },
        });

        res.json({ songs, users });
    })
);

module.exports = router;
