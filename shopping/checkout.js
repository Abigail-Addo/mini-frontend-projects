window.addEventListener('load', () => {

    let customerId = localStorage.getItem('customer_id');
    console.log("customer id");
    console.log(customerId);
    // Retrieve the totalPrice from local storage
    const totalPrice = localStorage.getItem('totalPrice');

    // Check if totalPrice is available
    if (totalPrice) {
        // Convert the retrieved totalPrice to a number
        const numericTotalPrice = parseFloat(totalPrice);

        // Format the numericTotalPrice with commas and two decimal places
        const formattedTotalPrice = numericTotalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        // Select the element with the class 'itemTotal' in checkout.html
        const itemTotalElement = document.querySelector('.itemTotal');

        // Update the text content of the selected element with the formatted totalPrice
        itemTotalElement.textContent = '\u00A2 ' + formattedTotalPrice;

        // Calculate the total price including the delivery fee
        const delivery = document.querySelector('.delivery');
        const deliveryFee = 20; // Replace this with your delivery fee

        delivery.textContent = '\u00A2 ' + deliveryFee;

        const total = numericTotalPrice + deliveryFee;

        // Select the 'Total' section
        const totalElement = document.querySelector('.list-group-item:last-child strong');

        // Update the text content of the 'Total' section with the total price
        totalElement.textContent = '\u00A2 ' + total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()

            }

            form.classList.add('was-validated')

        }, false)

    })
    // const saved = document.querySelector('.saved');
    // saved.addEventListener('click', async (e) => {
    //     e.preventDefault();
    // });

    const submit = document.querySelector('.submit');
    submit.addEventListener('click', async (e) => {
        e.preventDefault();

        const confirmed = confirm("Are you sure you want to proceed?");
        //fetch all cart items for this customer

        if (confirmed) {
            if (customerId > 0) {
                // First, fetch all orders for the customer
                let result = await fetch(`http://localhost:7070/shop/v1/orders?customer_id=${customerId}`);
                let response = await result.json();
                console.log(response);

                if (result.status === 200) {
                    // If orders were fetched successfully, proceed with bulk deletion
                    let deleteResponse = await fetch(`http://localhost:7070/shop/v1/deleteOrders?customer_id=${customerId}`, {
                        method: 'DELETE',
                        headers: {
                            "content-type": "application/json"
                        }
                    });

                    if (deleteResponse.status === 200) {
                        console.log("Orders deleted successfully");
                        // Remove the total price from local storage
                        localStorage.removeItem('totalPrice');
                        alert("Your order has been placed successfully");
                        // Redirect to another page
                        window.location.href = './index.html';
                    }

                    console.log("Failed to delete orders");

                }
            }
        }



    })


});
