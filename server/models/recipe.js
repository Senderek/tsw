'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    author: {
        type: String,
        required: true,
        trim:true
    },
    title: {
        type: String,
        required: true,
        trim:true
    },
    text: {
        type: String,
        required: true,
        trim:true
    },
});

module.exports = mongoose.model('Recipe', RecipeSchema);