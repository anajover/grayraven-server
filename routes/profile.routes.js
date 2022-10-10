const router = require("express").Router();
const UserModel = require("../models/User.model");

//GET "/api/admin/profile" => Datos de usuario
router.get("/profile", async (req, res, next) => {

    try {

        const response = await req.session.username
        res.json(response)

    } catch(error) {
        next(error)
    }
})

module.exports = router;
