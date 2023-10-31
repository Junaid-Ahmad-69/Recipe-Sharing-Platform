const editRecipe = async (name, ingredients, category, cuisine, dietaryRestriction, time, description, image, id) => {
    try {
        const response = await fetch(`/api/v1/recipe/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                ingredients,
                category,
                cuisine,
                dietaryRestriction,
                time,
                description,
                image
            })
        });
        if (response.status === 201) {
            window.location.replace("/recipe");
            return await response.json();
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        alert('Please upload image less the 5kb.')
        console.error(error.message);
    }
}

/*Convert the user post recipe image to base64 to after display on pug files for ui*/
function readImage(imageGet) {
    return new Promise((resolve) => {
        let fileToLoad = imageGet[0];
        let fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            const image = fileLoadedEvent.target.result;
            resolve(image);
        };
        fileReader.readAsDataURL(fileToLoad);
    });
}

document.querySelector(".btn-update")?.addEventListener("click", async function (e) {
    e.preventDefault();
    const id = document.querySelector(".btn-update").getAttribute('id')
    let name = document.getElementById("recipe_name").value;
    let ingredients = document.getElementById("recipe_ingredients").value;
    let category = document.getElementById("recipe_category").value;
    let cuisine = document.getElementById("recipe_cuisine").value;
    let dietaryRestriction = document.getElementById("recipe_dietary").value;
    let time = document.getElementById("recipe_time").value;
    let description = document.getElementById("recipe_description").value;
    let imageGet = document.getElementById("recipe_image").files;
    let image = document.querySelector(".image-old").src;
    if (imageGet.length > 0) {
        readImage(imageGet)
            .then((image) => {
                return editRecipe(name, ingredients, category, cuisine, dietaryRestriction, time, description, image, id);
            }).catch((error) => {
            console.error(error);
        });
    } else {
        await editRecipe(name, ingredients, category, cuisine, dietaryRestriction, time, description, image, id);
    }
});