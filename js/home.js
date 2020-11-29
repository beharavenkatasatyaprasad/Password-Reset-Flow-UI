checklogin();

async function checklogin() {
    let response = await fetch('https://password-reset-flow-server.herokuapp.com/checklogin', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const res = await response.json()
    if (res.type_ == 'success') {
        document.getElementById('userwelcome').innerHTML=(`
        <div class="col-lg-6 fade-in col-sm-12 create-fields" style="margin: auto; margin-top: 7%;">
            <h1 id="username" class="text-center">Welcome ${res.user.split('@')[0]}</h1>
        </div>
        `)
        window.localStorage.setItem('user', res.user);
    } else {
        custom_alert('danger', 'unauthorized login !!!');
        setTimeout(() => {
            window.location.href = "./index.html"
        }, 3000);
    }
}


async function logout() {
    let response = await fetch('https://password-reset-flow-server.herokuapp.com/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const res = await response.json()
    custom_alert(res.type_,res.message);
    setTimeout(() => {
        window.location.href = "./index.html"
    }, 3000);
}