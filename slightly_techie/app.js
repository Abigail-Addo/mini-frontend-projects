// Open or create the IndexedDB database
const dbName = "myDatabase";
const dbVersion = 2;
const imageStoreName = "images";
const messageStoreName = "messages";
const topicStoreName = "topics";

const request = indexedDB.open(dbName, dbVersion);

request.onupgradeneeded = function (event) {
    const db = event.target.result;

    // Create object stores
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

request.onsuccess = function (event) {
    const db = event.target.result;
    const form = document.getElementById("dataForm");
    const output = document.getElementById("output");

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


        // Store the message and topic
        const messageRequest = messageStore.add(message);
        const topicRequest = topicStore.add(topic);

        messageRequest.onsuccess = topicRequest.onsuccess = function () {
            console.log("Data saved successfully");
            form.reset();
            displayData(output);
        };

        transaction.oncomplete = function () {
            console.log("Transaction completed.");
        };
    });

    function displayData(output) {
        output.innerHTML = "";
        const transaction = db.transaction([imageStoreName, messageStoreName, topicStoreName], "readonly");
        const imageStore = transaction.objectStore(imageStoreName);
        const messageStore = transaction.objectStore(messageStoreName);
        const topicStore = transaction.objectStore(topicStoreName);

        imageStore.openCursor().onsuccess = function (event) {
            const cursor = event.target.result;
            if (cursor) {
                const img = new Image();
                img.src = cursor.value;
                output.appendChild(img);
                cursor.continue();
            }
        };

        messageStore.openCursor().onsuccess = function (event) {
            const cursor = event.target.result;
            if (cursor) {
                const p = document.createElement("p");
                p.textContent = cursor.value;
                output.appendChild(p);
                cursor.continue();
            }
        };

        topicStore.openCursor().onsuccess = function (event) {
            const cursor = event.target.result;
            if (cursor) {
                const p = document.createElement("p");
                p.textContent =  cursor.value;
                output.appendChild(p);
                cursor.continue();
            }
        };
    }

    displayData(output);

};

request.onerror = function (event) {
    console.error("Database error: " + event.target.errorCode);
};
