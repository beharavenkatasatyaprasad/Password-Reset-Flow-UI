checklogin();


async function checklogin() {
    let datares = await fetch('https://password-reset-flow-server.herokuapp.com/cookie', {
        method: 'GET',
    });
    const res = datares.json()
    if (res.type_ == 'danger') {
        custom_alert("warning", "UnAuthorized Login!!!");
        setTimeout(() => {
            window.location.href = "./index.html";
        }, 2000);
    }
}


async function logout() {
    let datares = await fetch('https://password-reset-flow-server.herokuapp.com/logout', {
        method: 'GET',
    });
    const res = datares.json()
    custom_alert(res.type_,res.message);
    setTimeout(() => {
        window.location.href = "./index.html";
    }, timeout);
}