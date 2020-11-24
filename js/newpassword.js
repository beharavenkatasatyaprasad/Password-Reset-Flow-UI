const form = document.getElementById('reset-newpassword');

function resetpassword() {
    const token = document.getElementById('token').value;
    const password = document.getElementById('Password').value;
    const ConfirmPassword = document.getElementById('ConfirmPassword').value;
    const submitbtn = document.getElementById('resetPassBtn');
    submitbtn.innerHTML = 'Loading...'
    if (!token || !password || !ConfirmPassword) {
        custom_alert('warning', 'Please fill email field...')
        submitbtn.innerHTML = 'Reset Password'
    } else if (ConfirmPassword != password) {
        custom_alert('warning', "'Confirm Password' field must match 'Password' field ...")
        submitbtn.innerHTML = 'Reset Password'
    } else {
        CheckOTP()
        async function CheckOTP() {
            let data = {
                token: token,
                password: password
            }
            let datares = await fetch('http://localhost:3000/verification', {
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
                submitbtn.innerHTML = 'Send Verification'
                custom_alert("warning", "Invalid OTP..");
                submitbtn.innerHTML = 'Try Again'
            } else {
                submitbtn.innerHTML = 'Send Verification'
                custom_alert("danger", "Something went wrong..");
                submitbtn.innerHTML = 'Try Again'
            }

        }
    }
}