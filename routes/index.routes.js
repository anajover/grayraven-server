const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)
const constructRoutes = require("./construct.routes.js")
router.use("/constructs", constructRoutes)

const weaponRoutes = require("./weapon.routes.js")
router.use("/weapons", weaponRoutes)

const memoryRoutes = require("./memory.routes.js")
router.use("/memories", memoryRoutes)

const authRoutes = require("./auth.routes.js")
router.use("/auth", authRoutes)

const profileRoutes = require("./profile.routes")
router.use("/profile", profileRoutes)

const uploaderRoutes = require("./uploader.routes")
router.use("/uploader", uploaderRoutes)

module.exports = router;
