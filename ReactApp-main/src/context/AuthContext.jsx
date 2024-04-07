import React, { createContext, useEffect, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider =  ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState([''])
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const login = (user) => {
    // setUser(response);
    if(user.id) {
        const randomToken = Array.from({ length:32}, () => 
        Math.random().toString(36)[2]).join('');
        setToken(randomToken);
        localStorage.setItem('token', randomToken);

        setUser(user)
        setAuth(true)
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('cart', JSON.stringify(cart));

        setCart([]);
        return
    }
  }

  // const addToCart = (item) => {
  //   setCart((prevCart) => [...prevCart, item]);
  //   setCartCount((prevCount) => prevCount + 1);
  //   console.log(addToCart)
  //   localStorage.setItem('cart', JSON.stringify(cart))
  // };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const newCart = [...prevCart, item];
      setCartCount(newCart.length);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };
  

  const getCartCount = () => {
    return cartCount;
  };

  const clearCart = () => {
    setCart([]);
    setCartCount(0);
  };

  const logout = () => {
    setUser(null);
    setToken(null)
    setAuth(false)
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
  };

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken && localToken.length > 0) {
        setAuth(true);
    } else {
        setAuth(false);
        console.log("user not authenticated")
    }
}, [user, setToken]);

// useEffect(() => {
//   const localToken = localStorage.getItem('token');
//   const localUser = JSON.parse(localStorage.getItem('user'));
//   const localCart = JSON.parse(localStorage.getItem('cart'));

//   if (localToken && localToken.length > 0) {
//     setAuth(true);
//     setToken(localToken);
//     setUser(localUser);
//     setCart(localCart || []); 
//     setCartCount((localCart && localCart.length) || 0); 
//   } else {
//     setAuth(false);
//     console.log('user not authenticated');
//   }
// }, []);

  return (
    <AuthContext.Provider value={{ 
      user, login, logout, setAuth, setUser, auth,token, setToken, 
      addToCart, cart, setCart, clearCart, getCartCount, cartCount, setCartCount }}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthContext;