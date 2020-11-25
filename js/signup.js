const form = document.getElementById('signup-form');

function signup() {
    const submitbtn = document.getElementById('submitbtn')
    submitbtn.innerHTML = 'Loading...'
    const email = document.getElementById('email').value;
    const password = document.getElementById('Password').value;
    const confirmpassword = document.getElementById('ConfirmPassword').value
    if (!email || !password || !confirmpassword) {
        custom_alert('warning', 'Please Fill all the Fields...')
        submitbtn.innerHTML = 'Try Again..'
    } else if (password !== confirmpassword) {
        custom_alert('warning', "'Confirm Password' field must match 'Password' field ...")
        submitbtn.innerHTML = 'Try Again..'
    } else {
        checkifEmailExists()
        async function checkifEmailExists() {
            let data = {
                email: email
            }
            let datares = await fetch('https://password-reset-flow-server.herokuapp.com/findPossibleDuplications', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }

            });
            if (datares.status === 202) {
                registerUser()
                async function registerUser() {
                    let data = {
                        email: email,
                        password: password
                    }
                    let datares = await fetch('https://password-reset-flow-server.herokuapp.com/register', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        }

                    });
                    if (datares.status === 200) {
                        custom_alert("success", "User registration successful...");
                        submitbtn.innerHTML = 'Signup Successful'
                        setTimeout(() => {
                            form.reset()
                            window.location.href = "./index.html"              
                        }, 3000);
                    }
                }
            } else {
                custom_alert("warning", "Email Already exists...");
                submitbtn.innerHTML = 'Try Again..'
            }
        }

    }
}