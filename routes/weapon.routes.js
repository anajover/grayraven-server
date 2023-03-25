const router = require("express").Router();
const WeaponModel = require("../models/Weapon.model");

// GET "/api/weapons" => lista de las armas
router.get("/", async (req, res, next) => {

    try {

        const response = await WeaponModel.find().select("weaponPicture name")
        res.json(response)

    }catch (error) {
        next(error)
    }
})

// POST "/api/weapons" => crear un arma
router.post("/", async (req, res, next) => {

    const {weaponPicture, name, type, maxLevel, overclockLimit, skillDescription, data, backstory } = req.body

    try {

        const response = await WeaponModel.create({
            weaponPicture,
            name,
            type,
            maxLevel,
            overclockLimit,
            skillDescription,
            data,
            backstory
        })
        res.json(response)

    }catch(error) {
        next(error)
    }
})

// GET "/api/weapons/:id" => ver detalles de arma
router.get("/", async (req, res, next) => {

    const {id} = req.params;

    try {

        const response = await WeaponModel.findById(id)
        res.json(response)

    }catch(error) {
        next(error)
    }
})

//DELETE "/api/weapons/:id" => eliminar arma
router.delete("/:id", async (req, res, next) => {

    const {id} = req.params

    try {

        const response = await WeaponModel.findById().select("name")
        await WeaponModel.findByIdAndDelete(id);
        res.json(`El arma ${response.name} ha salido eliminada.`)

    }catch(error) {
        next(error)
    }
})

// PATCH "/api/weapons/:id/edit" => editar arma
router.patch("/:id/edit", async (req, res, next) => {

    const {id} = req.params
    const {weaponPicture, name, type, maxLevel, overclockLimit, skillDescription, data, backstory} = req.body

    try {

        await WeaponModel.findByIdAndUpdate(id, {
            weaponPicture,
            name,
            type,
            maxLevel,
            overclockLimit,
            skillDescription,
            data,
            backstory
        })
        res.json(`Se ha actualizado el arma ${name}.`)
    }catch(error) {
        next(error)
    }
})

module.exports = router;