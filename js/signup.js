const form = document.getElementById('signup-form');
const signupbtn = document.getElementById('signupbtn');

function signup(){
    signupbtn.innerHTML='Loading...'
    const email = document.getElementById('email').value;
    const password = document.getElementById('Password').value;
    const confirmpassword = document.getElementById('ConfirmPassword').value
    if(!email || !password || !confirmpassword){
        custom_alert('warning','Please Fill all the Fields...')
    }
    else if(password !== confirmpassword){
        custom_alert('warning',"Confirm Password must match Password ...")
    }
    else{
        CreateUserInDb()
        async function CreateUserInDb() {
           let data = {
                email: email,
                password: password
            }
            let datares = await fetch('http://localhost:3500/register', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
                
            });
            if (datares.status === 201) {
                custom_alert("success", "User Registered Successfully...");
                }
              else{
                  custom_alert("danger", "Something went Wrong...");
                }
             }
        
    }
    signupbtn.innerHTML='Login'
}

