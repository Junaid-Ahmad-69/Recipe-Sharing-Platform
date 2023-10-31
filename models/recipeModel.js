const mongoose = require('mongoose')
const slugify = require('slugify');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'A recipe must have a name'],
    },
    slug: String,
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
        required: [true, 'A recipe must have a dietary restriction'],
    },
    time: Number,
    description: String,
    image: {
        type: String,
        required: [true, 'Please upload image']
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    userData: String,
    updatedAt: Date,
});
//Define the middle-ware for slug run before savn and create the new api for recipes
recipeSchema.pre('save', function (next) {
    this.slug = slugify(this.name, {lower: true});
    next();
});

recipeSchema.pre('save', function (next) {
    this.slug = slugify(this.name, {lower: true});
    next();
});



const recipe = mongoose.model('recipe', recipeSchema)
module.exports = recipe;
