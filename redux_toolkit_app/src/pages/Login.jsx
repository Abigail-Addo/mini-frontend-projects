import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SignIn, reset } from "../store/features/userAuth/authSlice";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, loading, error, user } = useSelector((state) => state.auth);

  const userData = !!user;

  useEffect(() => {
    if (success || user) {
      navigate("/app", { replace: true });
      localStorage.setItem("id", JSON.stringify(user._id));
      // toast.success("login successful", { delay: 1000 });
    }

    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [success, error, loading, dispatch, userData]);

  function onSubmit(e) {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    dispatch(SignIn(user));

    setEmail("");
    setPassword("");
  }

  return (
    <>
      <form className="login" onSubmit={onSubmit}>
        <h2>Welcome, User!</h2>
        <p>Please log in</p>
        <input
          type="email"
          placeholder="enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login_btn">Log In</button>

        <div className="links">
          <a href="#">Forgot password</a>
          <Link to="/signup">Register</Link>
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

          .login_btn {
            border: none;
            background: #ef5350;
            color: white;
            font-weight: bold;
            transition: 0.2s;
            margin: 20px 0px;
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

export default Login;
