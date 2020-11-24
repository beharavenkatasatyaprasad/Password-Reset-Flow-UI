const form = document.getElementById('login-form');


function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('Password').value;
    if (!email || !password) {
        custom_alert('warning', 'Please Fill all the Fields...')
    }else{
        CheckCredentials()
        async function CheckCredentials() {
            let data = {
                email: email,
                password: password
            }
            let datares = await fetch('http://localhost:3000/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (datares.status === 202) {
                let res = await datares.json()
                custom_alert("success", "Logging in...");
                window.localStorage.setItem("user_token", res.token);
                window.location.href = `./home.html`;
                form.reset()
            } else if (datares.status === 400) {
                custom_alert("warning", "No user found...");
            } else {
                custom_alert("danger", "Incorrect Password...");
            }
        }
    }
}