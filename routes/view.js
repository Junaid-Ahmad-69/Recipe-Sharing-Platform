const express = require('express')
const router = express.Router();
const {getIndex, getRecipeBySlug, getLoginForm, getSignupForm, postRecipe, editRecipe} = require('../controllers/viewController')
const {isLoggedIn, protect} = require('../controllers/authController')

router.use(isLoggedIn)

router.get('/', getLoginForm);
router.get('/signup', getSignupForm);
router.get('/recipes/:slug', getRecipeBySlug);
router.get('/edit/:slug', editRecipe);
router.get('/recipe', protect, getIndex);
router.get('/recipes', protect, postRecipe);
module.exports = router