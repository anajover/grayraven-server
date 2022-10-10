const MemoryModel = require("../models/Memory.model");

const router = require("express").Router();

// GET "/api/memories" => lista de memorias
router.get("/", async (req, res, next) => {

    try {

        const response = await MemoryModel.find().select("memoryPicture name")
        res.json(response)

    }catch(error) {
        next(error)
    }
})

// POST "/api/memories" => crear una memoria
router.post("/", async (req, res, next) => {

    const { memoryPicture, name, memoryType, artist, maxLevel, overclockLimit, skillDescription, backStory } = req.body;

    try {

        const response = await MemoryModel.create({
            memoryPicture,
            name,
            memoryType,
            artist,
            maxLevel,
            overclockLimit,
            skillDescription,
            backStory
        })
        res.json(response)

    }catch(error) {
        next(error)
    }
})

// GET "/api/memories/:id" => ver los detalles de una memoria
router.get("/:id", async (req, res, next) => {

    const {id} = req.params;

    try {

        const response = await MemoryModel.findById(id)
        res.json(response)

    }catch(error) {
        next(error)
    }
})

// DELETE "/memories/:id" => eliminar una memoria
router.delete("/:id", async (req, res, next)=> {

    const {id} = req.params;

    try {

        const response = await MemoryModel.findById(id).select("name")
        await MemoryModel.findByIdAndDelete(id);
        res.json(`La memoria ${response.name} ha sido eliminada`)

    }catch(error) {
        next(error)
    }
})

// PATCH "/api/:id/edit" => editar una memoria
router.patch("/:id/edit", async (req, res, next) => {

    const {id} = req.params;
    const {memoryPicture, name, memoryType, artist, maxLevel, overclockLimit, skillDescription, backStory} = req.body;

    try {

        await MemoryModel.findByIdAndUpdate(id, {
            memoryPicture,
            name,
            memoryType,
            artist,
            maxLevel,
            overclockLimit,
            skillDescription,
            backStory
        })
        res.json(`La memoria ${name} ha sido actualizada.`)

    }catch(error) {
        next(error)
    }
})

module.exports = router;