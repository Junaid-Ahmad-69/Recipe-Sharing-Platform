document.querySelector(".btn-logout")?.addEventListener("click", async () => {
    await fetch('/api/v1/user/logout', {
        method: 'POST',
    }).then(res => {
        window.location.replace("/");
    }).catch(error => {
        console.log(error.message);
    });
})
