import React from "react";
import { useState, useEffect } from "react";
import { loginUser, registerUser } from "../utils/apis.js";
import { useNavigate, Navigate } from "react-router-dom";

import "../styles/LoginRegister.css";

const LoginRegister = ({ isValid }) => {
  const [newUser, setNewUser] = useState(true);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [userRegister, setUserRegister] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (!isValid) return;

    navigate("/tasks");
  }, [isValid, navigate]);
  const changeLoginHandler = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const changeRegisterHandler = (e) => {
    e.preventDefault();
    setUserRegister({
      ...userRegister,
      [e.target.name]: e.target.value,
    });
  };

  const handlerLogin = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    const loggedInUser = await loginUser(email, password);
    console.log(loggedInUser);
    if (loggedInUser.login) {
      console.log("Navigating....");
      navigate("/tasks");
    }
    console.log(user);

    setUser({ email: "", password: "" });
    if (!loggedInUser.login) {
      alert("wrong email or password");
    }
  };

  const handlerRegister = async (e) => {
    e.preventDefault();
    const { email, password, confirmpassword } = userRegister;
    if (password !== confirmpassword) {
      alert("password mismatch");
      return;
    }
    const registeredUser = await registerUser(email, password);
    if (registeredUser) {
      navigate("/tasks");
    }
    console.log(userRegister);
    setUserRegister({ email: "", password: "", confirmpassword: "" });
  };

  return (
    <>
      <main className="wel-form-container">
        {newUser ? (
          <>
            <h2 className="form-title">Login</h2>
            <form onSubmit={handlerLogin} className="admin-login-form">
              <label className="form-label">Email :</label>
              <input
                type="email"
                name="email"
                required
                value={user.email}
                placeholder="email"
                onChange={changeLoginHandler}
                className="form-input"
              />
              <label className="form-label">Password :</label>
              <input
                type="password"
                name="password"
                value={user.password}
                required
                placeholder="password"
                onChange={changeLoginHandler}
                className="form-input"
              />
              <button className="wel-nav-btn form-submit-btn" type="submit">
                Submit
              </button>
              <p className="form-employee-text">
                New Register?
                <span
                  className="form-employee-text-span"
                  onClick={() => {
                    setNewUser(false);
                  }}
                >
                  Register
                </span>
              </p>
            </form>
          </>
        ) : (
          <>
            <h2 className="form-title">Register</h2>
            <form onSubmit={handlerRegister} className="admin-login-form">
              <label className="form-label">Email :</label>
              <input
                type="email"
                name="email"
                value={userRegister.email}
                required
                onChange={changeRegisterHandler}
                placeholder="email"
                className="form-input"
              />
              <label className="form-label">Password :</label>
              <input
                type="password"
                name="password"
                value={userRegister.password}
                required
                onChange={changeRegisterHandler}
                placeholder="password"
                className="form-input"
              />
              <label className="form-label">Confirm Password :</label>
              <input
                type="password"
                name="confirmpassword"
                value={userRegister.confirmpassword}
                required
                onChange={changeRegisterHandler}
                placeholder="confirm password"
                className="form-input"
              />
              <button className="wel-nav-btn form-submit-btn" type="submit">
                Submit
              </button>
              <p className="form-employee-text">
                Already register?
                <span
                  className="form-employee-text-span"
                  onClick={() => {
                    setNewUser(true);
                  }}
                >
                  Login
                </span>
              </p>
            </form>
          </>
        )}
      </main>
    </>
  );
};

export default LoginRegister;
