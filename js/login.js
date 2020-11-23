const form = document.getElementById('login-form');
const loginbtn = document.getElementById('loginbtn');

function login(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('Password').value;
    if(!email || !password){
        custom_alert('warning','Please Fill all the Fields...')
    }
    else{
        // call a function to check username and password 
        CheckCredentials()
        async function CheckCredentials() {
           let data = {
                email: email,
                password: password
            }
            let datares = await fetch('/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (datares.status === 200) {
              custom_alert("success", "Logging in...");
            }
            else if (datares.status === 401) {
                custom_alert("warning", "Invalid Email or Password...");
            }
        }

    }
}

