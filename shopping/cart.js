

window.addEventListener('load', async () => {

    //fetch all cart items for this customer
    let customerId = localStorage.getItem('customer_id')
    console.log("customer id")
    console.log(customerId)


    if (customerId > 0) {
        // fetch all orders
        let rs = await fetch('http://localhost:7070/shop/v1/orderWithCustomerId', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ customer_id: customerId })
        })
        if (rs.status == 200) {

            const cartContainer = document.querySelector('.cart-container');

            const orders = await rs.json()
            console.log(orders)

            let item = '';
            //create item list
            orders.forEach(order => {

                item += `
            <div class="d-sm-flex justify-content-between my-4 order-container">
            <div class="d-block d-sm-flex text-center text-sm-left">
                <a class="cart-item-thumb mr-sm-4" href="#"><img src="${order.products.image}" class="w-100 h-100"
                        alt="Product"></a>
                <div class="media-body pt-3 px-4">
                    <h3 class="product-card-title fw-bold border-0 pb-0">${order.products.name}</h3>
                    <div class="font-size-sm">${order.products.description}</div>
                    <div class="font-size-lg pt-2"> <p class="Itemprice">&cent; ${order.products.price}</p> </div>
                </div>
            </div>
            <div class="delete">
            <button class="btn btn-outline-danger btn-sm btn-block" type="button" id=${order.products.id}>
            <i class="bi bi-trash"></i>Remove</button>
            </div>
               
        </div>
            `
                cartContainer.innerHTML = item;

            })

        }

    }


    // total price
    const totalPriceCal = () => {
        const totalPrices = document.querySelectorAll('.totalPrice');
        const Itemprices = document.querySelectorAll('.Itemprice');

        // Initialize an array to store the prices
        const prices = [];

        // Loop through each price element and extract the price
        Itemprices.forEach(priceEach => {
            const priceText = priceEach.textContent;
            const numericPart = priceText.split(/[^0-9.]+/).join(''); // Extract numeric part
            prices.push(parseFloat(numericPart));
        });

        // Calculate the total price using reduce
        const totalPrice = prices.reduce((sum, price) => sum + price, 0);

        // Format the total price with commas for thousands
        const formattedTotalPrice = totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        console.log(formattedTotalPrice); // This will give you the formatted total price as a string

        // Now, update each totalPrice element with the calculated and formatted total
        totalPrices.forEach(totalPriceElement => {
            totalPriceElement.textContent = 'GH' + '\u00A2' + ' ' + formattedTotalPrice;
        });

        // store it in the local
        localStorage.setItem('totalPrice', totalPrice);
    }

    totalPriceCal();



    const deleteOrder = document.querySelectorAll('.btn-outline-danger');
    deleteOrder.forEach(deleted => {
        deleted.addEventListener('click', async (e) => {
            e.preventDefault();

            const orderId = deleted.getAttribute('id');
            console.log(orderId);
            try {
                const confirmed = confirm("Are you sure you want to delete this order");
                if (confirmed) {
                    const result = await fetch(`http://localhost:7070/shop/v1/deleteAnOrder/${orderId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    // console.log(result)

                    if (result.status === 200 || result.status === 201) {
                        const response = await result.json();
                        console.log("Deleted successfully");

                        // transition
                        const orderContainer = e.target.parentElement.parentElement;
                        orderContainer.classList.add('remove-deleted');
                        orderContainer.addEventListener('transitionend', () => {
                            orderContainer.remove();

                            totalPriceCal();

                        })
                        console.log("order deleted successfully");
                    }
                }
            } catch (error) {
                console.error(error);
            }

        })
    })

})