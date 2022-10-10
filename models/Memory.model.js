const {Schema, model} = require("mongoose");

const memorySchema = new Schema({
    memoryPicture: {
        type: String
    },
    name: {
        type: String
    },
    memoryType: {
        type: String
    },
    artist: {
        type: String
    },
    maxLevel: {
        type: Number
    },
    overclockLimit: {
        type: Number
    },
    skillDescription: {
        type: String
    },
    backStory: {
        type: String
    }
})

const MemoryModel = model ("Memory", memorySchema);

module.exports = MemoryModel;