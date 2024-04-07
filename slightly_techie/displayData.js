document.addEventListener("DOMContentLoaded", function () {
    const dbName = "myDatabase";
    const dbVersion = 1;
    const imageStoreName = "images";
    const messageStoreName = "messages";
    const topicStoreName = "topics";

    const request = indexedDB.open(dbName, dbVersion);

    request.onsuccess = function (event) {
        const db = event.target.result;
        const displayDataDiv = document.getElementById("displayData");

        // Display data from the IndexedDB on the new page
        function displayData() {
            const transaction = db.transaction([imageStoreName, messageStoreName, topicStoreName], "readonly");
            const imageStore = transaction.objectStore(imageStoreName);
            const messageStore = transaction.objectStore(messageStoreName);
            const topicStore = transaction.objectStore(topicStoreName);

            // Retrieve and display data
            imageStore.openCursor().onsuccess = function (event) {
                const cursor = event.target.result;
                if (cursor) {
                    const img = new Image();
                    img.src = cursor.value;
                    displayDataDiv.appendChild(img);
                    cursor.continue();
                }
            };

            messageStore.openCursor().onsuccess = function (event) {
                const cursor = event.target.result;
                if (cursor) {
                    const p = document.createElement("p");
                    p.textContent = "Message: " + cursor.value;
                    displayDataDiv.appendChild(p);
                    cursor.continue();
                }
            };

            topicStore.openCursor().onsuccess = function (event) {
                const cursor = event.target.result;
                if (cursor) {
                    const p = document.createElement("p");
                    p.textContent = "Topic: " + cursor.value;
                    displayDataDiv.appendChild(p);
                    cursor.continue();
                }
            };
        }

        displayData();
    };

    request.onerror = function (event) {
        console.error("Database error: " + event.target.errorCode);
    };
});
