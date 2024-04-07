import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SignUp } from "../store/features/userAuth/authSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Please passwords should match");
    }

    const user = {
      email,
      password,
    };

    dispatch(SignUp(user));

    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <form className="login" onSubmit={onSubmit}>
        <h2>Provide your information for Signup</h2>
        <p>Please sign up</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="login_btn"
          disabled={!email || !password || !confirmPassword}
        >
          Sign Up
        </button>
        <div className="links">
          <span>Already have an account</span>
          <Link to="/">Log in</Link>
        </div>
      </form>

      <style jsx="true">
        {`
          @import url("https://fonts.googleapis.com/css?family=Raleway:400,700");

          body {
            font-family: Raleway, sans-serif;
            color: #666;
            height: 100vh;
          }

          .login_btn {
            border: none;
            background: #ef5350;
            color: white;
            font-weight: bold;
            transition: 0.2s;
            margin: 20px 0px;
          }

          .login {
            margin: 20px auto;
            padding: 40px 50px;
            border-radius: 5px;
            background: #fff;
            box-shadow: 0px 0px 2px 0px #666;
            width: 30vw;
          }
          .login input {
            width: 100%;
            display: block;
            box-sizing: border-box;
            margin: 10px 0;
            padding: 14px 12px;
            font-size: 16px;
            border-radius: 2px;
            font-family: Raleway, sans-serif;
          }

          .login input[type="text"],
          .login input[type="password"] {
            border: 1px solid #c0c0c0;
            transition: 0.2s;
          }

          .login input[type="text"]:hover {
            border-color: #f44336;
            outline: none;
            transition: all 0.2s ease-in-out;
          }

          .login input[type="submit"] {
            border: none;
            background: #ef5350;
            color: white;
            font-weight: bold;
            transition: 0.2s;
            margin: 20px 0px;
          }

          .login input[type="submit"]:hover {
            background: #f44336;
          }

          .login h2 {
            margin: 20px 0 0;
            color: #ef5350;
            font-size: 28px;
          }

          .login p {
            margin-bottom: 40px;
          }

          .links {
            display: table;
            width: 100%;
            box-sizing: border-box;
            border-top: 1px solid #c0c0c0;
            margin-bottom: 10px;
          }

          .links a {
            display: table-cell;
            padding-top: 10px;
          }

          .links a:first-child {
            text-align: left;
          }

          .links a:last-child {
            text-align: right;
          }

          .login h2,
          .login p,
          .login a {
            text-align: center;
          }

          .login a {
            text-decoration: none;
            font-size: 0.8em;
          }

          .login a:visited {
            color: inherit;
          }

          .login a:hover {
            text-decoration: underline;
          }
        `}
      </style>
    </>
  );
}

export default Signup;
