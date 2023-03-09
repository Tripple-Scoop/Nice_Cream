import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/users";


//NATOSHIA

const Register = ({ setToken, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  return (
    <div className="register-container">
      <div className="title">
        <h1>Create your Nice Cream Account:</h1>
      </div>
      <form
        id="create-account"
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            if(password === confirm){
              const user = await login(username, password);
            setToken(user.token);
            setUser(user.user);
            console.log(user);
            setUsername('');
            setPassword('');
            navigate('/Profile');
            }
            
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
          }}>

          </input>

        <label htmlFor="confirm-password">
          Confirm your password:
        </label>
        <input
          type="password"
          placeholder="ex. password321"
          id="confirm-password"
          value={confirm}
          onChange={(event) => {
            setConfirm(event.target.value);
          }}>

          </input>
        <input type="submit" value="Create Account"></input>
        <Link to="/Login">
          Already a Nice Cream member? Click here to log in!
        </Link>

        <div id="loginPopUpDiv"></div>

        <div id="loginPopUpDiv"></div>
      </form>
    </div>
  );
};



export default Register;