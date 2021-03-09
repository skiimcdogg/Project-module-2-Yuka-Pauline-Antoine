const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const pokeModel = require('./../models/Pokemon');
const userModel = require('./../models/User');
const protectRoute = require("./../middlewares/protectPrivateRoute");

router.get("/pokemons", (req, res, next) => { //name of route to define//
    var interval = {
        limit: 50,
        offset: 0
      }

    P.getPokemonsList(interval) //see all pokemons//

    .then((pokemon) => {
        const arr = pokemon.results.map(p => p.url)

        P.resource(arr)
        .then((dbRes) => {
            console.log(dbRes)
            res.render("pokemons/all-pokemons", { pokemon: dbRes });
        })
    })
    .catch((err) => {
        next(err)
    })
})

router.get("/pokemons/:id", (req, res, next) => {
    // console.log(req.params.id)
    P.getPokemonByName(req.params.id) //see one pokemon details//
    .then((pokemon) => {
        res.render("pokemons/details-pokemon", { pokemon });
    })
    .catch((err) => {
        next(err)
    })
})

router.post("/pokemons/create", protectRoute, (req, res, next) => {
    // console.log(req.params.name, req.params.height, req.params.weight)


req.body.types = req.body.types.split(",");
req.body.stats = req.body.stats.split(",");
req.body.moves = req.body.moves.split(",");
const newPokemon = req.body; 

//creer le pokemon et recupérer son id
pokeModel.create(newPokemon)
.then((dbRes)=>{
    const pokeId = dbRes._id
    userModel.findOneAndUpdate({ email: req.session.currentuser.email })
    .then((dbRes2) => {
       const result = dbRes2
       result.pokeFav.push(pokeId)
    })
    
})
//Trouver mon user and update son array de favories


//
    // userModel.findOne({ email: req.session.currentuser.email }).then(dbRes => {
    // pokeModel.create({ name, height, weight, types, stats, moves })
    // .then((dbRes2) => {
    //     const array = dbRes.pokeFav;
    //     const pokeId = dbRes2._id;
    //    const pokeFavo = array.push(pokeId)
    //    userModel.findOneAndUpdate(id,{ pokeFav }).then(dbRes3 => {
    //         console.log(pokeFav);
    //    })
       
    // }).catch((err) => {
    //     next(err)
    // })
    // res.send(req.body)
})



module.exports = router;
