const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokeSchema = new Schema({

        name: Object,
        type: [String],
        base: Object,

})

const pokeModel = mongoose.model("pokemons", pokeSchema);
module.exports = pokeModel;