var User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const express = require('express');
var Recipe = require('../models/recipe');

const router = new express.Router();

router.get('/dashboard', (req, res) => {
    res.status(200).json({
        message: "You're authorized to see this secret message."
    });
});


router.get('/recipe/:recipeid&:auth', function (req,res){
    console.log('2 parameters');
    var id = req.params.recipeid;
    console.log(req.params);
    var token = req.params.auth;
    console.log(token);
    if (id == 0)
    {
        res.status(404).end();
    }

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) { return res.status(401).end(); }
        const userId = decoded.sub;
        // check if a user exists
        return User.findById(userId, (userErr, user) => {
            if (userErr || !user) {
                return res.status(401).end();
            }
            Recipe.findById(id, (_err, rec) => {
                var data = {};
                if (_err )
                    return res.status(404).end();
                if (rec!= null) {
                    data.isReadOnly = true;
                    data.recipe= rec;
                    if (userId == rec.author)
                    {
                        data.isReadOnly = false;
                    }
                    else
                    {
                        data.isReadOnly = true;
                    }
                    return res.status(200).json(data).end();
                }
            });
        });
    });


});

router.post('/addRecipe', function (req, res) {
    var token = req.body.auth;//.split(' ')[1];
    console.log(token);
    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) { return res.status(401).end(); }
        const userId = decoded.sub;
        // check if a user exists
        return User.findById(userId, (userErr, user) => {
            if (userErr || !user) {
                return res.status(401).end();
            }
            var _recipe = new Recipe();
            _recipe.title = req.body.title;
            _recipe.text = req.body.contentText;
            _recipe.author = userId;
            var id = req.body.id;
            if (id != null && id > 0)
            {
                _recipe._id = id;
            }
            _recipe.save(function(err, data) {
                console.log(data);
                if(err) {
                    console.log(err);
                    res.status(500).json({message: "Some error occurred while creating the Note."});
                } else {
                    res.json(data);
                }
            });
        });
    });
});

module.exports = router;