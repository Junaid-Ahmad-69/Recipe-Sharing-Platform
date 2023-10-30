const Recipe = require("../models/recipeModel")
/*Find all recipes*/
exports.getIndex = async (req, res) => {
    try {
        const recipes = await Recipe.find(req.query);
        res.status(200).render(`overview`, {title: 'Bring Out The Foodie In You', recipes})

    } catch (err) {
        console.log(err.message)
    }
}


/* Log In the User */
exports.getLoginForm = (req, res) => {
    try {
        res.status(200).render('login', {
            title: 'Login to your account',
        })

    } catch (err) {
        console.log(err.message)
    }
}

/* Log In the User */
exports.getSignupForm = async (req, res) => {
    try {
        res.status(200).render('signup', {
            title: 'Sign up',
        })

    } catch (err) {
        console.log(err.message)
    }
}

/* Find Single Recipe */
exports.getRecipeBySlug = async (req, res) => {
    try {
        const recipe = await Recipe.findOne({slug: req.params.slug});
        res.status(200).render('recipe', {title: `${recipe.name} Recipe`, recipe})
    } catch (err) {
        console.log(err.message)
    }
}

/* Post a Recipe */
exports.postRecipe = async  (req, res) => {
    try {
        res.status(200).render('post-recipe', {title: `Post your Recipe`})
    } catch (err) {
        console.log(err.message)
    }

}
