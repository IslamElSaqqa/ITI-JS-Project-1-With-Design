var nameError = document.getElementById('name-error');
var passwordError = document.getElementById('password-error');
var submitError = document.getElementById('submit-error');
var submitBtn = document.getElementById('submitBtn');
var successMessage = document.getElementById('success-message');

submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    validateForm();
});

 function getCookie(name){
        const cookieArr = document.cookie.split("; ");
        for(const cookie of cookieArr){
            const [key,value] = cookie.split("=");
            if(key && key.trim() === name){
                return decodeURIComponent(value);
            }
        }
        return null;
    }

// Validation functions
function validateName(){
    let name = document.getElementById('username').value.trim();
    let regex = /^[A-Za-z][A-Za-z0-9]{3,}$/;

    if(name.length === 0){
        nameError.innerHTML = 'Name is required!';
        return false;
    }
    if(!regex.test(name)){
        nameError.innerHTML = 'Invalid name!';
        return false;
    }

    // if(!getCookie(name)){
    //         nameError.innerHTML = 'Username not found!';
    //         return false;
    // }

    nameError.innerHTML = '<i class="fa-solid fa-circle-check" style="color:#63E6BE;"></i>';
    return true;
}

function validatePassword(){
    let password = document.getElementById('password').value.trim();
    let regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if(password.length === 0){
        passwordError.innerHTML = 'Password is required!';
        return false;
    }
    if(!regex.test(password)){
        passwordError.innerHTML = 'Password must be 8+ chars, include uppercase, number & special char!';
        return false;
    }

    passwordError.innerHTML = '<i class="fa-solid fa-circle-check" style="color:#63E6BE;"></i>';
    return true;
}

successMessage.style.display = 'none';


// Form validation & login
function validateForm(){
    successMessage.style.display = 'none';
    submitError.style.display = 'none';

    if(!validateName() || !validatePassword()){
        submitError.style.display = 'block';
        setTimeout(()=>submitError.style.display='none', 3500);
        return false;
    }

    const inputUsername = document.getElementById('username').value.trim();
        const inputPassword = document.getElementById('password').value.trim();

        // Fetch stored cookies
        const storedUsername = getCookie('username');
        const storedPassword = getCookie('password');

        // Check username
        if(inputUsername !== storedUsername){
            submitError.innerHTML = 'Username not found!';
            submitError.style.display = 'block';
            setTimeout(()=>submitError.style.display='none', 3500);
            return false;
        }

        // Check password
        if(inputPassword !== storedPassword){
            submitError.innerHTML = 'Incorrect password!';
            submitError.style.display = 'block';
            setTimeout(()=>submitError.style.display='none', 3500);
            return false;
        }

    // Login success
    successMessage.innerHTML = `
        <i class="fa-solid fa-circle-check" style="color:#63E6BE;"></i>
        <span><strong>Login Successful!</strong> Redirecting...</span>
    `;
    successMessage.style.display = 'flex';

    setTimeout(()=>{
        successMessage.style.display = 'none';
        window.location.href='index.html'; // Redirect after login
    }, 2000);

    return true;
}