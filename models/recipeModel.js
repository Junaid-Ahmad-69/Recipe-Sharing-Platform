const mongoose = require('mongoose')


const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'A recipe must have a name'],
    },
    /*Flour, eggs, and sugar are the main ingredients in the cake*/
    ingredients: {
        type: String,
        required: [true, 'A recipe must have an ingredients'],
    },

    category: {
        type: String,
        required: [true, 'A recipe must have a categories'],
    },
    /* Characteristic of a particular country, region, or establishment*/
    cuisine: {
        type: String,
        required: [true, 'A recipe must have a cuisine'],
    },
    /* A dietary restriction mean its vegetarian or non-vegetarian */
    dietaryRestriction: {
        type: String,
        required: [true, 'A recipe must have a serve number for user'],
    },
    Time: Number,
    description: String,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    }
    // updatedAt: Date,
})

const recipe = mongoose.model('recipe', recipeSchema)
module.exports = recipe;
