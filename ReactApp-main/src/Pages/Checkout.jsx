// import React from 'react'

// export default function Checkout() {
//   return (
//     <div>Checkout</div>
//   )
// }


import React, { useState, useMemo, useCallback } from 'react';

const ShoppingCart = ({ items }) => {
  const [cart, setCart] = useState(items);

  const calculateTotal = useMemo(() => {
    console.log('Calculating total...');
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const handleRemoveItem = useCallback((itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  }, [cart]);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${calculateTotal}</p>
    </div>
  );
};
