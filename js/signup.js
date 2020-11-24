const form = document.getElementById('signup-form');

function signup() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('Password').value;
    const confirmpassword = document.getElementById('ConfirmPassword').value
    if (!email || !password || !confirmpassword) {
        custom_alert('warning', 'Please Fill all the Fields...')
    } else if (password !== confirmpassword) {
        custom_alert('warning', "'Confirm Password' field must match 'Password' field ...")
    } else {
        checkifEmailExists()
        async function checkifEmailExists() {
            let data = {
                email: email
            }
            let datares = await fetch('http://localhost:3000/findPossibleDuplications', {
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
                    let datares = await fetch('http://localhost:3000/register', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        }

                    });
                    if (datares.status === 200) {
                        custom_alert("success", "User registration successful...");
                        form.reset()
                    }
                }
            } else {
                custom_alert("warning", "Email Already exists...");
            }
        }

    }
}