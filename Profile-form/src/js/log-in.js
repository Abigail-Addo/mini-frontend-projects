// window.on('load', function() {
window.addEventListener('load', () => {

    console.log('app.js is working')
    // Password visibility
    const togglePassword = document.querySelector("#togglePassword");
    const password = document.querySelector("#password");

    togglePassword.addEventListener("click", function () {
        const type = password.getAttribute('type') === "password" ? "text" : "password";
        password.setAttribute("type", type);
        this.classList.toggle("bi-eye")
    });
    // error message
    const btn = document.querySelector('.wrapper form div.btn button');

    btn.addEventListener('click', function (e) {
        e.preventDefault();

        const email = document.querySelector('.wrapper form .formControl input[type="email"]');
        console.log(email.value);
        const error = document.querySelector('.wrapper form div.error');
        const message = document.querySelector('.wrapper form div.error .error-message');

        if (email.value == '' || email.value == null || password.value == '' || password.value == null) {
            $(error).fadeIn('slow');
            $(message).text('Please enter your email and password');

            setTimeout(() => {
                $(error).fadeOut('slow');
            }, 3000);
            return;
        }
        window.location.href = `profile.html?email=${email.value}`;
    });

});