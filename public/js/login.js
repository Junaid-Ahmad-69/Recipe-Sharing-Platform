const userLogin = async (email, password) => {
    await fetch('http://127.0.0.1:4000/api/v1/user/login', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({email, password})
    })
        .then(res => {
            if (res.status === 201) {
                window.location.replace("/recipes");
                return res.json();

            } else {
                throw new Error('Failed to log in');
            }
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            if (!email ) return alert("Please enter your email")
            if (!password) return alert("Please enter your password")
            alert('Please enter valid email or password')
            console.log(error.message);
        });

}

document.querySelector(".btn-data")?.addEventListener("click", async function (event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    await userLogin(email, password);
});















