import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/users";

//NATOSHIA

const Login = ({ setToken, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="register-container">
      <div className="title">
        <h1>Log into your Nice Cream Account:</h1>
      </div>
      <form
        id="create-account"
        onSubmit={async (event) => {
          event.preventDefault();

          try {
            const user = await login(username, password);
            setToken(user.token);
            setUser(user.user);
            localStorage.setItem('myToken', );
            console.log(user);
            // navigate.push("/");
          } catch (error) {
            console.error("Having trouble logging in:", error);
          }
        }}
      >
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="ex. username"
          id="create-username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></input>

        <label htmlFor="create-password">
          Password:
        </label>
        <input
          type="password"
          placeholder="ex. password321"
          id="create-password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>

        <input type="submit" value="Log In"></input>
        <Link to="/Register">
          New to Nice Cream? Click here to register!
        </Link>

        <div id="loginPopUpDiv"></div>
      </form>
    </div>
  );
};

export default Login;
