check();

function check() {
    const token = getCookie('jwt');
    if (!token) {
        custom_alert("warning", "UnAuthorized Login!!!");
        setTimeout(() => {
            window.location.href = "./index.html";
        }, 3000);
    } else {
        checklogin(token);
    }
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

async function checklogin(token) {
    let data = {
        token: token
    }
    let datares = await fetch('https://password-reset-flow-server.herokuapp.com/checklogin', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const res = await datares.json()
    if (res.type_ == 'success') {
        window.localStorage.setItem('user', res.user);
    } else {
        custom_alert('danger', 'unauthorized login !!!');
        setTimeout(() => {
            window.location.href = "./index.html"
        }, 3000);
    }
}


function logout() {
    custom_alert("success", "Logging Out!!!");
    document.cookie = 'jwt' + '=; Max-Age=0';
    window.localStorage.removeItem('user')
    setTimeout(() => {
        window.location.href = "./index.html"
    }, 3000);
}