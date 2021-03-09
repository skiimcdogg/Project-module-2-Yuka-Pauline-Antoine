const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokeSchema = new Schema({

        name: String,
        types: [Object],
        height: Number,
        weight: Number,
        stats: [Object],
        moves: [Object]

})

const pokeModel = mongoose.model("pokemons", pokeSchema);
module.exports = pokeModel;