const token = get_cookie('jwt');


function get_cookie(name) {
    return document.cookie.split(';').some(c => {
        return c.trim().startsWith(name + '=');
    });
    
}

checklogin();
function checklogin() {
    if (!token) {
        custom_alert("warning", "UnAuthorized Login!!!");
        setTimeout(() => {
            window.location.href = "./index.html";
        }, 3000);
    } else {
        let data = {
            token: token
        }
        let datares = await fetch('http://localhost:3000/checklogin', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const res = await datares.json()
        if (res.type_ == 'success') {
            window.localStorage.setItem('user', res.user);
        }else{
            custom_alert(res.type_, res.msessage);
            setTimeout(() => {
                window.location.href = "./index.html"
            }, 3000);
        }
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