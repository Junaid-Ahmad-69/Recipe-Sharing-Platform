const Recipe = require("../models/recipeModel")
/*Find all recipes*/
exports.getIndex = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).render(`overview`, {title:'Bring Out The Foodie In You' ,recipes})

    } catch (err) {
        console.log(err.message)
    }
}

/* Find Single Recipe */
//
// exports.getRecipe = async (req, res) => {
//     try {
//         const recipes = await Recipe.findOne({slug: req.body.slug});
//         res.status(200).json({
//             status: "success",
//             data: {recipes}
//         })
//
//     } catch (err) {
//         console.log(err.message)
//     }
// }