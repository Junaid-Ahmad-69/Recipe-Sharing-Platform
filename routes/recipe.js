const express = require("express")
const {getAllRecipe, createRecipe, deleteRecipe, getRecipe, updateRecipe} = require("../controllers/recipeController")
const router = express.Router();
router.route("/").get(getAllRecipe).post(createRecipe);
router.route("/:id").delete(deleteRecipe).patch(updateRecipe).get(getRecipe)
module.exports = router