const Recipe = require('../models/recipeModel')
const ApiFeature = require('../utils/apiFeature')
// Get All Recipe
exports.getAllRecipe = async (req, res) => {
    try {
        const feature = new ApiFeature(Recipe.find(), req.query).filter().paginate();
        const recipe = await feature.query;
        res.status(200).json({
            status: "success",
            result: recipe.length,
            data: {
                recipe
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: error.message
        })
    }
}
// Create Recipe
exports.createRecipe = async (req, res) => {
    try {
        const currentUserId = res.userId._id;
        const newRecipe = new Recipe({...req.body, userData: currentUserId});
        const recipe = await Recipe.create(newRecipe);
        res.status(201).json({
            status: "success",
            data: {
                recipe,
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
}
// Get single Recipe
exports.getRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                recipe
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
}
// Update Recipe
exports.updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        res.status(201).json({
            status: "success",
            data: {
                recipe
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
}
// Delete Recipe
exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findOneAndDelete({
            _id: req.params.id
        });
        res.status(200).json({
            status: "success",
            data: {
                recipe
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
}