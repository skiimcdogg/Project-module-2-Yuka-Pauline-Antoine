const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({

        pseudo: String,
        email: String,
        password: String,
        avatar: String,
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user"
        },
        region: {
            type: String,
            enum: ["Kanto", "Johto", "Hoenn", "Sinnoh", "Unys", "Kalos", "Alola", "Galar"]
        },
        pokeFav: [{
            type: Schema.Types.ObjectId,
            ref: "pokemons"
          }]

})

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;