import React from "react";
import { useState } from "react";
import "../styles/LoginRegister.css";
const LoginRegister = () => {
  const [newEmployee, setNewEmployee] = useState(true);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [userRegister, setUserRegister] = useState({
    username: "",
    password: "",
    confirmpassword: "",
  });
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
  const handlerEmployeeLogin = (e) => {
    e.preventDefault();
    console.log(user);
    setUser({ username: "", password: "" });
  };
  const handlerEmployeeRegister = (e) => {
    e.preventDefault();
    console.log(userRegister);
    setUserRegister({ username: "", password: "", confirmpassword: "" });
  };
  return (
    <>
      <main className="wel-form-container">
        {newEmployee ? (
          <>
            <h2 className="form-title">Login</h2>
            <form onSubmit={handlerEmployeeLogin} className="admin-login-form">
              <label className="form-label">User Name :</label>
              <input
                type="text"
                name="username"
                required
                value={user.username}
                placeholder="user name"
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
                    setNewEmployee(false);
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
            <form
              onSubmit={handlerEmployeeRegister}
              className="admin-login-form"
            >
              <label className="form-label">User Name :</label>
              <input
                type="text"
                name="username"
                value={userRegister.username}
                required
                onChange={changeRegisterHandler}
                placeholder="user name"
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
                    setNewEmployee(true);
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
