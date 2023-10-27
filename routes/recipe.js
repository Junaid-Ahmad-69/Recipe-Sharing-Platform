const express = require("express")
const {getAllRecipe, createRecipe, deleteRecipe, getRecipe, updateRecipe} = require("../controllers/recipeController")
const {protect} = require("../controllers/authController")
const router = express.Router();
router.route("/").get(protect, getAllRecipe).post(createRecipe);
router.route("/:id").delete(deleteRecipe).patch(updateRecipe).get(getRecipe)
module.exports = router