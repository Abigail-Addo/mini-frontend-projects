import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import logo from '../assets/logo.png';
import useAuth from '../context/useAuth';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {
  const { user, setUser, setAuth, auth, logout,getCartCount, } = useAuth();
  const navigate = useNavigate();
  // console.log(auth)

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken && localToken.length > 0) {
      setAuth(true);
    let user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    } else {
      setAuth(false);
    }
  } , [setUser, setAuth]);

  const clearUserInfo = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("response");
  };

  const onLogout = () => {
    logout();
    clearUserInfo
    navigate('/login');
  };

  return (
    <div sticky = 'top' className=" bg-green-400 first-line:border-b border-gray-500">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto text-white navbar">
        <img src={logo} alt="" className="w-32 h-24 hidden md:block" />

        <ul className="menu menu-vertical lg:menu-horizontal">
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">Categories</a>
          </li>
          <li>
            <a href="">About</a>
          </li>
          <li>
            <a href="">Blog</a>
          </li>
        </ul>

        <div className="flex gap-x-6">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 hover:text-slate-700 hidden md:block"

          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <div className='border-l-2 relative' />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 hover:text-slate-700" onClick={() => addToCart()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          <div>
            {auth ? (
              <div className='flex items-center' >
                  <p className='mr-4 hidden md:block"'> Welcome,
                  {user.name}
                </p>
                <div className="avatar online">
    <div className="w-12 rounded-full">
      {user.id === 2 ? (
        <img src="https://randomuser.me/api/portraits/men/34.jpg" alt="Male Avatar" />
      ) : (
        <img src="https://randomuser.me/api/portraits/women/34.jpg" alt="Female Avatar" />
      )}
    </div>
    </div>
<Link to = "/cart">

                 {getCartCount() > 0 && (
                    <span className="absolute top-0 right-14 bg-white text-black px-2 py-1 rounded-full increment">
                      {getCartCount()}
                    </span>
                  )}
                
              
</Link> 
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" onClick={onLogout} >
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
</svg>

              </div>
              
            ) : (
              <Link to="/login">
                <div className=''>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:text-slate-700">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>

                </div>
              </Link>

            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}