document.querySelector(".btn-logout")?.addEventListener("click", async () => {
    await fetch('http://127.0.0.1:4000/api/v1/user/logout', {
        method: 'POST',
    }).then(res => {
        window.location.replace("/");
    }).catch(error => {
        console.log(error.message);
    });
})
