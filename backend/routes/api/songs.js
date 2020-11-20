const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const {
    multipleMulterUpload,
    multiplePublicFileUpload,
} = require("../../awsS3");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

router.post(
    "/",
    requireAuth,
    multipleMulterUpload(["image", "audio"]),
    asyncHandler(async (req, res) => {
        const songData = req.body;
        userData.image = await multiplePublicFileUpload([req.img, req.audio]);
        const song = new song(songData);
        await user.save();
        res.json(song);
    })
);

module.exports = router;
