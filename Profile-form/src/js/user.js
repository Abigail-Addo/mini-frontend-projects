
const container = document.querySelector(".container");

async function getAllUsers() {
    const response = await fetch('https://kojoyeboah53i-d962a2da663c.herokuapp.com/api/ordabl/all-users');
    const data = await response.json();

    console.log(data);

    data.forEach(user => {

        function createUserItem() {

            const userItem = document.createElement('div');
            userItem.classList.add('user-item');
            const header = document.createElement('h3');

            // edit icon
            const editIcon = document.createElement('i');
            editIcon.classList.add('fas', 'fa-edit');
            userItem.appendChild(editIcon);

            // edit event listener
            editIcon.addEventListener('click', async () => {
                // console.log("edit is working")
                try {
                    alert(`Proceed to edit user ${user.id}`);

                    const profile = await fetch(`https://kojoyeboah53i-d962a2da663c.herokuapp.com/api/ordabl/user/${user.id}`)

                    let response = await profile.json();
                    console.log(response);


                    window.location.href = `./update.html?id=${response.id}&firstname=${response.firstname}&lastname=${response.lastname}
                    &email=${response.email}&school=${response.school}&contact=${response.contact}`
                    
                    return true;
                } catch (error) {
                    console.error(error)
                }
            });

            // delete icon
            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('fas', 'fa-trash');
            userItem.appendChild(deleteIcon);

            // delete user event listener
            deleteIcon.addEventListener('click', () => {
                let confirmed = confirm(`Are you sure you want to delete user ${user.id}?`)

                if (confirmed === true) {
                    fetch(`https://kojoyeboah53i-d962a2da663c.herokuapp.com/api/ordabl/profile/${user.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then((data) => {
                            if (data.status === 200 || data.status === 201) {
                                // console.log("delete successful")
                                alert("delete successful")
                                userItem.remove();
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            });

            // name
            header.innerHTML = user.firstname + " " + user.lastname;
            userItem.appendChild(header);
            container.appendChild(userItem);

            // email
            const para = document.createElement('p');
            para.innerHTML = user.email;
            userItem.appendChild(para);
            container.appendChild(userItem);

            // school
            const para_two = document.createElement('p');
            para_two.innerHTML = user.school;
            userItem.appendChild(para_two);
            container.appendChild(userItem);

            // contact
            const para_three = document.createElement('p');
            para_three.innerHTML = user.contact;
            userItem.appendChild(para_three);
            container.appendChild(userItem);
        }

        createUserItem()

    });

}


getAllUsers();

//logout
const logout = document.querySelector(".material-symbols-outlined");
logout.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "profile.html";
});






