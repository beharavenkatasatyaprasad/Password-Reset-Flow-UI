checklogin();

async function checklogin() {
    let response = await fetch('https://password-reset-flow-server.herokuapp.com/checklogin', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const res = await response.json()
    console.log(res)
    custom_alert(res.type_ , res.message);
    document.getElementById('userwelcome').innerHTML=(`
    <div class="col-lg-6 fade-in col-sm-12 create-fields" style="margin: auto; margin-top: 7%;">
        <h1 id="username" class="text-center">Welcome ${res.user.split('@')[0]}</h1>
    </div>
    `)
    if (res.type_ != 'success') {
        setTimeout(() => {
            window.location.href = "./index.html"
        }, 3000);
    }
}


async function logout() {
    let response = await fetch('https://password-reset-flow-server.herokuapp.com/logout', {
        method: 'GET',
        credentials: 'include',
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