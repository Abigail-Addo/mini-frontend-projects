// window.on('load', function() {
window.addEventListener('load', () => {

    console.log('app.js is working');

    const btn = document.querySelector('.submitUpdate');

    btn.addEventListener('click', async function (e) {
        e.preventDefault();

        const email = document.querySelector('input#email');

        const password = document.querySelector('input#password')
        const error = document.querySelector('.error');
        const message = document.querySelector('.error .error-message');

        if (email.value == '' || email.value == null || password.value == '' || password.value == null) {
            error.style.display = 'block';
            message.textContent = 'Field cannot be empty';

            setTimeout(() => {
                error.style.display = 'none';
            }, 3000);
            return;
        } else {
            //
            //    alert(email.value)

            const result = await fetch('http://localhost:4050/api/auth', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value
                })
            }) //fetch ends here

            if (result.status != 200) {
                //get message from response
                const response = await result.json()

                error.style.display = 'block';
                message.textContent = response.message;

                setTimeout(() => {
                    error.style.display = 'none';
                }, 3000);

                return;
            }


            if (result.status == 200) {
                //getting user back from server
                const response = await result.json();
                let name = response.name;
                let token = response.token;

                //clear previous storage
                localStorage.setItem('name', "");
                localStorage.setItem('tokenKey', "");

                //set new storage
                localStorage.setItem('name', name);
                localStorage.setItem('tokenKey', token);

                window.location.href = `./dashboard.html?name=${name}`;
            }

            // if (result.status == 200) {
            //     //getting user back from server
            //     const response = await result.json();
            //     let name = response.name;
            //     // console.log(name)
            //     window.location.href = `./dashboard.html?name=${name}`;
            // }

        }





    });


});



// Password visibility
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", function () {
    const type = password.getAttribute('type') === "password" ? "text" : "password";
    password.setAttribute("type", type);
    this.classList.toggle("bi-eye")
});