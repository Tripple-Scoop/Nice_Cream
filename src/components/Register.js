import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/users";


//NATOSHIA

const Register = ({ setToken, setUser, user, token }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [address, setAddress] = useState("");

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
            if (password === confirm) {
              const user = await register({name, username, password, address});
              setToken(user.token);
              setUser(user.user);
              console.log(user);
              setUsername('');
              setPassword('');
              if (user) {
                navigate('/Profile');
              }

            }

          } catch (error) {
            console.error("Having trouble logging in:", error);
          }
        }}
      >
        <label htmlFor="name">Full Name:</label>
        <input
          required
          type="text"
          placeholder="ex. Mya Nombre"
          id="create-name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        ></input>
        <label htmlFor="username">Username:</label>
        <input
          required
          type="text"
          placeholder="ex. mycool_username"
          id="create-username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }} >

        </input>
        <label htmlFor="address">Address:</label>
        <input
          required
          type="text"
          placeholder="ex. 1111 Wish Blvd."
          id="create-address"
          value={address}
          onChange={(event) => {
            setAddress(event.target.value);
          }} >

        </input>
        <label htmlFor="create-password">
          Password:
        </label>
        <input
          required
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
          required
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
      </form>
    </div>
  );
};



export default Register;