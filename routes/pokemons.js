const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const pokeModel = require('./../models/Pokemon')

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

router.post("/pokemons/:name/:height/:weight", (req, res, next) => {
    // console.log(req.params.name, req.params.height, req.params.weight)
    const name = req.params.name;
    const height = req.params.height;
    const weight = req.params.weight;

    pokeModel.create({ name, height, weight })
    .then(() => {
        res.redirect("/pokemons")
    })
    .catch((err) => {
        next(err)
    })
})

module.exports = router;
