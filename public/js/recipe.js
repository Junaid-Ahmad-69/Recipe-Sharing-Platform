const postRecipe = async (name, ingredients, category, cuisine, dietaryRestriction, time, description, image) => {
    console.log({
        name: name,
        ingredients: ingredients,
        category: category,
        cuisine: cuisine,
        time: time,
        description: description
    })
    try {
        const response = await fetch(`http://127.0.0.1:4000/api/v1/recipe`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, ingredients, category, cuisine, dietaryRestriction, time, description, image})
        });

        if (response.status === 201) {
            const data = await response.json();
            console.log(data);
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error(error.message);
    }
}

/*Convert the user post recipe image to base64 to after display on pug files for ui*/
// function readImage(imageGet) {
//     return new Promise((resolve, reject) => {
//         if (imageGet.length > 0) {
//             let fileToLoad = imageGet[0];
//             let fileReader = new FileReader();
//             fileReader.onload = function (fileLoadedEvent) {
//                 const image = fileLoadedEvent.target.result; // <--- data: base64
//                 resolve(image); // Resolve the Promise with the image data
//             };
//             fileReader.readAsDataURL(fileToLoad);
//         } else {
//             reject("No image selected");
//         }
//     });
// }
//
// document.querySelector(".btn-post")?.addEventListener("click", async function (event) {
//     event.preventDefault();
//
//     let name = document.getElementById("recipe_name").value;
//     let ingredients = document.getElementById("recipe_ingredients").value;
//     let category = document.getElementById("recipe_category").value;
//     let cuisine = document.getElementById("recipe_cuisine").value;
//     let dietaryRestriction = document.getElementById("recipe_dietary").value;
//     let time = document.getElementById("recipe_time").value;
//     let description = document.getElementById("recipe_description").value;
//     let imageGet = document.getElementById("recipe_image").files;
//     readImage(imageGet)
//         .then((image) => {
//             return postRecipe(name, ingredients, category, cuisine, dietaryRestriction, time, description, image);
//         }).catch((error) => {
//         console.error(error);
//     });
//
// })
//
// import sharp
//
// function readImage(imageGet) {
//     return new Promise((resolve, reject) => {
//         if (imageGet.length > 0) {
//             let fileToLoad = imageGet[0];
//             let fileReader = new FileReader();
//             fileReader.onload = function (fileLoadedEvent) {
//                 const image = fileLoadedEvent.target.result; // <--- data: base64
//                 resolve(image); // Resolve the Promise with the image data
//             };
//             fileReader.readAsDataURL(fileToLoad);
//         } else {
//             reject("No image selected");
//         }
//     });
// }
//
// async function compressAndStoreImage(imageGet) {
//     try {
//         const imageBase64 = await readImage(imageGet);
//         const compressedImage = await sharp(Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ''), 'base64')).resize({ width: 800, height: 600 }).jpeg({ quality: 20 }).toBuffer();
//         return compressedImage;
//     } catch (error) {
//         throw error;
//     }
// }
//
// document.querySelector(".btn-post")?.addEventListener("click", async function (event) {
//     event.preventDefault();
//
//     let name = document.getElementById("recipe_name").value;
//     let ingredients = document.getElementById("recipe_ingredients").value;
//     let category = document.getElementById("recipe_category").value;
//     let cuisine = document.getElementById("recipe_cuisine").value;
//     let dietaryRestriction = document.getElementById("recipe_dietary").value;
//     let time = document.getElementById("recipe_time").value;
//     let description = document.getElementById("recipe_description").value;
//     let imageGet = document.getElementById("recipe_image").files;
//
//     try {
//         const image = await compressAndStoreImage(imageGet);
//         await postRecipe(name, ingredients, category, cuisine, dietaryRestriction, time, description, image);
//     } catch (error) {
//         console.error(error);
//     }
// });









