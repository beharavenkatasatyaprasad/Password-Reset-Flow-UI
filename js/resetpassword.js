const form = document.getElementById('reset-form');


function resetPassword() {
    const email = document.getElementById('email').value;
    const submitbtn = document.getElementById('submitbtn');
    submitbtn.innerHTML ='Loading...'
    if (!email) {
        custom_alert('warning', 'Please fill email field...')
        submitbtn.innerHTML ='Send Verification'
    } else {
        sendVerification()
        async function sendVerification() {
            let data = {
                email: email
            }
            let datares = await fetch('https://password-reset-flow-server.herokuapp.com/resetpassword', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(datares.status == 202){
                custom_alert("success", "Password reset link sent to ..." + email);
                submitbtn.innerHTML ='Check your email..'
                submitbtn.disabled = true
                setTimeout(() => {
                    window.location.href = "./newpassword.html"
                }, 4500);
            }
            if(datares.status == 400){
                submitbtn.innerHTML ='Send Verification'
                custom_alert("warning", "No user found with entered Email ID..");
            }
            
        }
    }
}

