const form = document.getElementById('login-form');


function login() {
    const loginbtn = document.getElementById('loginbtn');
    loginbtn.innerHTML="loading..."
    const email = document.getElementById('email').value;
    const password = document.getElementById('Password').value;
    if (!email || !password) {
        custom_alert('warning', 'Please Fill all the Fields...')
        loginbtn.innerHTML='Try again'
    } else {
        CheckCredentials()
        async function CheckCredentials() {
            let data = {
                email: email,
                password: password
            }
            let datares = await fetch('https://password-reset-flow-server.herokuapp.com/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (datares.status === 202) {
                loginbtn.innerHTML='login successful'
                let res = await datares.json()
                custom_alert("success", "Logging in...");
                window.localStorage.setItem("user_token", res.token);
                window.location.href = `./home.html`;
                form.reset()
            } else if (datares.status === 400) {
                loginbtn.innerHTML='Try again'
                custom_alert("warning", "No user found...");
            } else {
                loginbtn.innerHTML='Try again'
                custom_alert("danger", "Incorrect Password...");
            }
        }
    }
}