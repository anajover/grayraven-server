const router = require("express").Router();

const uploader = require("../middlewares/cloudinary")

router.post("/", uploader.single("image"), (req, res, next) => {

    console.log(req.file.path)

    res.json(req.file.path)
})

module.exports = router;