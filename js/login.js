const form = document.getElementById('login-form');
const loginbtn = document.getElementById('loginbtn');

function login() {
    loginbtn.innerHTML = "loading..."
    const email = document.getElementById('email').value;
    const password = document.getElementById('Password').value;
    if (!email || !password) {
        custom_alert('warning', 'Please Fill all the Fields...')
        loginbtn.innerHTML = 'Try again'
    } else {
        CheckCredentials(email, password)

    }
}

async function CheckCredentials(email, password) {
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
    const res = datares.json()

    if (res.type_ != 'success') {
        loginbtn.innerHTML = 'login successful'
        custom_alert("success", "Logging in...");
        setTimeout(() => {
            window.location.href = `./home.html`;
        }, 2000);
        form.reset()
    } else {
        loginbtn.innerHTML = 'Try again'
        custom_alert(res.type_, res.message);
    }
}