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
    const datares = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const res = await datares.json();
    custom_alert(res.type_, res.message);
    if (res.type_ == 'success') {
        loginbtn.innerHTML = 'login successful...';
        setCookie('jwt', res.token, 1)
        setTimeout(() => {
            window.location.href = `./home.html`;
            form.reset()
        }, 2000);
    } else {
        loginbtn.innerHTML = 'Try Again'
    }
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
