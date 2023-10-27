const express = require('express')
const router = express.Router();
const {getIndex, getRecipeBySlug, getLoginForm, getSignupForm, postRecipe} = require('../controllers/viewController')
const {isLoggedIn} = require('../controllers/authController')

router.use(isLoggedIn)

router.get('/', getLoginForm)
router.get('/signup', getSignupForm)
router.get('/recipes/:slug', getRecipeBySlug)
router.get('/recipes', getIndex)
router.get('/recipe', postRecipe)
module.exports = router