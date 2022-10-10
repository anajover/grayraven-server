const {Schema, model} = require("mongoose");

const weaponSchema = new Schema({
    weaponPicture: {
        style: String
    },
    name: {
        style: String
    },
    type: {
        style: String
    },
    maxLevel: {
        style: Number
    },
    overclockLimit: {
        style: Number
    },
    skillDescription: {
        style: String
    },
    data: {
        style: String
    },
    backstory: {
        style: String
    }
})

const WeaponModel = model ("Weapon", weaponSchema);

module.exports = WeaponModel;