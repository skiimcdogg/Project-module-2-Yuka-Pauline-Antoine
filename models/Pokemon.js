const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokeSchema = new Schema({

        name: String,
        types: [String],
        height: Number,
        weight: Number,
        stats: [String],
        moves: [String]

})

const pokeModel = mongoose.model("pokemons", pokeSchema);
module.exports = pokeModel;