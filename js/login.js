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
    const datares = await fetch('https://password-reset-flow-server.herokuapp.com/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const res = await datares.json();
    if (res.type_ == 'success') {
        loginbtn.innerHTML = 'login successful...';
        setTimeout(() => {
            window.location.href = `./home.html`;
            form.reset()
        }, 2000);
    } else {
        custom_alert(res.type_, res.message);
        loginbtn.innerHTML = 'Try Again'
    }
}

// function setCookie(name, value, days) {
//     var expires = "";
//     if (days) {
//         var date = new Date();
//         date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//         expires = "; expires=" + date.toUTCString();
//     }
//     document.cookie = name + "=" + (value || "") + expires + "; path=/";
// }
