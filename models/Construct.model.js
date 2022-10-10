const {Schema, model} = require("mongoose");

const constructSchema = new Schema({
    constructPicture: {
        type: String
    },
    constructProfilePicture: {
        type: String
    },
    voice: {
        type: String
    },
    rank: {
        type: String
    },
    name: {
        type: String
    },
    frame: {
        type: String
    },
    constructType: {
        type: String
    },
    serviceTime: {
        type: String
    },
    activationDate: {
        type: String
    },
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    vitalFluidType: {
        type: String
    },
    mentalAge: {
        type: Number
    },
    team: {
        type: String
    },
    file: {
        type: String
    },
    energy: {
        type: Array
    },
    model: {
        type: String
    },
    recomendedWeapon: {
        type: Schema.Types.ObjectId,
        ref: "weapon"
    },
    recomendedMemory: {
        type: Schema.Types.ObjectId,
        ref: "memory"
    }
})

const ConstructModel = model ("Construct", constructSchema);

module.exports = ConstructModel;