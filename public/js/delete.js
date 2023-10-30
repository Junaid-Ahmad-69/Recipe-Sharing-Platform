document.querySelectorAll(".btn-delete").forEach((item) => {
    item.addEventListener('click', async function () {
        const id = item.getAttribute("id")
        await fetch(`/api/v1/recipe/${id}`, {
            method: 'DELETE',
        }).then(res => {
            window.location.replace("/recipe");
        }).catch(error => {
            console.log(error.message);
        });
    })
})
