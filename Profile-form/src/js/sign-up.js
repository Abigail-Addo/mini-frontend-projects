// window.on('load', function() {
// window.addEventListener('load', () => {
$(function () {


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

        const email = document.querySelector('.wrapper form .formControl input[type="email"], input[type="radio"], input[type="checkbox"]');
        const name = document.querySelector(`.wrapper form .formControl input[type="text"]#name`);
        const school = document.querySelector(`.wrapper form .formControl input[type="text"]#school`);
        const contact = document.querySelector(`.wrapper form .formControl input[type="tel"]`);
        const error = document.querySelector('.wrapper form div.error');
        const message = document.querySelector('.wrapper form .error .error-message');

        if (email.value == '' || email.value == null || password.value == '' || password.value == null || name.value == '' || name.value == null || contact.value == '' || contact.value == null || school.value == '' || school.value == null) {
            $(error).fadeIn('slow');
            $(message).text('Please fill the form!!!');

            setTimeout(() => {
                $(error).fadeOut('slow');
            }, 3000);
            return;
        }

        window.location.href = `profile.html?email=${email.value}&name=${name.value}&contact=${contact.value}&school=${school.value}`;
    });

    //logout
    const logout = document.querySelector(".logout");
    logout.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "index.html";
    });

});