import { useEffect, useState } from "react";
import useAuth from "../context/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, setCart, } = useAuth();
  const [total, setTotal] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  console.log("cart", cart);
  const navigate = useNavigate();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      console.log("user not found in local storage");
    }
    let customer_id = user.id;

    if (customer_id > 0) {
      console.log(customer_id);

      const item = fetch("http://localhost:7070/shop/v1/orderWithCustomerId", {
        method: "POST",
        headers: {
          "content-type": "application/json ",
        },
        body: JSON.stringify({ customer_id }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(" order data", data)
          setCart(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
    console.log(cart);
  }, []);

  
  // const handleQuantityChange = (orderId, newQuantity) => {
  //   const updatedCart = cart.map((item) => {
  //     if (item.id === orderId) {
  //       return { ...item, quantity: newQuantity };
  //     }
  //     return item;
  //   });
  //   setCart(updatedCart);
  // };
  
  // const calculateTotal = () => {
  //   return cart.reduce((acc, item) => acc + item.products.price * item.quantity, 0);
  // };


  

  // useEffect(() => {
  //   setTotal(calculateTotal());
  // }, [cart]);

  // const togglePopup = () => {
  //   setShowPopup(!showPopup);
  // };

  const removeItem = async (orderId) => {
    let confirmed = window.confirm("Are you sure you want to delete item?");
    if (confirmed) {
      try {
        const result = await fetch(
          `http://localhost:7070/shop/v1/order/${orderId}`,
          {
            method: "DELETE",
          }
        );
        console.log("result", result);
        if (!result.ok) {
          console.log("product does not exist");
          return
        }
          
        const updatedCart = cart.filter((item) => item.id !== orderId);
        console.log("updated cart", updatedCart);
        setCart(updatedCart);

        alert("item deleted successfully");
      } catch (error) {
        alert("item not deleted");
      }
    }
  };
  // const handleQuantityChange = (orderId, newQuantity) => {
  //   const updatedCart = cart.map((item) => {
  //     if (item.id === orderId) {
  //       return { ...item, quantity: newQuantity };
  //     }
  //     return item;
  //   });
  //   setCart(updatedCart);
  //   console.log('updated cart:', updatedCart)
  //   setTotal(calculateTotal(updatedCart));
  // };
  
  // const calculateTotal = (updatedCart) => {
  //   return updatedCart.reduce((acc, item) => acc + item.products.price * item.quantity, 0);
  // };

  return (
    <>
      <div className="container bg-white">
        <Link to="/home">
          <button className="w-44"> Back to Home</button>
        </Link>
        <h1 className="p-8 ">My Cart</h1>

        {cart?.map((item) => (
          <div
            key={item.id}
            className="card w-96 lg:card-side bg-base-100 shadow-xl"
          >
            <figure>
              <img src={item.products?.image} alt="img" className="h-40" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.products?.name}</h2>
              <p> ${item.products?.price}</p>

              <div className="flex justify-end items-center">
<div className="flex justify-between items-center" >
  <div className="flex items-center">
    <input type="number" min={1} className="border border-gray-300 rounded  px-2 py-1 w-16 text-center mr-2"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, +e.target.value)} />

  </div>

</div>
              

              <div className="card-actions justify-end text-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={() => removeItem(item.id)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>

              </div>

            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cart;
