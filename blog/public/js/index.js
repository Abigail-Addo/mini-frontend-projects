window.addEventListener('load', async () => {
    console.log("Index.js is working");

    const form = document.querySelector('form');
    const btn = document.querySelector('.submit');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.querySelector('#username');
        const email = document.querySelector('#email');
        const password = document.querySelector('#password');
        const errorMessage = document.querySelector('.errorMessage');
        errorMessage.classList.add('message');

        if (username.value === "" || username.value === null || email.value === "" || email.value === null || password.value === "" || password.value === null) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = "Please fill all fields!!!";
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 1500);
            return;
        }
        else {
            //make fetch request
            const result = await fetch('http://localhost:2019/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value,
                    username: username.value,
                    password: password.value
                })
            }) //fetch ends here
            const response = await result.json();
            console.log(response);

            //check http status
            if (result.status != 200) {

                errorMessage.style.display = 'block';
                errorMessage.textContent = response.message;

                setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 1500);

                return;
            }
            if (result.status == 200) {
                // Check if the username is correct
                if (response.username === username.value) {
                    // Append the image to the "image" div
                    const imageContainer = document.querySelector('img');
                    imageContainer.src = response.profile_photo;
                }

                btn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    window.location.href = `/home?username=${username.value}`;
                });
            }

        }


    });

})




// Password visibility
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", function () {
    const type = password.getAttribute('type') === "password" ? "text" : "password";
    password.setAttribute("type", type);
    this.classList.toggle("bi-eye")
});
