import React from 'react'
import { useRouteError } from 'react-router-dom'


 const ErrorPage = () => {
    const error = useRouteError();


    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
      };
    
      const headingStyle = {
        fontSize: '3rem',
        color: '#982176',
      };
    
      const paragraphStyle = {
        fontSize: '2rem',
        color: '#1D267D',
      };


  return (
    <>
        <div style={containerStyle}>
            <h2 style={headingStyle}>Ooops!</h2>
            <p style={paragraphStyle}>Something happened</p>
        </div>
    </>
  )
}

export default ErrorPage;
