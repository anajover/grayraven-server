const ConstructModel = require("../models/Construct.model");

const router = require("express").Router();

// GET "/api/constructs/" => ver lista de All constructs
router.get("/", async (req, res, next) => {

    try {

        const response = await ConstructModel.find().sort({name:1}).select("constructPicture name constructType file team energy frame model rank")
        res.json(response)

    }catch(error) {
        next(error)
    }
})

//POST "/api/constructs" => crear un nuevo Construct
router.post("/create", async (req, res, next) => {

    const { constructPicture, constructProfilePicture, voice, rank, name, frame, constructType, serviceTime, activationDate, height, weight, vitalFluidType, mentalAge, team, file, energy, model } = req.body

    try {

        const response = await ConstructModel.create({
            constructPicture,
            constructProfilePicture,
            voice,
            rank,
            name,
            frame,
            constructType,
            serviceTime,
            activationDate,
            height,
            weight,
            vitalFluidType,
            mentalAge,
            team,
            file,
            energy,
            model,
        })
        res.json(response)        

    } catch(error) {
        next(error)
    }
})

// GET "/api/constructs/:id" => ver los detalles del construct
router.get("/:id", async (req, res, next) => {

    const {id} = req.params;

    try {
        const response = await ConstructModel.findById(id)
        res.json(response)
    }catch(error) {
        next(error)
    }
})

// DELETE "/api/constructs/:id" => eliminar un constructor
router.delete("/:id", async (req, res, next) => {

    const {id} = req.params
    try {

        const response = await ConstructModel.findById(id).select("name")
        await ConstructModel.findByIdAndDelete(id);
        res.json(`El constructor ${response.name} ha sido eliminado.`)

    }catch(error) {
        next(error)
    }
})

// PATCH "/api/constructs/:id/edit" => Editar un construct
router.patch("/:id/edit", async (req, res, next) => {

    const {id} = req.params
    const { constructPicture, constructProfilePicture, voice, rank, name, frame, constructType, serviceTime, activationDate, height, weight, vitalFluidType, mentalAge, team, file, energy, model } = req.body
    
    try {

        await ConstructModel.findByIdAndUpdate(id, {
            constructPicture,
            constructProfilePicture,
            voice,
            rank,
            name,
            frame,
            constructType,
            serviceTime,
            activationDate,
            height,
            weight,
            vitalFluidType,
            mentalAge,
            team,
            file,
            energy,
            model
        })
        res.json(`El construct ${name} ha sido actualizado`)

    }catch(error) {
        next(error)
    }

})

module.exports = router;