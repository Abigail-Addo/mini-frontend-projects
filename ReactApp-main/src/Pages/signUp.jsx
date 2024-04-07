import { useState } from 'react';
import '../Pages/Login.css'
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../context/useAuth';

const SignUp = () => {
  const navigate = useNavigate();


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const signUpBtn = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Error signing up');
      }

      // If successful, log in the user (example: set user token or session)
      // Replace this with your actual login logic
      // For example, if your server returns a token upon successful 
      // const data = await response.json();
      // const token = data.token;
      // localStorage.setItem('token', token);

      // Redirect to a different page upon successful login
      navigate('/home'); 
    } catch (error) {
      setErrorMessage('Error signing up');
    }
  };

  return (
    <div className='con'>
      <main className="wrapper">
        <strong style={{ color: 'white', textAlign: 'center', fontSize: 25 }} >
          <h1>Welcome</h1>
        </strong>
        {errorMessage && (
          <div className="message text-red-600">
            <p>{errorMessage}</p>
          </div>
        )}

        <div className="blur-background"></div>

        <form>
          <div className="form-controls">
            <input type="text" name="name" placeholder="Full Name" onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-controls">
            <input type="email" name="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-controls">
            <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            <i className="bi bi-eye-slash" id="togglePassword"></i>
          </div>

          <button type="submit" className="submit" onClick={signUpBtn}>Sign Up</button>
        </form>

        <p style={{ color: 'white', textAlign: 'center' }}>
          Already have an account? 
          <Link to="/login">
            Log In
          </Link>
        </p>
      </main>
    </div>
  );
};

export default SignUp;
