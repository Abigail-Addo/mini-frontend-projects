import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SignOut, reset } from "../store/features/userAuth/authSlice";
import { useNavigate } from "react-router-dom";

function Nav() {
  const { success, user } = useSelector((state) => state.auth);
  const userData = !!user;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/", { replace: true });
    }
  }, [userData, navigate, dispatch]);

  const logout = () => {
    dispatch(SignOut());
    dispatch(reset());
    navigate("/", { replace: true });
  };

  return (
    <div className="nav">
      <span>Tickets</span>
      <div className="btns">
        {!userData ? (
          <>
            <button>Login</button>
            <button>Sign Up</button>
          </>
        ) : (
          <button onClick={logout}>Sign Out</button>
        )}
      </div>

      <style jsx="true">
        {`
          .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            background-color: #ccc;
          }

          span {
            color: purple;
          }

          .btns {
            display: flex;
            gap: 1rem;

            button {
              cursor: pointer;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Nav;
