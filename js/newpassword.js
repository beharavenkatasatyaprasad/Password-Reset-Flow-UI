const form = document.getElementById('reset-newpassword');

function resetpassword() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('Password').value;
    const ConfirmPassword = document.getElementById('ConfirmPassword').value;
    const submitbtn = document.getElementById('resetPassBtn');
    submitbtn.innerHTML = 'Loading...'
    if (!email || !password || !ConfirmPassword) {
        custom_alert('warning', 'Please fill email field...')
        submitbtn.innerHTML = 'Reset Password'
    } else if (ConfirmPassword != password) {
        custom_alert('warning', "'Confirm Password' field must match 'Password' field ...")
        submitbtn.innerHTML = 'Reset Password'
    } else {
        UpdatePassword()
        async function UpdatePassword() {
            let data = {
                email: email,
                password: password
            }
            let datares = await fetch('https://password-reset-flow-server.herokuapp.com/verification', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (datares.status == 202) {
                custom_alert("success", "Password reset Successfull !!");
                submitbtn.innerHTML = 'Password Successfully Updated..'
                submitbtn.disabled = true
                setTimeout(() => {
                    window.location.href = "./index.html"
                }, 4500);

            }
            if (datares.status == 500) {
                custom_alert("danger", "Unauthorized request..");
                submitbtn.innerHTML = 'Try Again'
                setTimeout(() => {
                    window.location.href = "./index.html"
                }, 4500);
            }

        }
    }
}