import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Route, Link, useNavigate } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(

  
  // <GoogleOAuthProvider clientId="1073057583200-vk6vovgh6fng9evm8845b7ukt25bvl4n.apps.googleusercontent.com">

  <React.StrictMode>

    <App />

  </React.StrictMode>,

  // </GoogleOAuthProvider>
  
 
)
