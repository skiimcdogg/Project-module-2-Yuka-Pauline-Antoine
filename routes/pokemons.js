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
            // console.log(dbRes)
            res.render("pokemons/all-pokemons", { pokemon: dbRes });
        })
    })
    .catch((err) => {
        next(err)
    })
})

router.get("/pokemons/1", (req, res, next) => { //name of route to define//
    var interval = {
        limit: 50,
        offset: 50
      }
    P.getPokemonsList(interval) //see all pokemons//
    .then((pokemon) => {
        const arr = pokemon.results.map(p => p.url)
        P.resource(arr)
        .then((dbRes) => {
            // console.log(dbRes)
            res.render("pokemons/all-pokemons", { pokemon: dbRes });
        })
    })
    .catch((err) => {
        next(err)
    })
})

router.get("/pokemons/2", (req, res, next) => { //name of route to define//
    var interval = {
        limit: 50,
        offset: 100
      }
    P.getPokemonsList(interval) //see all pokemons//
    .then((pokemon) => {
        const arr = pokemon.results.map(p => p.url)
        P.resource(arr)
        .then((dbRes) => {
            // console.log(dbRes)
            res.render("pokemons/all-pokemons", { pokemon: dbRes });
        })
    })
    .catch((err) => {
        next(err)
    })
})

router.get("/pokemons/3", (req, res, next) => { //name of route to define//
    var interval = {
        limit: 50,
        offset: 150
      }
    P.getPokemonsList(interval) //see all pokemons//
    .then((pokemon) => {
        const arr = pokemon.results.map(p => p.url)
        P.resource(arr)
        .then((dbRes) => {
            // console.log(dbRes)
            res.render("pokemons/all-pokemons", { pokemon: dbRes });
        })
    })
    .catch((err) => {
        next(err)
    })
})

router.get("/pokemons/4", (req, res, next) => { //name of route to define//
    var interval = {
        limit: 50,
        offset: 200
      }
    P.getPokemonsList(interval) //see all pokemons//
    .then((pokemon) => {
        const arr = pokemon.results.map(p => p.url)
        P.resource(arr)
        .then((dbRes) => {
            // console.log(dbRes)
            res.render("pokemons/all-pokemons", { pokemon: dbRes });
        })
    })
    .catch((err) => {
        next(err)
    })
})
router.get("/pokemons/5", (req, res, next) => { //name of route to define//
    var interval = {
        limit: 50,
        offset: 250
      }
    P.getPokemonsList(interval) //see all pokemons//
    .then((pokemon) => {
        const arr = pokemon.results.map(p => p.url)
        P.resource(arr)
        .then((dbRes) => {
            // console.log(dbRes)
            res.render("pokemons/all-pokemons", { pokemon: dbRes });
        })
    })
    .catch((err) => {
        next(err)
    })
})

router.get("/pokemons/6", (req, res, next) => { //name of route to define//
    var interval = {
        limit: 50,
        offset: 300
      }
    P.getPokemonsList(interval) //see all pokemons//
    .then((pokemon) => {
        const arr = pokemon.results.map(p => p.url)
        P.resource(arr)
        .then((dbRes) => {
            // console.log(dbRes)
            res.render("pokemons/all-pokemons", { pokemon: dbRes });
        })
    })
    .catch((err) => {
        next(err)
    })
})

router.get("/pokemons/7", (req, res, next) => { //name of route to define//
    var interval = {
        limit: 50,
        offset: 350
      }
    P.getPokemonsList(interval) //see all pokemons//
    .then((pokemon) => {
        const arr = pokemon.results.map(p => p.url)
        P.resource(arr)
        .then((dbRes) => {
            // console.log(dbRes)
            res.render("pokemons/all-pokemons", { pokemon: dbRes });
        })
    })
    .catch((err) => {
        next(err)
    })
})
router.get("/pokemons/8", (req, res, next) => { //name of route to define//
    var interval = {
        limit: 50,
        offset: 400
      }
    P.getPokemonsList(interval) //see all pokemons//
    .then((pokemon) => {
        const arr = pokemon.results.map(p => p.url)
        P.resource(arr)
        .then((dbRes) => {
            // console.log(dbRes)
            res.render("pokemons/all-pokemons", { pokemon: dbRes });
        })
    })
    .catch((err) => {
        next(err)
    })
})
router.get("/pokemons/9", (req, res, next) => { //name of route to define//
    var interval = {
        limit: 43,
        offset: 450
      }
    P.getPokemonsList(interval) //see all pokemons//
    .then((pokemon) => {
        const arr = pokemon.results.map(p => p.url)
        P.resource(arr)
        .then((dbRes) => {
            // console.log(dbRes)
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
    userModel.findOneAndUpdate({ email: req.session.currentuser.email }, { $push: {pokeFav: pokeId} }, { new: true })
    .then((dbRes2) => {
    //    const result = dbRes2
    //    result.pokeFav.push(pokeId)
       console.log(dbRes2);
       res.redirect("/users")
    })
    .catch((err) => {
        next(err)
    })
})
})


module.exports = router;
