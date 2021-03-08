const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokeSchema = new Schema({

        name: String,
        height: Number,
        weight: Number,
        moves: [String],
        sprites: [String],
        stats: [String],
        types: [String],

})

const pokeModel = mongoose.model("pokemons", pokeSchema);
module.exports = pokeModel;