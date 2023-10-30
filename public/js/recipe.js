
const postRecipe = async (name, ingredients, category, cuisine, dietaryRestriction, time, description, image) => {
    try {
        const response = await fetch(`/api/v1/recipe`, {
            method: 'POST',
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
    return new Promise((resolve, reject) => {
        if (imageGet.length > 0) {
            let fileToLoad = imageGet[0];
            let fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
                const image = fileLoadedEvent.target.result;
                resolve(image);
            };
            fileReader.readAsDataURL(fileToLoad);
        } else {
            alert("Please filled all required field.")
        }

    });
}

document.querySelector(".btn-post")?.addEventListener("click", async function (event) {
    event.preventDefault();

    let name = document.getElementById("recipe_name").value;
    let ingredients = document.getElementById("recipe_ingredients").value;
    let category = document.getElementById("recipe_category").value;
    let cuisine = document.getElementById("recipe_cuisine").value;
    let dietaryRestriction = document.getElementById("recipe_dietary").value;
    let time = document.getElementById("recipe_time").value;
    let description = document.getElementById("recipe_description").value;
    let imageGet = document.getElementById("recipe_image").files;
    readImage(imageGet)
        .then((image) => {
            return postRecipe(name, ingredients, category, cuisine, dietaryRestriction, time, description, image);
        }).catch((error) => {
        console.error(error);
    });

});