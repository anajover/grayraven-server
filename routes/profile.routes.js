const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const UserModel = require("../models/User.model");


//GET "/api/admin/profile" => Datos de usuario
router.get("/profile", isAuthenticated, async (req, res, next) => {
    const {_id} = req.payload;    

    try {

        const response = await UserModel.findById(_id);
        res.json(response)
        console.log(response)

    } catch(error) {
        next(error)
    }
})

module.exports = router;
