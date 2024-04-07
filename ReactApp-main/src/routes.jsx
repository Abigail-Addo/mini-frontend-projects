// import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'


import Login from './Pages/Login';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
// import SignUp from './Pages/signUp';
import notFound from './Pages/notFound';

const Router = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/" element={<Home/>}/>
      {/* <Route path="/signUp" element={<SignUp/>}/> */}

    </Routes>


    </BrowserRouter>
    </>
  )
}

export default Router;