window.addEventListener('load', () => {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        }, false);
    });

    // Define constants for your IndexedDB
    const dbName = "mDdd";
    const dbVersion = 1;
    const imageStoreName = "images";
    const messageStoreName = "messages";
    const topicStoreName = "topics";
    let db;

    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = function (event) {
        db = event.target.result;

        // Create object stores if they don't exist
        if (!db.objectStoreNames.contains(imageStoreName)) {
            db.createObjectStore(imageStoreName, { autoIncrement: true });
        }

        if (!db.objectStoreNames.contains(messageStoreName)) {
            db.createObjectStore(messageStoreName, { autoIncrement: true });
        }

        if (!db.objectStoreNames.contains(topicStoreName)) {
            db.createObjectStore(topicStoreName, { autoIncrement: true });
        }
    };

    // Define the form variable outside the request.onsuccess function
    let form;
    const output = document.getElementById("output");

    request.onsuccess = function (event) {
        db = event.target.result;
        form = document.getElementById("dataForm");

        // Add a submit event listener to the form
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const topic = form.querySelector("#topic").value;
            const message = form.querySelector("#paragraph").value;
            const imageInput = form.querySelector("#image");

            const transaction = db.transaction([imageStoreName, messageStoreName, topicStoreName], "readwrite");
            const imageStore = transaction.objectStore(imageStoreName);
            const messageStore = transaction.objectStore(messageStoreName);
            const topicStore = transaction.objectStore(topicStoreName);

            // Store the image
            const imageFile = imageInput.files[0];

            if (imageFile) {
                if (imageFile instanceof Blob) {
                    const reader = new FileReader();

                    reader.onload = function (event) {
                        const imageData = event.target.result;
                        const newTransaction = db.transaction([imageStoreName], "readwrite"); // Create a new transaction
                        const imageStore = newTransaction.objectStore(imageStoreName);

                        imageStore.add(imageData).onsuccess = function () {
                            console.log("Image data saved successfully");
                        };

                        newTransaction.oncomplete = function () {
                            console.log("Transaction completed.");
                            displayData(output);
                        };
                    };

                    reader.readAsDataURL(imageFile);
                } else {
                    console.error("Selected file is not a valid Blob object.");
                }
            } else {
                console.error("No file selected or the selected file is not a valid Blob.");
            }

            // Store the message and topic
            const messageRequest = messageStore.add(message);
            const topicRequest = topicStore.add(topic);

            messageRequest.onsuccess = topicRequest.onsuccess = function () {
                console.log("Data saved successfully");
                form.reset();
                displayData(output);
            };
        });

        displayData(output);
    };

    request.onerror = function (event) {
        console.error("Database error: " + event.target.errorCode);
    };

    function displayData(output) {
        // Ensure that db is defined before using it
        if (db) {
            const transaction = db.transaction([imageStoreName, messageStoreName, topicStoreName], "readonly");
            const imageStore = transaction.objectStore(imageStoreName);
            const messageStore = transaction.objectStore(messageStoreName);
            const topicStore = transaction.objectStore(topicStoreName);

            // Clear the previous data in the output container
            output.innerHTML = "";

            imageStore.openCursor().onsuccess = function (event) {
                const cursor = event.target.result;
                if (cursor) {
                    const image_container = document.createElement("div");
                    image_container.classList.add('image_container');
                    const img = new Image();
                    img.src = cursor.value;
                    image_container.appendChild(img);

                    const iconsContainer = document.createElement("div");
                    const deleteBtn = document.createElement("button");
                    deleteBtn.innerHTML = '<i class="bi bi-trash3"></i>';
                    deleteBtn.classList.add('delete-btn');
                    deleteBtn.addEventListener("click", function () {
                        deletePost(cursor.key);
                    });

                    iconsContainer.appendChild(deleteBtn);

                    const editBtn = document.createElement("button");
                    editBtn.innerHTML = '<i class="bi bi-pen"></i>';
                    editBtn.classList.add('edit-btn');
                    editBtn.setAttribute('data-key', cursor.key);
                    editBtn.addEventListener("click", function () {
                        editPost(cursor.key);
                    });
                    iconsContainer.appendChild(editBtn);

                    image_container.appendChild(iconsContainer);
                    output.appendChild(image_container);
                    cursor.continue();
                }
            };

            topicStore.openCursor().onsuccess = function (event) {
                const cursor = event.target.result;
                if (cursor) {
                    const p = document.createElement("h6");
                    p.textContent = "Topic: " + cursor.value;
                    output.appendChild(p);
                    cursor.continue();
                }
            };

            messageStore.openCursor().onsuccess = function (event) {
                const cursor = event.target.result;
                if (cursor) {
                    const p = document.createElement("p");
                    p.classList.add('truncate-text');
                    p.textContent = "Message: " + cursor.value;
                    output.appendChild(p);
                    cursor.continue();
                }
            };
        } else {
            console.error("IndexedDB is not defined.");
        }
    }

    function deletePost(postKey) {
        const transaction = db.transaction([imageStoreName, messageStoreName, topicStoreName], "readwrite");
        const imageStore = transaction.objectStore(imageStoreName);
        const messageStore = transaction.objectStore(messageStoreName);
        const topicStore = transaction.objectStore(topicStoreName);

        imageStore.delete(postKey);
        messageStore.delete(postKey);
        topicStore.delete(postKey);

        transaction.oncomplete = function () {
            console.log("Post deleted successfully");
            displayData(output);
        };
    }

    function editPost(postKey) {
        const transaction = db.transaction([imageStoreName, messageStoreName, topicStoreName], "readwrite");
        const imageStore = transaction.objectStore(imageStoreName);
        const messageStore = transaction.objectStore(messageStoreName);
        const topicStore = transaction.objectStore(topicStoreName);

        const getRequestImage = imageStore.get(postKey);
        const getRequestMessage = messageStore.get(postKey);
        const getRequestTopic = topicStore.get(postKey);

        getRequestImage.onsuccess = function (event) {
            const imageData = event.target.result;
            getRequestMessage.onsuccess = function (event) {
                const messageData = event.target.result;

                getRequestTopic.onsuccess = function (event) {
                    const topicData = event.target.result;

                    // Populate the form fields with the fetched data
                    const topicInput = form.querySelector("#topic");
                    const messageInput = form.querySelector("#paragraph");
                    const imageInput = form.querySelector("#image");

                    topicInput.value = topicData;
                    messageInput.value = messageData;

                    if (imageData) {
                        const blob = dataURItoBlob(imageData);
                        const file = new File([blob], "image.png", { type: "image/png" });

                        const updatedFiles = new DataTransfer();
                        updatedFiles.items.add(file);
                        imageInput.files = updatedFiles.files;

                        form.addEventListener("submit", function (e) {
                            e.preventDefault();
                            const updatedTopic = topicInput.value;
                            const updatedMessage = messageInput.value;

                            const updateTransaction = db.transaction([imageStoreName, messageStoreName, topicStoreName], "readwrite");
                            const updatedImageStore = updateTransaction.objectStore(imageStoreName);
                            const updatedMessageStore = updateTransaction.objectStore(messageStoreName);
                            const updatedTopicStore = updateTransaction.objectStore(topicStoreName);

                            updatedImageStore.put(imageData, postKey);
                            updatedMessageStore.put(updatedMessage, postKey);
                            updatedTopicStore.put(updatedTopic, postKey);

                            updateTransaction.oncomplete = function () {
                                console.log("Data updated successfully");
                                form.reset();
                                displayData(output);
                            };
                        });
                    }
                };
            };
        };
    }

    function dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(",")[1]);
        const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], { type: mimeString });
    }
});
