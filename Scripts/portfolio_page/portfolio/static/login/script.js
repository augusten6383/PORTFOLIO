function togglePage(page) {
    const signInBtn = document.getElementById('signInBtn');
    const signUpBtn = document.getElementById('signUpBtn');
    const signIn = document.getElementById('signInPage');
    const signUp = document.getElementById('signUpPage');
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form')

    if (page === 'signIn') {
        signInBtn.classList.add('active');
        signUpBtn.classList.remove('active');
        signIn.style.display = 'block';
        signUp.style.display = 'none';
        signinForm.style.display = 'block';
        signupForm.style.display = 'none'

    } else if (page === 'signUp') {
        
        signInBtn.classList.remove('active');
        signUpBtn.classList.add('active');
        signIn.style.display = 'none';
        signUp.style.display = 'block';
        signinForm.style.display = 'none';
        signupForm.style.display = 'block';
    }
}
function ShowPassword(){
    const pass = document.getElementById("signIn-password");

    if (pass.type === "password"){
        pass.type = "text";
    } else if (pass.type === "text"){
        pass.type = "password";
    }
}