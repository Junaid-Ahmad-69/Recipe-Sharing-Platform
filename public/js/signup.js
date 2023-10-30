
//Sign up
const userSignup = async (name, email, password, confirmPassword) => {
    await fetch('/api/v1/user/signup', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({name, email, password, confirmPassword})
    })
        .then(res => {
            if (res.status === 201) {
                window.location.replace("/recipe");
                return res.json();

            } else {
                throw new Error('Failed to signup');
            }
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.message);
        });
}


document.querySelector(".btn-signup")?.addEventListener("click", async function (event) {
    event.preventDefault();
    let name = document.getElementById("signname").value;
    let email = document.getElementById("signemail").value;
    let password = document.getElementById("signupassword").value;
    let confirmPassword = document.getElementById("signupassword").value;

    await userSignup(name, email, password, confirmPassword);
});
