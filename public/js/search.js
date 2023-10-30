document.querySelector('.btn-search')?.addEventListener("click", async function () {
    const name = document.querySelector("#name").value.toLowerCase();
    const cuisine = document.querySelector("#cuisine").value.toLowerCase();
    const category = document.querySelector("#category").value.toLowerCase();
    const dietaryRestriction = document.querySelector("#dietaryRestriction").value.toLowerCase();
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (category) params.append('category', category);
    if (cuisine) params.append('cuisine', cuisine);
    if (dietaryRestriction) params.append('dietaryRestriction', dietaryRestriction);
    const query = params.toString();
    const currentURL = window.location.href;

    if (window.location.href.includes("?")) {
        const newUrl = currentURL + (query ? `&${query}` : '');
        window.location.href = newUrl;
    } else {
        const updatedURL = currentURL + (query ? `?${query}` : '');
        window.location.href = updatedURL;
    }

})