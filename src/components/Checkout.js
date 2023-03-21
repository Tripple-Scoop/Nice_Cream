import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/users";


//NATOSHIA

const Checkout = ({ user, token }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  return (
    <div className="checkout-confirmation">
      <h2>Thanks for shopping with us!</h2>
      <p>Your order is on its way.</p>
    </div>
  );
};



export default Checkout;