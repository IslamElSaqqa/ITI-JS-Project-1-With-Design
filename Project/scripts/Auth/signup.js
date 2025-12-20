var nameError = document.getElementById('name-error');
var passwordError = document.getElementById('password-error');
var submitError = document.getElementById('submit-error');
var submitBtn = document.getElementById('submitBtn');
var successMessage = document.getElementById('success-message');

// This one makes propagation 
// submitBtn.onclick = validateForm; // Function Call using Object
submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    validateForm();

})

function validateName() { 
    var name = document.getElementById('username').value.trim();
    let nameRegex = /^[A-Za-z][A-Za-z0-9]{3,}$/;

    // check the basic validation
    if (name.length == 0) {
        nameError.innerHTML = 'Name is required!';
        return false;
    }

    // check data format validation!
    if (!name.match(nameRegex)) {
        nameError.innerHTML = 'Invalid name!';
        return false;
    } 

    if(getCookie(name)){
        nameError.innerHTML = 'Username already exists!';
        return false;
    }

    nameError.innerHTML = '<i class="fa-solid fa-circle-check fa-lg" style="color: #63E6BE;"></i>';
    return true;
}
    

// Validate Password
function validatePassword()
{ 
    // get the password Value
    let password = document.getElementById('password').value.trim();
    // Check on the password format (At least 1 capital letter, should have a special character and a number)
    let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (password.length === 0)
    {
        passwordError.innerHTML = 'Password is required!';
        return false;
    }

    if (!passwordRegex.test(password))
    {
        passwordError.innerHTML = 'Invalid Password!';
        return false;
    }

    passwordError.innerHTML = '<i class="fa-solid fa-circle-check fa-lg" style="color: #63E6BE;"></i>';
    return true;

}

// create a helper function setcookie to send the credentials to cookies
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date(); // Get Current date
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name){
    let cookieArr = document.cookie.split("; ");
    for(let cookie of cookieArr){
        let [key, value] = cookie.split("=");
        if(key === name) return decodeURIComponent(value);
    }
    return null;
}

// Safety check
successMessage.style.display = 'none';


function validateForm() { 
    successMessage.style.display = 'none';
    submitError.style.display = 'none';

    if (!validateName() || !validatePassword()) {
        submitError.style.display = 'block';
        setTimeout(function () { 
            submitError.style.display = 'none';
        }, 3500);
        return false;
    } 
    else {

        // Get user data
        let username = document.getElementById('username').value.trim();
        let password = document.getElementById('password').value.trim();

        // Set cookies (7 days) and pass credentials to cookies
        setCookie("username", username, 7);
        setCookie("password", password, 7); // learning purpose only

         // Show success message with icon
        successMessage.innerHTML = `
            <i class="fa-solid fa-circle-check fa-lg" style="color:#63E6BE;"></i>
            <span><strong>Registration Successful!</strong>Login Now!</span>
        `;

        successMessage.style.display = 'flex';

        // Hide after 2 seconds
        setTimeout(function () {
            successMessage.style.display = 'none';
            window.location.href = "login.html";
            
        }, 2000);

        return true;
    }
}


