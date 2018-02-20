const express = require('express');
var Recipe = require('../models/recipe');

const router = new express.Router();

router.get('/randomRecipe', function (req, res) {
    Recipe.find(function(err, recipes) {
        if (err )
            return res.status(404).send(err);
        if (recipes.length>0) {
            return res.json(recipes[Math.floor(Math.random() * recipes.length)])
        }
        else
        {
            return res.json(recipes);
        }
    });
});

module.exports = router;