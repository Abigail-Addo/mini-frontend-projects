import React, { useState, useEffect} from 'react'
import Slide1 from '../assets/cart.jpg'
import Slide2 from '../assets/menf.jpg'
import Slide3 from '../assets/sofa.webp'
import Slide4 from '../assets/womenf.jpg'
import useAuth from '../context/useAuth'
import { useNavigate } from 'react-router-dom';



function Product() {
  const [products, setProducts] = useState(null)
  // const addToCart = useAuth();
  const { setCartCount, cart } = useAuth();
 
console.log(products)

  useEffect( () => {
    fetch('http://localhost:7070/product/v1/products')
.then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setProducts(data);
 
    })
    .catch(error => {
      console.error('Error fetching data:', error);
        
    });
  }, [])

  
  const cartBtn = async (product_id) => {
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user)

    // const navigate = useNavigate();
  
    if (!user || !user.id) { 
      alert('Login to add to cart');
      // navigate('/login');
        console.error("User not found in localStorage");
    }

    let customer_id = user.id;


    const order = await fetch('http://localhost:7070/shop/v1/order', {
        method: 'POST',
        headers: {
            "content-type": "application/json "
        },
        body: JSON.stringify({
            product_id: Number(product_id),
            customer_id: Number(customer_id)
        })
    })

    try {
      if (order.status === 409) {
        let res = await order.json();
        alert('Item has already been added to cart')
        console.error('Product has already been added to cart', res);
        return;
      }
  
      if (order.status === 200 || order.status === 201) {
        let res = await order.json();
        console.log(res);
  
        alert("Item successfully added to cart");
        handleAddToCart();
      }
    } catch (error) {
      console.error('Error processing the response:', error);
    }

   
};

// console.log(currentUser);
console.log(cart);

const handleAddToCart = async () => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.id) {
      console.error("User not found in localStorage");
      return;
  }

  const res = await fetch('http://localhost:7070/shop/v1/orders-with-customerId', {
      method: 'POST',
      headers: {
          "content-type": "application/json"
      },
      body: JSON.stringify({
          customer_id: user.id
      })

  });

  if (res.status == 200) {
      let orders = await res.json();

      const { order } = orders;
      const count = order.length;

      setCartCount(count);
  }
}

useEffect(() => {
  handleAddToCart();
});


  return (
    <>
   
     <div className="carousel w-full">
  <div id="item1" className="carousel-item w-full">
    <img src= {Slide1} className="w-full h-96 object-cover" />
  </div> 
  <div id="item2" className="carousel-item w-full h-96 object-cover">
    <img src={Slide3}className="w-full" />
  </div> 
  <div id="item3" className="carousel-item w-full h-96 object-cover">
    <img src={Slide2} className="w-full" />
  </div> 
  <div id="item4" className="carousel-item w-full h-96 object-cover">
    <img src={Slide4} className="w-full" />
  </div>
</div> 
<div className="flex justify-center w-full py-2 gap-2">
  <a href="#item1" className="btn btn-xs">1</a> 
  <a href="#item2" className="btn btn-xs">2</a> 
  <a href="#item3" className="btn btn-xs">3</a> 
  <a href="#item4" className="btn btn-xs">4</a>
</div> 


<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto max-w-screen-xl pt-8'> 

<div className='md:col-span-1 grid grid-cols-1 gap-4'>
  <h1>Adverts</h1>


</div>

 <div className='md:col-span-2 grid grid-cols-4 gap-4 '>
 {/* <strong>
<h1 className='flex justify-center text-center'>Product Listing</h1>
  </strong> */}

    {products?.map(item => (
      // <div key={item.id}>
      //   <img src= {item.image} alt="" />
      //   {item.name}
      //   {item.price}
      //   {item.description}
      // </div>

      <div key={item.id} className="card bg-base-100 shadow-xl">
  <figure><img src={item.image} alt="Shoes" className='w-24 h-24' /></figure>
  <div className="card-body w-24">
    <h2 className="card-title">{item.name}</h2>
    <p> ${item.price}</p>
    {/* <p> {item.description}</p> */}
    <div className="card-actions">
    <button className=" w-32 flex justify-between bg-green-600 text-white hover:bg-slate hover:text-green-600" id={item.id} onClick={() => cartBtn(item.id)} >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg>

     Buy</button>

    </div>
  </div>
</div>
    ))}
</div> 


</div>


    </>
  )
}

export default Product