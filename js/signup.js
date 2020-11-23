const form = document.getElementById('signup-form');
const signupbtn = document.getElementById('signupbtn');

function signup(){
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
        signupbtn.innerHTML='Loading...'
        checkuser()
        let duplicateusers
        async function checkuser() {
            let data = {
                 email: email
             }
             const datares = await fetch('http://localhost:3500/usercheck', {
                 method: 'POST',
                 body: JSON.stringify(data),
                 headers: {
                     'Content-Type': 'application/json'
                 }
                }sairam@gmail.com);
                console.log(datares)
            }
        if(duplicateusers === 'user exists'){
            custom_alert("Warning", "Email already exists..");
        }
        else if(duplicateusers === "user doesn't exist"){
            CreateUserInDb()
            async function CreateUserInDb() {
                let data = {
                     email: email,
                     password: password
                 }
                 const datares = await fetch('http://localhost:3500/register', {
                     method: 'POST',
                     body: JSON.stringify(data),
                     headers: {
                         'Content-Type': 'application/json'
                     }
                     
                 });
                 custom_alert("success", "User registration successful..");  
             }
        }
        else{
            custom_alert("danger", "Something is fishy..");
        }
    }
    signupbtn.innerHTML='Login'
}

