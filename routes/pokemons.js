const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

router.get("/pokemons", (req, res, next) => { //name of route to define//
    var interval = {
        limit: 493,
        offset: 0 //from generation 1 to 4//
      }

    P.getPokemonsList(interval) //see all pokemons//
    .then((pokemon) => {
        console.log(pokemon)
        res.render("pokemons/all-pokemons", { data: pokemon });
    })
    .catch((err) => {
        next(err)
    })
})

router.get("/pokemons/:id", (req, res, next) => {
    P.getPokemonByName(req.params.id) //see one pokemon details//
    .then((pokemon) => {
        res.render("pokemons/details-pokemon", { data: pokemon });
    })
    .catch((err) => {
        next(err)
    })
})

module.exports = router;
